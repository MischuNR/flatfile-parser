import {DOC_TYPE} from 'shared';

export type ElementValidators<Children extends DOC_TYPE> = {
    [K in Children]: AssignedElementRule;
};

export type AssignedElementRule = {
    min: number;
    max: number;
};