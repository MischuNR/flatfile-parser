import {ValidatorFn} from "./validator-fn";

export type FieldValidator<RequiredFields extends PropertyKey, OptionalFields extends PropertyKey> = {
    [R in RequiredFields]: FieldValidatorBase & { required: true };
} & {
    [O in OptionalFields]: FieldValidatorBase & {required: false};
}


type FieldValidatorBase = {
    fieldValidators: ValidatorFn[];
}