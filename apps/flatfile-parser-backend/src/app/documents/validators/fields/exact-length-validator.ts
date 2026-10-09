import {FieldValidatorFn} from '../../types/field-validator-fn';

export const exactLengthValidator = (exactLength: number): FieldValidatorFn => (value: string): string | null => {
  if (value.length !== exactLength) {
      return `Muss exakt ${exactLength} Zeichen haben.`;
  }
  return null;
};