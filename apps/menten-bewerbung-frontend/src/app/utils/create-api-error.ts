import {ApiError} from '../types/api-error';
import {HttpErrorResponse} from '@angular/common/http';

export function createApiError(err: unknown): ApiError {
    if (err instanceof HttpErrorResponse) {
        return {
            statusCode: err.status,
            message: err.status === 0 ?
                'Server ist nicht erreichbar.' :
                err.error?.message ?? err.message,
            isApiError: true
        };
    }
    return {
        message: 'Unbekannter Fehler.',
        isApiError: true
    };

}
