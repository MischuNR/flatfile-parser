import {HeadJson} from './head';

export interface Doc {
    id: string;
    originalFileName: string;
    isSuccess: boolean;
    errorMsg?: string;
    data?: HeadJson;
}