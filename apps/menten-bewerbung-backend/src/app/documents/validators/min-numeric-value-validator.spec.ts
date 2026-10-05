import {minNumericValueValidator} from "./min-numeric-value-validator";

describe('minNumericValueValidator', () => {
    const validator = minNumericValueValidator(3);

    it('value too low', () => {
        expect(validator('2')).toEqual(expect.any(String));
    });

    it('value exactly like expected value', () => {
        expect(validator('3')).toBeNull();
    });

    it('value is one bigger than min', () => {
        expect(validator('4')).toBeNull();
    });
});