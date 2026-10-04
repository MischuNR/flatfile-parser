import {FieldValidatorFn} from "../types/field-validator-fn";

export const maxValueLengthValidator = (maxLength: number): FieldValidatorFn => (value: string): string | null  => {
    if (value.length > maxLength) {
        return `Darf höchstens ${maxLength} Zeichen haben.`;
    }
    return null;
};