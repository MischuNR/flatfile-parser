/**
 * This function converts numeric field (INT, DECIMAL) values to a number.
 * Important: DECIMAL is separated by "," instead of "." which would cause errors for normal number parsing (Number('1,5') === NaN).
 * Also: negative numbers have the minus on the right which would result in NaN if parsed by plain Number()
 */
export function toNumber(value: string): number {
    const negative = value.endsWith('-');
    const withoutMinus = negative ? value.slice(0, -1) : value;
    const number = Number(withoutMinus.replace(',', '.'));
    return negative ? -number : number;
}
