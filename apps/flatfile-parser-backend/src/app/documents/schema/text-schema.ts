import {FieldValidator} from '../types/field-validator';
import {
    FIELD_NAME,
    OptionalTextDocFields,
    RequiredTextDocFields, TextDocFields
} from 'shared';
import {minValueLengthValidator} from '../validators/fields/min-value-length-validator';
import {maxValueLengthValidator} from '../validators/fields/max-value-length-validator';

export const textFieldOrder = [
    FIELD_NAME.OTXTXT1,
    FIELD_NAME.OTXTXT2,
    FIELD_NAME.OTXTXT3,
    FIELD_NAME.OTXTXT4,
    FIELD_NAME.OTXTXT5,
    FIELD_NAME.OTXLNG,
] as const satisfies readonly TextDocFields[];

export const textSchema: FieldValidator<RequiredTextDocFields, OptionalTextDocFields> = {
    [FIELD_NAME.OTXTXT1]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(70),
        ]
    },
    [FIELD_NAME.OTXTXT2]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(70),
        ]
    },
    [FIELD_NAME.OTXTXT3]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(70),
        ]
    },
    [FIELD_NAME.OTXTXT4]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(70),
        ]
    },
    [FIELD_NAME.OTXTXT5]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(70),
        ]
    },
    [FIELD_NAME.OTXLNG]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(2),
            maxValueLengthValidator(3),
        ]
    },
};
