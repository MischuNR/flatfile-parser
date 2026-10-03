import {DocJson} from "./doc-json";

export interface Doc {
    id: string;
    originalFileName: string;
    isSuccess: boolean;
    errorMsg?: string;
    data?: DocJson;
}