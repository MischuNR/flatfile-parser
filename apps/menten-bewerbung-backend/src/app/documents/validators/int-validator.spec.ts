import {intValidator} from "./int-validator";

describe('intValidator', () => {
    const validator = intValidator;

    it('value is not number', () => {
        expect(validator('abc')).toEqual(expect.any(String));
    });

    it('value is empty string', () => {
        expect(validator('')).toEqual(expect.any(String));
    });

    it('value has space', () => {
        expect(validator(' 1')).toEqual(expect.any(String));
    });

    it('value is negative', () => {
        expect(validator('-1')).toEqual(expect.any(String));
    });

    it('value is decimal with ","', () => {
        expect(validator('0,1')).toEqual(expect.any(String));
    });

    it('value is decimal with "."', () => {
        expect(validator('0.1')).toEqual(expect.any(String));
    });

    it('value is number', () => {
        expect(validator('1')).toBeNull();
    });

    it('value is zero', () => {
        expect(validator('0')).toBeNull();
    });
});