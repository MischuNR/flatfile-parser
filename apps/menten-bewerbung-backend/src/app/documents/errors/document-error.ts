export class DocumentError extends Error {
    constructor(
        public readonly lineNr: number,
        message: string,
    ) {
        super(`Zeile ${lineNr}: ${message}`);
        this.name = 'DocumentError';
    }
}