import {DocRaw} from '../../types/doc-raw';
import {centTolerance, HeadJson, toNumber} from 'shared';
import {DocumentError} from '../../errors/document-error';

export function validatePosOpopobSumWithHeadOhtgpb(headRaw: DocRaw, headJson: HeadJson): void {
    // go over every pos and add its OPOPOB to the sum. Sum starts at 0.
    const positionSum = headJson.POS.reduce((sum, pos) => sum + toNumber(pos.OPOPOB), 0);
    const expected = toNumber(headJson.OHTGPB);

    // sum could have a small difference because calculating floats leaves a small incorrection. We need to check the tolerance for that.
    if (Math.abs(positionSum - expected) >= centTolerance) {
    throw new DocumentError(
        headRaw.lineNr,
        headRaw.type,
        `OHTGPB: Summe der Positionsbeträge stimmt nicht. Erwartet ${positionSum.toFixed(2)}, gefunden ${headJson.OHTGPB}.`,
    );
}
}