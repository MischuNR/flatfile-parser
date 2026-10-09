/**
 * DocRaw is a flexible format that applies to all types (HEAD, POS, ALC, TEXT, ...) and tries to order them.
 */
export interface DocRaw {
    type: string;
    lineNr: number;
    fields: string[];
    /**
     * Only set on POS and HEAD
     */
    texts?: DocRaw[];
    /**
     * Only set on POS and HEAD
     */
    alcs?: DocRaw[];
    /**
     * Only set on HEAD
     */
    pos?: DocRaw[];
    /**
     * Types that can't be assigned.
     */
    unknownLines?: DocRaw[];
}