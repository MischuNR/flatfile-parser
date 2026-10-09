import {
    DOC_TYPE,
    OptionalHeadDocFields,
    OptionalPosDocFields,
    RequiredHeadDocFields,
    RequiredPosDocFields,
    OptionalAlcDocFields, RequiredAlcDocFields, RequiredTextDocFields, OptionalTextDocFields, HeadElementDocTypes,
    PosElementDocTypes
} from 'shared';
import {FieldValidator} from './field-validator';
import {ElementValidators} from './assigned-element-rule';

/**
 * This type is the structure for field validation test.
 */
export type DocValidation = {
    [DOC_TYPE.HEAD]: DocValidationBase<RequiredHeadDocFields, OptionalHeadDocFields, HeadElementDocTypes>;
    [DOC_TYPE.POS]: DocValidationBase<RequiredPosDocFields, OptionalPosDocFields, PosElementDocTypes>;
    [DOC_TYPE.ALC]: DocValidationBase<RequiredAlcDocFields, OptionalAlcDocFields, never>;
    [DOC_TYPE.TEXT]: DocValidationBase<RequiredTextDocFields, OptionalTextDocFields, never>;
};

export type DocValidationBase<
    RequiredDocFields extends string,
    OptionalDocFields extends string,
    DocElementTypes extends DOC_TYPE,
> = {
    fields: FieldValidator<RequiredDocFields, OptionalDocFields>;
    order: readonly (RequiredDocFields | OptionalDocFields)[];
    crossFieldChecks: CrossFieldRule<RequiredDocFields | OptionalDocFields>[];
    elementValidator: ElementValidators<DocElementTypes>;
};

export type CrossFieldRule<F extends string> = {
    fieldName: F;
    dependsOnFields: readonly F[];
    check: (
        value: string | undefined,
        deps: Partial<Record<F, string>>,
    ) => string | null;
};