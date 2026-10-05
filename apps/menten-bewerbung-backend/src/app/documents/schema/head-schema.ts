import {FIELD_NAME, HeadDocFields, OptionalHeadDocFields, RequiredHeadDocFields} from 'shared';
import {FieldValidator} from '../types/field-validator';
import {minValueLengthValidator} from '../validators/min-value-length-validator';
import {maxValueLengthValidator} from '../validators/max-value-length-validator';
import {dateValidator} from '../validators/date-validator';
import {exactLengthValidator} from '../validators/exact-length-validator';
import {decimalValidator} from '../validators/decimal-validator';
import {allowedValuesValidator} from '../validators/allowed-values-validator';

export const headFieldOrder  = [
    FIELD_NAME.OHTRCP,
    FIELD_NAME.OHTSND,
    FIELD_NAME.OHTDOT,
    FIELD_NAME.OHTDOD,
    FIELD_NAME.OHTDON,
    FIELD_NAME.OHTNRF,
    FIELD_NAME.OHTDLD,
    FIELD_NAME.OHTON,
    FIELD_NAME.OHTOND,
    FIELD_NAME.OHTDQ,
    FIELD_NAME.OHTDQD,
    FIELD_NAME.OHTAKN,
    FIELD_NAME.OHTUSB,
    FIELD_NAME.OHTUSBD,
    FIELD_NAME.OHTIBY,
    FIELD_NAME.OHTVABY,
    FIELD_NAME.OHTIIV,
    FIELD_NAME.OHTVAIV,
    FIELD_NAME.OHTIDP,
    FIELD_NAME.OHTLN1,
    FIELD_NAME.OHTLN2,
    FIELD_NAME.OHTLN3,
    FIELD_NAME.OHTLN4,
    FIELD_NAME.OHTLN5,
    FIELD_NAME.OHTLS1,
    FIELD_NAME.OHTLS2,
    FIELD_NAME.OHTLS3,
    FIELD_NAME.OHTLS4,
    FIELD_NAME.OHTLOR,
    FIELD_NAME.OHTLPL,
    FIELD_NAME.OHTLLA,
    FIELD_NAME.OHTISU,
    FIELD_NAME.OHTRSU,
    FIELD_NAME.OHTVASU,
    FIELD_NAME.OHTIPE,
    FIELD_NAME.OHTVAPE,
    FIELD_NAME.OHTIPR,
    FIELD_NAME.OHTMWS,
    FIELD_NAME.OHTRFW,
    FIELD_NAME.OHTFOA,
    FIELD_NAME.OHTGES,
    FIELD_NAME.OHTZAB,
    FIELD_NAME.OHTGPB,
    FIELD_NAME.OHTSPB,
    FIELD_NAME.OHTGSB,
    FIELD_NAME.OHTINVTYP,
    FIELD_NAME.OHTPDF
] as const satisfies readonly HeadDocFields[];

export const headSchema: FieldValidator<RequiredHeadDocFields, OptionalHeadDocFields> = {
    [FIELD_NAME.OHTRCP]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTSND]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTDOT]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(3),
            allowedValuesValidator(['380', '381', '83', '84'])
        ]
    },
    [FIELD_NAME.OHTDOD]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(10),
            dateValidator,
        ]
    },
    [FIELD_NAME.OHTDON]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTNRF]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(1),
            allowedValuesValidator(['7', '9'])
        ]
    },
    [FIELD_NAME.OHTDLD]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(10),
            dateValidator,
        ]
    },
    [FIELD_NAME.OHTON]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTOND]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(10),
            dateValidator
        ]
    },
    [FIELD_NAME.OHTDQ]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTDQD]: {
        required: false,
        fieldValidators: [
            exactLengthValidator(10),
            dateValidator,
        ]
    },
    [FIELD_NAME.OHTAKN]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTUSB]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTUSBD]: {
        required: false,
        fieldValidators: [
            exactLengthValidator(10),
            dateValidator,
        ]
    },
    [FIELD_NAME.OHTIBY]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(13),
        ]
    },
    [FIELD_NAME.OHTVABY]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTIIV]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(13),
        ]
    },
    [FIELD_NAME.OHTVAIV]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTIDP]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(13),
        ]
    },
    [FIELD_NAME.OHTLN1]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLN2]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLN3]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLN4]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLN5]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLS1]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLS2]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLS3]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLS4]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLOR]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTLPL]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(9),
        ]
    },
    [FIELD_NAME.OHTLLA]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(2),
            maxValueLengthValidator(3),
        ]
    },
    [FIELD_NAME.OHTISU]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(13),
        ]
    },
    [FIELD_NAME.OHTRSU]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTVASU]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTIPE]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(13),
        ]
    },
    [FIELD_NAME.OHTVAPE]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(35),
        ]
    },
    [FIELD_NAME.OHTIPR]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(13),
        ]
    },
    [FIELD_NAME.OHTMWS]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(5),
            decimalValidator(2,2)
        ]
    },
    [FIELD_NAME.OHTRFW]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(3),
        ]
    },
    [FIELD_NAME.OHTFOA]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(10),
            dateValidator
        ]
    },
    [FIELD_NAME.OHTGES]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OHTZAB]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OHTGPB]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OHTSPB]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OHTGSB]: {
        required: true,
        fieldValidators: [
            minValueLengthValidator(4),
            maxValueLengthValidator(15),
            decimalValidator(11, 2)
        ]
    },
    [FIELD_NAME.OHTINVTYP]: {
        required: true,
        fieldValidators: [
            exactLengthValidator(1),
            allowedValuesValidator(['S', 'T'])
        ]
    },
    [FIELD_NAME.OHTPDF]: {
        required: false,
        fieldValidators: [
            minValueLengthValidator(1),
            maxValueLengthValidator(255),
        ]
    },
};