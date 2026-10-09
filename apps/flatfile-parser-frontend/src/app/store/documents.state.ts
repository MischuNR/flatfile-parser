import {Doc} from 'shared';
import {ApiError} from '../types/api-error';
import {STATUS_FILTER} from '../types/status-filter';


export interface DocumentsState {
    documents: Doc[];
    loadDocumentsError: null | ApiError;
    isLoadingDocuments: boolean;
    isUploading: boolean;
    uploadError: ApiError | null;
    statusFilter: STATUS_FILTER;
    recipientFilter: string;
    documentNumberFilter: string;
}

export const initialState: DocumentsState = {
    documents: [],
    // will be loaded immediately. With that it looks cleaner.
    isLoadingDocuments: true,
    loadDocumentsError: null,
    isUploading: false,
    uploadError: null,
    statusFilter: STATUS_FILTER.ALL,
    recipientFilter: '',
    documentNumberFilter: '',
};