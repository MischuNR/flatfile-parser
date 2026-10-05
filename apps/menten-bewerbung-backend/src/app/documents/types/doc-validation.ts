import {
    DOC_TYPE,
    OptionalHeadDocFields,
    OptionalPosDocFields,
    RequiredHeadDocFields,
    RequiredPosDocFields,
    OptionalAlcDocFields, RequiredAlcDocFields, RequiredTextDocFields, OptionalTextDocFields, HeadDocFields,
    PosDocFields, TextDocFields, AlcDocFields
} from 'shared';
import {FieldValidator} from './field-validator';

/**
 * This type is the structure for field validation test.
 */
export type DocValidation = {
    [DOC_TYPE.HEAD]: {
        fields: FieldValidator<RequiredHeadDocFields, OptionalHeadDocFields>,
        order: readonly HeadDocFields[],
    };
    [DOC_TYPE.POS]: {
        fields: FieldValidator<RequiredPosDocFields, OptionalPosDocFields>,
        order: readonly PosDocFields[],
    };
    [DOC_TYPE.ALC]: {
        fields: FieldValidator<RequiredAlcDocFields, OptionalAlcDocFields>,
        order: readonly AlcDocFields[],
    };
    [DOC_TYPE.TEXT]: {
        fields: FieldValidator<RequiredTextDocFields, OptionalTextDocFields>,
        order: readonly TextDocFields[],
    };
}