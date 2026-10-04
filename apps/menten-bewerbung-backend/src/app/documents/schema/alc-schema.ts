import {FieldValidator} from "../types/field-validator";
import {FIELD_NAME, OptionalAlcDocFields, RequiredAlcDocFields} from "shared";

export const alcSchema: FieldValidator<RequiredAlcDocFields, OptionalAlcDocFields> = {
    [FIELD_NAME.OZAKZA]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OZAART]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OZAPROR]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OZAPRO]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OZAPROB]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OZAMWS]: {
        required: false,
        fieldValidators: []
    },

} as const;