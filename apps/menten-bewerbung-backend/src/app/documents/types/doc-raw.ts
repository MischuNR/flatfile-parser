export interface DocRaw {
    type: string;
    lineNr: number;
    fields: string[];
    elements: DocRaw[];
    positions: DocRaw[];
}