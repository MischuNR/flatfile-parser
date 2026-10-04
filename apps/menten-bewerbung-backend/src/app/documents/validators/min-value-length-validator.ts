import {FieldValidatorFn} from "../types/field-validator-fn";

export const minValueLengthValidator = (minLength: number): FieldValidatorFn => (value: string): string | null  => {
    if (value.length < minLength) {
        return `Muss mindestens ${minLength} Zeichen haben.`;
    }
    return null;
};