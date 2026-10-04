import {FieldValidator} from "../types/field-validator";
import {AlcDocFields, FIELD_NAME, OptionalAlcDocFields, RequiredAlcDocFields} from "shared";
import {exactLengthValidator} from "../validators/exact-length-validator";
import {minValueLengthValidator} from "../validators/min-value-length-validator";
import {maxValueLengthValidator} from "../validators/max-value-length-validator";
import {decimalValidator} from "../validators/decimal-validator";
import {allowedValuesValidator} from "../validators/allowed-values-validator";

export const alcFieldOrder = [
    FIELD_NAME.OZAKZA,
    FIELD_NAME.OZAART,
    FIELD_NAME.OZAPRO,
    FIELD_NAME.OZAPROB,
    FIELD_NAME.OZAPROR,
    FIELD_NAME.OZAMWS,
] as const satisfies readonly AlcDocFields[];

export const alcSchema: FieldValidator<RequiredAlcDocFields, OptionalAlcDocFields> = {
    [FIELD_NAME.OZAKZA]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(1),
            allowedValuesValidator(['A', 'C'])
        ]
    },
    [FIELD_NAME.OZAART]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(2),
            maxValueLengthValidator(3),
            allowedValuesValidator(['DI', 'TD', 'FC', 'IN', 'PC'])
        ]
    },
    [FIELD_NAME.OZAPRO]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(6),
            decimalValidator(3, 2)
        ]
    },
    [FIELD_NAME.OZAPROB]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OZAPROR]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OZAMWS]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(5),
            decimalValidator(2, 2)
        ]
    },
};