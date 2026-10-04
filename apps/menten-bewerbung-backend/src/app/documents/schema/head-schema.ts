import {FIELD_NAME, OptionalHeadDocFields, RequiredHeadDocFields} from "shared";
import {FieldValidator} from "../types/field-validator";

export const headSchema: FieldValidator<RequiredHeadDocFields, OptionalHeadDocFields> = {
    [FIELD_NAME.OHTRCP]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTSND]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTDOT]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTDOD]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTDON]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTNRF]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTDLD]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTON]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTOND]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTDQ]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTDQD]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTAKN]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTUSB]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTUSBD]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTIBY]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTVABY]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTIIV]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTVAIV]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTIDP]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTISU]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTRSU]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTVASU]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTIPE]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTVAPE]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTIPR]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTRFW]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTFOA]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTGES]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTZAB]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTGPB]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTSPB]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTGSB]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTINVTYP]: {
        required: true,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLN1]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLN2]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLN3]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLN4]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLN5]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLS1]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLS2]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLS3]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLS4]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLOR]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLPL]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTLLA]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTMWS]: {
        required: false,
        fieldValidators: []
    },
    [FIELD_NAME.OHTPDF]: {
        required: false,
        fieldValidators: []
    },
} as const;