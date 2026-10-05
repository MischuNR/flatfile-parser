import {FieldValidatorFn} from '../types/field-validator-fn';

export const allowedValuesValidator = (allowedValues: readonly string[]): FieldValidatorFn => (value: string): string | null => {
    if (!allowedValues.includes(value)) {
        return `Der Wert ist keiner der erlaubten Werte: ${allowedValues.join(', ')}.`
    }
    return null;
}