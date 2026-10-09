import {BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {decodeFile} from './utils/decode-file';
import {AlcJson, Doc, DOC_TYPE, BaseRecordJson, HeadJson, PosJson, TextJson} from 'shared';
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
import {validatePosOpoldf} from './validators/doc/validate-pos-opoldf';
import {validatePosOpopobSumWithHeadOhtgpb} from './validators/doc/validate-pos-opopob-sum-with-head-ohtgpb';
import {validateTaxRates} from './validators/doc/validate-tax-rates';
import {createDocRawArr} from './utils/create-doc-raw-arr';

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
        const {docs, noHead} = createDocRawArr(baseLineMapArr);

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
                    'Zeile vor dem ersten HEAD. Gehört zu keinem Beleg.',
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

        // sanitize file name to:
        // " would end the file name too early.
        // \r\n would start a new header line (header injection e.g. setting custom header)
        const sanitizeFileName = (s: string): string => s.replace(/["\r\n]/g, '');
        const fileName = `${sanitizeFileName(parse(doc.originalFileName).name)}_${sanitizeFileName(doc.data.OHTDON)}.json`;

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
     * This function was entirely generated using claude. Comments were added by me.
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
                        : `Zeile ${docRaw.lineNr}: Unerwarteter Fehler bei der Verarbeitung.`;
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
            const typeLabel = unknown.type || 'leer';
            throw new DocumentError(unknown.lineNr, typeLabel, `Unbekannte Satzart "${typeLabel}".`);
        }

        this.validateAssignedElements(docRaw);
        for (const pos of docRaw.pos ?? []) {
            this.validateAssignedElements(pos);
        }

        // create and validate head.
        const head = this.validateDocRawAndCreateRecord<Omit<HeadJson, 'HEAD_TEXT' | 'HEAD_ALC' | 'POS'>>(docRaw);

        // create and validate pos.
        const pos = (docRaw.pos ?? []).map((p): PosJson => ({
            ...this.validateDocRawAndCreateRecord<Omit<PosJson, 'POS_TEXT' | 'POS_ALC'>>(p),
            POS_TEXT: p.texts?.map((t) => this.validateDocRawAndCreateRecord<TextJson>(t)) ?? [],
            POS_ALC: p.alcs?.map((a) => this.validateDocRawAndCreateRecord<AlcJson>(a)) ?? [],
        }));
        this.validatePosFields(docRaw.pos ?? [], pos);

        const headJson: HeadJson = {
            ...head,
            HEAD_TEXT: docRaw.texts?.map((t) => this.validateDocRawAndCreateRecord<TextJson>(t)) ?? [],
            HEAD_ALC: docRaw.alcs?.map((a) => this.validateDocRawAndCreateRecord<AlcJson>(a)) ?? [],
            POS: pos,
        };

        this.validateHeadJson(docRaw, headJson);

        return headJson;
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
     * @return returns the record with field and value.
     */
    private validateDocRawAndCreateRecord<T extends BaseRecordJson>(docRaw: DocRaw): T {
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

        return json as T;
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
                return node.alcs ?? [];
            case DOC_TYPE.POS:
                return node.pos ?? [];
            case DOC_TYPE.TEXT:
                return node.texts ?? [];
            case DOC_TYPE.HEAD:
                throw new Error('getChildren() mit HEAD aufgerufen. HEAD ist kein valides Child.');
            default:
                throw new Error(`getChildren() mit unbekanntem Typ ${type satisfies never} aufgerufen.`);
        }
    }

    private validatePosFields(rawPositions: DocRaw[], positions: PosJson[]): void {
        validatePosOpoldf(rawPositions, positions);
    }

    private validateHeadJson(headRaw: DocRaw, headJson: HeadJson): void {
        validatePosOpopobSumWithHeadOhtgpb(headRaw, headJson);
        validateTaxRates(headRaw, headJson);
    }
}
