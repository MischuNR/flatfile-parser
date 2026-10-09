import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Doc, documentBaseRoute, documentGetJsonFileRoute, fileInterceptorKeyName} from 'shared';
import {createApiError} from '../utils/create-api-error';
import {ApiError} from '../types/api-error';

@Service()
export class DocumentsService {
    private readonly hostName = 'http://localhost:3000/';

    private readonly httpClient = inject(HttpClient);

    public getAllDocuments(): Observable<Doc[] | ApiError> {
        return this.httpClient.get<Doc[]>(`${this.hostName}${documentBaseRoute}`).pipe(
            catchError(err => of(createApiError(err)))
        );
    }

    public uploadDocument(file: File): Observable<Doc[] | ApiError> {
        const formData = new FormData();
        formData.append(fileInterceptorKeyName, file);
        return this.httpClient.post<Doc[]>(`${this.hostName}${documentBaseRoute}`, formData).pipe(
            catchError(err => of(createApiError(err)))
        );
    }

    public createJsonDownloadUrlForDocument(id: string): string {
        const jsonUrl = documentGetJsonFileRoute.replace(':id', id);
        return `${this.hostName}${documentBaseRoute}/${jsonUrl}`;
    }
}