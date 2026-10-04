import {Injectable} from '@nestjs/common';
import {decodeFile} from "../../utils/decode-file";
import {Doc, DOC_TYPE, FIELD_NAME} from "shared";
import {DocValidation} from "./types/doc-validation";
import {headSchema} from "./schema/head-schema";
import {alcSchema} from "./schema/alc-schema";
import {posSchema} from "./schema/pos-schema";
import {textSchema} from "./schema/text-schema";

@Injectable()
export class DocumentsService {
    private readonly docs: Doc[] = [];

    private readonly docValidation: DocValidation = {
        [DOC_TYPE.HEAD]: headSchema,
        [DOC_TYPE.POS]: posSchema,
        [DOC_TYPE.ALC]: alcSchema,
        [DOC_TYPE.TEXT]: textSchema
    } as const;

    uploadFile(file: Express.Multer.File) {
        const fileContents = decodeFile(file);
        return 'This action adds a new document';
    }

    getAllDocuments(): Doc[] {
        return [];
    }

    getJsonForId(id: string) {

    }
}
