import {FIELD_NAME} from "./field-name";
import {RequiredFieldValues} from "./required-field-values";
import {OptionalFieldValues} from "./optional-field-values";

export type TextDocFields = RequiredTextDocFields & OptionalTextDocFields;

type RequiredTextDocFields = FIELD_NAME.RECID |
    FIELD_NAME.OTXTXT1 |
    FIELD_NAME.OTXLNG;

type OptionalTextDocFields = FIELD_NAME.OTXTXT2 |
    FIELD_NAME.OTXTXT3 |
    FIELD_NAME.OTXTXT4 |
    FIELD_NAME.OTXTXT5;

export type TextJson = RequiredFieldValues<RequiredTextDocFields> &
    OptionalFieldValues<OptionalTextDocFields>;
