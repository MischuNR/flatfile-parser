import {FIELD_NAME} from './field-name';
import {RequiredFieldValues} from './required-field-values';
import {OptionalFieldValues} from './optional-field-values';
import {BaseRecordJson} from './base-record-json';

export type TextDocFields = RequiredTextDocFields | OptionalTextDocFields;

export type RequiredTextDocFields = FIELD_NAME.OTXTXT1 |
    FIELD_NAME.OTXLNG;

export type OptionalTextDocFields = FIELD_NAME.OTXTXT2 |
    FIELD_NAME.OTXTXT3 |
    FIELD_NAME.OTXTXT4 |
    FIELD_NAME.OTXTXT5;

export type TextJson = BaseRecordJson &
    RequiredFieldValues<RequiredTextDocFields> &
    OptionalFieldValues<OptionalTextDocFields>;
