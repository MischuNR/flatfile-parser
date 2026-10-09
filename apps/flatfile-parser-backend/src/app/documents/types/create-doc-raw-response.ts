import {DocRaw} from './doc-raw';

export interface CreateDocRawResponse {
    docs: DocRaw[];
    noHead: DocRaw[];
}
