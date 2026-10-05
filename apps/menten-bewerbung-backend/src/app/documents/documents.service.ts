import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {decodeFile} from '../../utils/decode-file';
import {Doc, DOC_TYPE, HeadJson} from 'shared';
import {DocValidation} from './types/doc-validation';
import {headCrossFieldChecks, headElementValidators, headFieldOrder, headSchema} from './schema/head-schema';
import {alcCrossFieldChecks, alcFieldOrder, alcSchema} from './schema/alc-schema';
import {posCrossFieldChecks, posElementValidators, posFieldOrder, posSchema} from './schema/pos-schema';
import {textFieldOrder, textSchema} from './schema/text-schema';
import {DocRaw} from './types/doc-raw';
import {BaseLineMap} from './types/base-line-map';
import {DocumentError} from './errors/document-error';
import {randomUUID} from 'node:crypto';
import {FieldValidatorFn} from './types/field-validator-fn';
import {parse} from 'node:path';
import {GetJsonFileResponse} from './types/get-json-file-response';
import {AssignedElementRule} from './types/assigned-element-rule';

interface CreateDocRawResponse {
    docs: DocRaw[];
    noHead: DocRaw[];
}

type AnyValidation = {
    fields: Record<string, { required: boolean; fieldValidators: FieldValidatorFn[] }>;
    order: readonly string[];
    crossFieldChecks: readonly AnyCrossFieldRule[];
    elementValidator: Partial<Record<string, AssignedElementRule>>;
};

type AnyCrossFieldRule = {
    fieldName: string;
    dependsOnFields: readonly string[];
    check: (value: string | undefined, deps: Record<string, string | undefined>) => string | null;
};


@Injectable()
export class DocumentsService {
    private readonly logger = new Logger(DocumentsService.name);

    // memory of docs
    private readonly docs: Doc[] = [];

    private readonly docValidation: DocValidation = {
        [DOC_TYPE.HEAD]: {
            fields: headSchema,
            order: headFieldOrder,
            crossFieldChecks: headCrossFieldChecks,
            elementValidator: headElementValidators
        },
        [DOC_TYPE.POS]: {
            fields: posSchema,
            order: posFieldOrder,
            crossFieldChecks: posCrossFieldChecks,
            elementValidator: posElementValidators
        },
        [DOC_TYPE.ALC]: {
            fields: alcSchema,
            order: alcFieldOrder,
            crossFieldChecks: alcCrossFieldChecks,
            elementValidator: {}
        },
        [DOC_TYPE.TEXT]: {
            fields: textSchema,
            order: textFieldOrder,
            crossFieldChecks: [],
            elementValidator: {}
        },
    };

    public uploadFile(file: Express.Multer.File): Doc[] {
        const resultArr: Doc[] = [];
        const fileContents = decodeFile(file);

        // split by new line
        const lines = fileContents.split(/\r?\n/);

        // remove empty lines at the end.
        while (lines.length > 0 && !lines.at(-1)?.trim()) {
            lines.pop();
        }

        // there are no lines
        if (lines.length === 0) {
            throw new BadRequestException('Die Datei ist leer.');
        }

        const baseLineMapArr = this.createBaseLineMap(lines);
        const {docs, noHead} = this.createDocRawArr(baseLineMapArr);

        // lines before the first HEAD belong to no document. Report them as one failed entry.
        if (noHead.length > 0) {
            const first = noHead[0];
            resultArr.push({
                id: randomUUID(),
                originalFileName: file.originalname,
                isSuccess: false,
                errorMsg: new DocumentError(
                    first.lineNr,
                    first.type,
                    'Satz vor dem ersten HEAD. Er gehört zu keinem Beleg.',
                ).message,
            });
        }

        resultArr.push(...this.createDocs(docs, file.originalname));

        // save to memory
        this.docs.push(...resultArr);

        return resultArr;
    }

    public getAllDocuments(): Doc[] {
        return this.docs;
    }

    public getJsonForId(id: string): GetJsonFileResponse {
        const doc = this.docs.find((d) => d.id === id);

        if (!doc) {
            throw new NotFoundException('Beleg nicht gefunden.');
        }

        if (!doc.isSuccess || !doc.data) {
            throw new BadRequestException('Der Beleg ist fehlerhaft, es kann keine JSON-Datei erzeugt werden.');
        }

        const fileName = `${parse(doc.originalFileName).name}_${doc.data.OHTDON}.json`;
        return {fileName, data: doc.data};
    }

    /**
     * creates the base line map. This is just every line split with lineNr, type and its fields.
     * @param fileContent
     * @private
     */
    private createBaseLineMap(fileContent: string[]): BaseLineMap[] {
        return fileContent.map((line: string, index: number): BaseLineMap => {
            const [type, ...fields] = line.split('|');
            return {
                lineNr: index + 1,
                type: type as DOC_TYPE, // type is still an unchecked string here, it is validated later. Until then it's treated as DOC_TYPE
                fields,
            };
        });
    }

    /**
     * creates and returns DocRaw. See interface for documentation.
     * This function was generated by claude. Comments added by me.
     * @private
     * @param lines
     */
    private createDocRawArr(lines: BaseLineMap[]): CreateDocRawResponse {
        const docs: DocRaw[] = [];
        // elements that have no head. Is used for lines before the first head.
        const noHead: DocRaw[] = [];
        let currentHead: DocRaw | undefined;
        let currentPos: DocRaw | undefined;

        for (const line of lines) {
            const node: DocRaw = {...line, texts: [], alcs: []};

            // new document starts. Reset currentPos.
            if (line.type === DOC_TYPE.HEAD) {
                node.pos = [];
                node.unknownLines = [];
                currentHead = node;
                currentPos = undefined;
                docs.push(node);
                continue;
            }

            // no current head exists. This means the element has no head.
            if (currentHead === undefined) {
                noHead.push(node);
                continue;
            }

            // add current pos to head and set current pos.
            if (line.type === DOC_TYPE.POS) {
                currentHead.pos?.push(node);
                currentPos = node;
                continue;
            }

            // line is either TEXT or ALC.
            if (line.type === DOC_TYPE.TEXT || line.type === DOC_TYPE.ALC) {
                // if no currentPos is set the TEXT or ALC belongs to currentHead.
                const owner = currentPos ?? currentHead;
                const keyToAddTo = line.type === DOC_TYPE.TEXT ? 'texts' : 'alcs';
                owner[keyToAddTo].push(node);
                continue;
            }

            // unknown type. Add to unknown lines.
            currentHead.unknownLines?.push(node);
        }

        return {docs, noHead};
    }

    /**
     * This function was entirely generated using claude. Documents were added by me.
     * validates every DocRaw.
     * @private
     */
    private createDocs(docRaws: DocRaw[], originalFileName: string): Doc[] {
        const docs: Doc[] = [];

        for (const docRaw of docRaws) {
            const id = randomUUID();
            try {
                // this will throw document specific error if something fails
                const data = this.createAndValidateHeadDoc(docRaw);
                docs.push({id, originalFileName, isSuccess: true, data});
            } catch (err: unknown) {
                if (!(err instanceof DocumentError)) {
                    // error isn't handled properly. This is a real bug. Log it.
                    this.logger.error(err);
                }
                const errorMsg =
                    err instanceof DocumentError
                        ? err.message
                        : `Satz ${docRaw.lineNr}: Unerwarteter Fehler bei der Verarbeitung.`;
                docs.push({id, originalFileName, isSuccess: false, errorMsg});
            }
        }
        return docs;
    }

    /**
     * creates and validates the entire doc.
     * @param docRaw
     * @private
     */
    private createAndValidateHeadDoc(docRaw: DocRaw): HeadJson {
        // has unknown types. Throw error.
        if (docRaw.unknownLines?.length) {
            const unknown = docRaw.unknownLines[0];
            throw new DocumentError(unknown.lineNr, docRaw.type, `Unbekannte Satzart "${unknown.type}".`);
        }

        this.validateAssignedElements(docRaw);
        for (const pos of docRaw.pos ?? []) {
            this.validateAssignedElements(pos);
        }

        // create and validate head.
        const head = this.validateDocRawAndCreateRecord(docRaw);

        // create and validate pos
        const pos = (docRaw.pos ?? []).map((p) => ({
            ...this.validateDocRawAndCreateRecord(p),
            POS_TEXT: p.texts.map((t) => this.validateDocRawAndCreateRecord(t)),
            POS_ALC: p.alcs.map((a) => this.validateDocRawAndCreateRecord(a)),
        }));

        // return head and all its assigned elements.
        return {
            ...head,
            HEAD_TEXT: docRaw.texts.map((t) => this.validateDocRawAndCreateRecord(t)),
            HEAD_ALC: docRaw.alcs.map((a) => this.validateDocRawAndCreateRecord(a)),
            POS: pos,
        } as HeadJson;
    }

    /**
     * returns the matching schema or undefined. Undefined means we haven't considered the type yet.
     * @param type
     * @private
     */
    private getSchema(type: string): AnyValidation | undefined {
        return this.docValidation[type as DOC_TYPE];
    }

    /**
     * Validates the DocRaw and its fields
     * @private
     * @return returns the record with field and value. Important: this is loosely typed but our checks will make it fit the corresponding interface.
     */
    private validateDocRawAndCreateRecord(docRaw: DocRaw): Record<string, string> {
        const schema = this.getSchema(docRaw.type);
        if (!schema) {
            throw new DocumentError(docRaw.lineNr, docRaw.type, `Unbekannte Satzart "${docRaw.type}".`);
        }

        // too few or too many fields. Throw error.
        if (docRaw.fields.length !== schema.order.length) {
            throw new DocumentError(
                docRaw.lineNr,
                docRaw.type,
                `${docRaw.type} hat ${docRaw.fields.length} Felder, erwartet werden ${schema.order.length}.`,
            );
        }

        const json: Record<string, string> = {RECID: docRaw.type};

        // iterate over order with index and fieldName. Index is the position in fields.
        for (const [index, fieldName] of schema.order.entries()) {
            const rule = schema.fields[fieldName];
            const value = docRaw.fields[index];

            // value is empty. Required -> error, optional -> skip.
            if (value === '') {
                if (rule.required) {
                    throw new DocumentError(docRaw.lineNr, docRaw.type, `${fieldName}: Pflichtfeld fehlt.`);
                }
                continue;
            }

            // first failing validator throws.
            for (const validator of rule.fieldValidators) {
                const error = validator(value);
                if (error) {
                    throw new DocumentError(docRaw.lineNr, docRaw.type, `${fieldName}: ${error}`);
                }
            }

            json[fieldName] = value;
        }

        for (const crossFieldCheck of schema.crossFieldChecks) {
            const {
                fieldName,
                dependsOnFields,
                check
            } = crossFieldCheck;
            const field = json[fieldName];
            const deps: Record<string, string | undefined> = Object.fromEntries(
                dependsOnFields.map((f) => [f, json[f]]),
            );

            const crossFieldError = check(field, deps);
            if (crossFieldError) {
                throw new DocumentError(docRaw.lineNr, docRaw.type, `${fieldName}: ${crossFieldError}`);
            }
        }

        return json;
    }

    // generated by claude. Comments added by me.
    private validateAssignedElements(node: DocRaw): void {
        const rules: Partial<Record<string, AssignedElementRule>> = this.getSchema(node.type)?.elementValidator ??
            {};

        for (const [type, rule] of Object.entries(rules)) {
            // we don't know if rule is defined. If not we just continue.
            if (!rule) {
                continue;
            }

            const {min, max} = rule;
            // get children of the specific type.
            const list = this.getChildren(node, type as DOC_TYPE);

            if (list.length < min) {
                throw new DocumentError(
                    node.lineNr,
                    node.type,
                    `Mindestens ${min} ${type}-Satz erforderlich, gefunden ${list.length}.`,
                );
            }

            if (list.length > max) {
                // error points to the first invalid list element.
                throw new DocumentError(list[max].lineNr, type, `Höchstens ${max} ${type}-Sätze erlaubt.`);
            }
        }
    }

    private getChildren(node: DocRaw, type: DOC_TYPE): DocRaw[] {
        switch (type) {
            case DOC_TYPE.ALC:
                return node.alcs;
            case DOC_TYPE.POS:
                return node.pos ?? [];
            case DOC_TYPE.TEXT:
                return node.texts;
            case DOC_TYPE.HEAD:
                throw new Error('getChildren() mit HEAD aufgerufen. HEAD ist kein valides Child.');
            default:
                throw new Error(`getChildren() mit unbekanntem Typ ${type satisfies never} aufgerufen.`);
        }
    }
}
