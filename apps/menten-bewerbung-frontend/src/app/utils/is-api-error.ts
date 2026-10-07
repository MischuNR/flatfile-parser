import {ApiError} from '../types/api-error';

export function isApiError(value: unknown): value is ApiError {
    return typeof value === 'object' && value !== null && (value as ApiError).isApiError === true;
}