/**
 * used for field validation. This function is never called with an empty value
 * @returns null when validation was successful and string (specific error message) when validation failed.
 */
export type FieldValidatorFn = (value: string) => string | null;