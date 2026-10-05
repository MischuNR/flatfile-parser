import {maxValueLengthValidator} from './max-value-length-validator';

describe('maxValueLengthValidator', () => {
    const validator = maxValueLengthValidator(3);

    it('value length too big', () => {
        expect(validator('1234')).toEqual(expect.any(String));
    });

    it('value length exactly like expected value', () => {
        expect(validator('123')).toBeNull();
    });

    it('value length is one lower than max', () => {
        expect(validator('12')).toBeNull();
    });
});