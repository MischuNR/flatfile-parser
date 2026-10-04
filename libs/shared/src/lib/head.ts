import {FIELD_NAME} from "./field-name";
import {RequiredFieldValues} from "./required-field-values";
import {PosJson} from "./pos";
import {TextJson} from "./text";
import {AlcJson} from "./alc";
import {OptionalFieldValues} from "./optional-field-values";

export type RequiredHeadDocFields = FIELD_NAME.RECID |
    FIELD_NAME.OHTRCP |
    FIELD_NAME.OHTSND |
    FIELD_NAME.OHTDOT |
    FIELD_NAME.OHTDOD |
    FIELD_NAME.OHTDON |
    FIELD_NAME.OHTNRF |
    FIELD_NAME.OHTDLD |
    FIELD_NAME.OHTON |
    FIELD_NAME.OHTOND |
    FIELD_NAME.OHTDQ |
    FIELD_NAME.OHTDQD |
    FIELD_NAME.OHTAKN |
    FIELD_NAME.OHTUSB |
    FIELD_NAME.OHTUSBD |
    FIELD_NAME.OHTIBY |
    FIELD_NAME.OHTVABY |
    FIELD_NAME.OHTIIV |
    FIELD_NAME.OHTVAIV |
    FIELD_NAME.OHTIDP |
    FIELD_NAME.OHTISU |
    FIELD_NAME.OHTRSU |
    FIELD_NAME.OHTVASU |
    FIELD_NAME.OHTIPE |
    FIELD_NAME.OHTVAPE |
    FIELD_NAME.OHTIPR |
    FIELD_NAME.OHTRFW |
    FIELD_NAME.OHTFOA |
    FIELD_NAME.OHTGES |
    FIELD_NAME.OHTZAB |
    FIELD_NAME.OHTGPB |
    FIELD_NAME.OHTSPB |
    FIELD_NAME.OHTGSB |
    FIELD_NAME.OHTINVTYP;

export type OptionalHeadDocFields = FIELD_NAME.OHTLN1 |
    FIELD_NAME.OHTLN2 |
    FIELD_NAME.OHTLN3 |
    FIELD_NAME.OHTLN4 |
    FIELD_NAME.OHTLN5 |
    FIELD_NAME.OHTLS1 |
    FIELD_NAME.OHTLS2 |
    FIELD_NAME.OHTLS3 |
    FIELD_NAME.OHTLS4 |
    FIELD_NAME.OHTLOR |
    FIELD_NAME.OHTLPL |
    FIELD_NAME.OHTLLA |
    FIELD_NAME.OHTMWS |
    FIELD_NAME.OHTPDF;


export type HeadJson = RequiredFieldValues<RequiredHeadDocFields> &
    OptionalFieldValues<OptionalHeadDocFields> &
    {
        HEAD_TEXT: TextJson[];
        HEAD_ALC: AlcJson[];
        POS: PosJson[];
    };

