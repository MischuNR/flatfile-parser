import {Injectable} from '@nestjs/common';
import {decodeFile} from '../../utils/decode-file';
import {Doc, DOC_TYPE} from 'shared';
import {DocValidation} from './types/doc-validation';
import {headFieldOrder, headSchema} from './schema/head-schema';
import {alcFieldOrder, alcSchema} from './schema/alc-schema';
import {posFieldOrder, posSchema} from './schema/pos-schema';
import {textFieldOrder, textSchema} from './schema/text-schema';

@Injectable()
export class DocumentsService {
    private readonly docs: Doc[] = [];

    private readonly docValidation: DocValidation = {
        [DOC_TYPE.HEAD]: {
            fields: headSchema,
            order: headFieldOrder
        },
        [DOC_TYPE.POS]: {
            fields: posSchema,
            order: posFieldOrder
        },
        [DOC_TYPE.ALC]: {
            fields: alcSchema,
            order: alcFieldOrder,
        },
        [DOC_TYPE.TEXT]: {
            fields: textSchema,
            order: textFieldOrder
        }
    };

    public uploadFile(file: Express.Multer.File) {
        const fileContents = decodeFile(file);
        return 'This action adds a new document';
    }

    public getAllDocuments(): Doc[] {
        return [];
    }

    public getJsonForId(id: string): null {
        return null;
    }
}
