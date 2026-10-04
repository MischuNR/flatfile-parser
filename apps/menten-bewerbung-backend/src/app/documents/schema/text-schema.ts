import {FieldValidator} from "../types/field-validator";
import {
    FIELD_NAME,
    OptionalPosDocFields,
    OptionalTextDocFields,
    RequiredPosDocFields,
    RequiredTextDocFields
} from "shared";

export const textSchema: FieldValidator<RequiredTextDocFields, OptionalTextDocFields> = {
    [FIELD_NAME.OTXTXT1]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OTXLNG]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OTXTXT2]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OTXTXT3]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OTXTXT4]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OTXTXT5]: {
        required: false,
        fieldValidators: []
    },
} as const;
