// src/utils/errors/errorTypes.ts

// Mirrors every HTTP status code the backend can return via ApiError
export const HttpStatus = {
    BAD_REQUEST:          400,
    UNAUTHORIZED:         401,
    FORBIDDEN:            403,
    NOT_FOUND:            404,
    CONFLICT:             409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS:    429,
    INTERNAL_SERVER:      500,
} as const;

export type HttpStatus = typeof HttpStatus[keyof typeof HttpStatus];

// Frontend error categories — map multiple HTTP codes to one semantic bucket
export const ErrorType = {
    NETWORK:    'NETWORK',    // No response at all
    AUTH:       'AUTH',       // 401, 403
    VALIDATION: 'VALIDATION', // 400, 422
    NOT_FOUND:  'NOT_FOUND',  // 404
    CONFLICT:   'CONFLICT',   // 409
    RATE_LIMIT: 'RATE_LIMIT', // 429
    SERVER:     'SERVER',     // 500+
    UNKNOWN:    'UNKNOWN',    // Anything else
} as const;

export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

// Shape of the error body returned by ApiResponseUtil.error()
export interface BackendErrorBody {
    success: false;
    message: string;
    error?: string; // Stack trace in development
}

// Frontend app error — wraps every error that leaves the errorHandler
export class AppError extends Error {
    readonly type: ErrorType;
    readonly statusCode: number;
    readonly timestamp: string;

    constructor(message: string, type: ErrorType, statusCode: number) {
        super(message);
        this.name = 'AppError';
        this.type = type;
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString();
    }
}