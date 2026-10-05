export function toNumber(value: string): number {
    const negative = value.endsWith('-');
    const withoutMinus = negative ? value.slice(0, -1) : value;
    const number = Number(withoutMinus.replace(',', '.'));
    return negative ? -number : number;
}
