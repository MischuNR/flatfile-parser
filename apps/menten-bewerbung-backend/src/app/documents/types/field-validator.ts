import {FieldValidatorFn} from "./field-validator-fn";

/**
 * Some fields are required some not. To enforce type safety required fields expect true and optional fields false.
 * Helps with strong typing: enum for required and for optional. This is also used later to construct the response object.
 */
export type FieldValidator<RequiredFields extends PropertyKey, OptionalFields extends PropertyKey> = {
    [R in RequiredFields]: FieldValidatorBase & { required: true };
} & {
    [O in OptionalFields]: FieldValidatorBase & {required: false};
}


type FieldValidatorBase = {
    fieldValidators: FieldValidatorFn[];
}
