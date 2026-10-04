import {FIELD_NAME} from "./field-name";
import {RequiredFieldValues} from "./required-field-values";
import {OptionalFieldValues} from "./optional-field-values";
import {SharedRequiredFields} from "./shared-required-fields";

export type RequiredAlcDocFields = FIELD_NAME.OZAKZA |
    FIELD_NAME.OZAART |
    FIELD_NAME.OZAPROR;

export type OptionalAlcDocFields = FIELD_NAME.OZAPRO |
    FIELD_NAME.OZAPROB |
    FIELD_NAME.OZAMWS;

export type AlcJson = RequiredFieldValues<SharedRequiredFields> &
    RequiredFieldValues<RequiredAlcDocFields> &
    OptionalFieldValues<OptionalAlcDocFields>;
