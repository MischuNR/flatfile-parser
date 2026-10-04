import {FieldValidatorFn} from "../types/field-validator-fn";

export const minNumericValueValidator = (minValue: number): FieldValidatorFn => (value: string): string | null  => {
    if (Number(value) < minValue) {
        return `Der Wert muss mindestens ${minValue} sein.`;
    }
    return null;
};