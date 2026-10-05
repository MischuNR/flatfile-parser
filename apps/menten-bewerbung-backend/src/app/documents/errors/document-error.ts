export class DocumentError extends Error {
    constructor(
        public readonly lineNr: number,
        private readonly type: string,
        message: string,
    ) {
        super(`Zeile ${lineNr} (${type}): ${message}`);
        this.name = 'DocumentError';
    }
}