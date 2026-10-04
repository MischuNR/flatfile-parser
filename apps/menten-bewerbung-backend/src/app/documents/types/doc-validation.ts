import {
    DOC_TYPE,
    OptionalHeadDocFields,
    OptionalPosDocFields,
    RequiredHeadDocFields,
    RequiredPosDocFields,
    OptionalAlcDocFields, RequiredAlcDocFields, RequiredTextDocFields, OptionalTextDocFields
} from "shared";
import {FieldValidator} from "./field-validator";

/**
 * This type is the structure for field validation test.
 */
export type DocValidation = {
    [DOC_TYPE.HEAD]: FieldValidator<RequiredHeadDocFields, OptionalHeadDocFields>;
    [DOC_TYPE.POS]: FieldValidator<RequiredPosDocFields, OptionalPosDocFields>;
    [DOC_TYPE.ALC]: FieldValidator<RequiredAlcDocFields, OptionalAlcDocFields>;
    [DOC_TYPE.TEXT]: FieldValidator<RequiredTextDocFields, OptionalTextDocFields>;
}