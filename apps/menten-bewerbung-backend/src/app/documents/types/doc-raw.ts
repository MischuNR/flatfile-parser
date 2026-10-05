/**
 * DocRaw is a flexible format that applies to all types (HEAD, POS, ALC, TEXT, ...) and tries to order them.
 * HEAD and POS are main types and will have ALC and TEXT. POS is only set on HEAD.
 */
export interface DocRaw {
    type: string;
    lineNr: number;
    fields: string[];
    texts: DocRaw[];
    alcs: DocRaw[];
    pos?: DocRaw[];
    /**
     * Types that can't be assigned.
     */
    unknownLines?: DocRaw[];
}