import {FIELD_NAME} from "./field-name";
import {RequiredFieldValues} from "./required-field-values";
import {OptionalFieldValues} from "./optional-field-values";

type RequiredAlcDocFields = FIELD_NAME.RECID |
    FIELD_NAME.OZAKZA |
    FIELD_NAME.OZAART |
    FIELD_NAME.OZAPROR;

type OptionalAlcDocFields = FIELD_NAME.OZAPRO |
    FIELD_NAME.OZAPROB |
    FIELD_NAME.OZAMWS;

export type AlcJson = RequiredFieldValues<RequiredAlcDocFields> &
    OptionalFieldValues<OptionalAlcDocFields>;
