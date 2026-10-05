import {DOC_TYPE} from 'shared';

export interface BaseLineMap {
    lineNr: number;
    type: DOC_TYPE;
    fields: string[];
}