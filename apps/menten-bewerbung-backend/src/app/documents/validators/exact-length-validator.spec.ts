import {exactLengthValidator} from "./exact-length-validator";

describe('exactLengthValidator', () => {
    const validator = exactLengthValidator(3);

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