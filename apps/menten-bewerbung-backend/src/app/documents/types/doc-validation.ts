import {
    DOC_TYPE,
    OptionalHeadDocFields,
    OptionalPosDocFields,
    RequiredHeadDocFields,
    RequiredPosDocFields,
    OptionalAlcDocFields, RequiredAlcDocFields, RequiredTextDocFields, OptionalTextDocFields} from 'shared';
import {FieldValidator} from './field-validator';

/**
 * This type is the structure for field validation test.
 */
export type DocValidation = {
    [DOC_TYPE.HEAD]: DocValidationBase<RequiredHeadDocFields, OptionalHeadDocFields>;
    [DOC_TYPE.POS]: DocValidationBase<RequiredPosDocFields, OptionalPosDocFields>;
    [DOC_TYPE.ALC]: DocValidationBase<RequiredAlcDocFields, OptionalAlcDocFields>;
    [DOC_TYPE.TEXT]: DocValidationBase<RequiredTextDocFields, OptionalTextDocFields>;
};

export type DocValidationBase<
    RequiredDocFields extends string,
    OptionalDocFields extends string,
> = {
    fields: FieldValidator<RequiredDocFields, OptionalDocFields>;
    order: readonly (RequiredDocFields | OptionalDocFields)[];
};