import {FieldValidatorFn} from "../types/field-validator-fn";

export const minNumericValueValidator = (minValue: number): FieldValidatorFn => (value: string) => {
    if (Number(value) < minValue) {
        return `Der Wert muss mindestens ${minValue} sein.`;
    }
    return null;
};