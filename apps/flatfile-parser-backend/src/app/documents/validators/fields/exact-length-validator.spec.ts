import {exactValueLengthValidator} from './exact-value-length-validator';

describe('exactLengthValidator', () => {
    const validator = exactValueLengthValidator(3);

    it('value length is low', () => {
        expect(validator('ab')).toEqual(expect.any(String));
    });

    it('value length is bigger', () => {
        expect(validator('abcd')).toEqual(expect.any(String));
    });

    it('value length is equal', () => {
        expect(validator('abc')).toBeNull();
    });
});