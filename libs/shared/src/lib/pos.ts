import {FIELD_NAME} from './field-name';
import {RequiredFieldValues} from './required-field-values';
import {TextJson} from './text';
import {AlcJson} from './alc';
import {OptionalFieldValues} from './optional-field-values';
import {DOC_TYPE} from './doc-types';
import {BaseRecordJson} from './base-record-json';

export type PosDocFields = RequiredPosDocFields | OptionalPosDocFields;

export type RequiredPosDocFields = FIELD_NAME.OPOLDF |
    FIELD_NAME.OPOEAN |
    FIELD_NAME.OPOSA |
    FIELD_NAME.OPOALT |
    FIELD_NAME.OPOPOB |
    FIELD_NAME.OPOEIP |
    FIELD_NAME.OPOEIPE |
    FIELD_NAME.OPOEIPB;

export type OptionalPosDocFields = FIELD_NAME.OPOBEM |
    FIELD_NAME.OPOBEE |
    FIELD_NAME.OPOMOB |
    FIELD_NAME.OPOZTN |
    FIELD_NAME.OPOMOE |
    FIELD_NAME.OPOGZA |
    FIELD_NAME.OPOMWS;

export type PosJson = BaseRecordJson &
    RequiredFieldValues<RequiredPosDocFields> &
    OptionalFieldValues<OptionalPosDocFields> &
    {
        POS_TEXT: TextJson[];
        POS_ALC: AlcJson[];
    };

export type PosElementDocTypes = DOC_TYPE.TEXT | DOC_TYPE.ALC;
