export interface ApiError {
    readonly message: string;
    readonly isApiError: true;
    readonly statusCode?: number;
}
