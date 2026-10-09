import {DocumentError} from '../../errors/document-error';
import {PosJson} from 'shared';
import {DocRaw} from '../../types/doc-raw';

export function validatePosOpoldf(rawPositions: DocRaw[], positions: PosJson[]): void {
    let previousId = 0;
    positions.forEach((position, i) => {
        // rawPositions[i] was used to build positions[i], so we can access rawPositions for the line number.
        const raw = rawPositions[i];
        const opoldfNumber = Number(position.OPOLDF);
        if (opoldfNumber <= previousId) {
            throw new DocumentError(raw.lineNr, raw.type, `OPOLDF: Muss aufsteigend und eindeutig sein. Gefunden ${opoldfNumber}, grösser als ${previousId} erwartet.`);
        }
        previousId = opoldfNumber;
    });
}