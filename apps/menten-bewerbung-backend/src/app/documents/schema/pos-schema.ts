import {FieldValidator} from "../types/field-validator";
import {FIELD_NAME, HeadDocFields, OptionalPosDocFields, PosDocFields, RequiredPosDocFields} from "shared";
import {intValidator} from "../validators/int-validator";
import {minValueLengthValidator} from "../validators/min-value-length-validator";
import {maxValueLengthValidator} from "../validators/max-value-length-validator";
import {decimalValidator} from "../validators/decimal-validator";
import {exactLengthValidator} from "../validators/exact-length-validator";
import {minNumericValueValidator} from "../validators/min-numeric-value-validator";

export const posFieldOrder = [
    FIELD_NAME.OPOLDF,
    FIELD_NAME.OPOEAN,
    FIELD_NAME.OPOSA,
    FIELD_NAME.OPOZTN,
    FIELD_NAME.OPOALT,
    FIELD_NAME.OPOBEM,
    FIELD_NAME.OPOBEE,
    FIELD_NAME.OPOMOB,
    FIELD_NAME.OPOMOE,
    FIELD_NAME.OPOPOB,
    FIELD_NAME.OPOGZA,
    FIELD_NAME.OPOEIP,
    FIELD_NAME.OPOEIPE,
    FIELD_NAME.OPOEIPB,
    FIELD_NAME.OPOMWS,
] as const satisfies readonly PosDocFields[];

export const posSchema: FieldValidator<RequiredPosDocFields, OptionalPosDocFields> = {
    [FIELD_NAME.OPOLDF]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(6),
            intValidator,
            minNumericValueValidator(1)
        ]
    },
    [FIELD_NAME.OPOEAN]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(13),
        ]
    },
    [FIELD_NAME.OPOSA]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OPOZTN]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OPOALT]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OPOBEM]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OPOBEE]: {
        required: false,
        fieldValidators: [
            exactLengthValidator(3)
        ]
    },
    [FIELD_NAME.OPOMOB]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OPOMOE]: {
        required: false,
        fieldValidators: [
            exactLengthValidator(3)
        ]
    },
    [FIELD_NAME.OPOPOB]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OPOGZA]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OPOEIP]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OPOEIPE]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(3)
        ]
    },
    [FIELD_NAME.OPOEIPB]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(9),
            decimalValidator(6, 2)
        ]
    },
    [FIELD_NAME.OPOMWS]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(5),
            decimalValidator(2, 2)
        ]
    },
};