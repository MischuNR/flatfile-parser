import {FieldValidator} from "../types/field-validator";
import {FIELD_NAME, OptionalPosDocFields, RequiredPosDocFields} from "shared";

export const posSchema: FieldValidator<RequiredPosDocFields, OptionalPosDocFields> = {
    [FIELD_NAME.OPOLDF]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOEAN]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOSA]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOZTN]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOALT]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOPOB]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOEIP]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOEIPE]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOEIPB]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OPOBEM]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OPOBEE]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OPOMOB]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OPOMOE]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OPOGZA]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OPOMWS]: {
        required: false,
        fieldValidators: []
    },
} as const;