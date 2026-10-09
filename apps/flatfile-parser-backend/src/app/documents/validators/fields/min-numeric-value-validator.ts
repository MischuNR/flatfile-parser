import {FieldValidatorFn} from '../../types/field-validator-fn';
import {toNumber} from 'shared';

/**
 * checks for a min value in a field. Works for both INT and DECIMAL.
 * @param minValue
 */
export const minNumericValueValidator = (minValue: number): FieldValidatorFn => (value: string): string | null  => {
    if (toNumber(value) < minValue) {
        return `Der Wert muss mindestens ${minValue} sein.`;
    }
    return null;
};