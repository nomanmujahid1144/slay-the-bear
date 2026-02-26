// src/utils/errors/errorHandler.ts

import { toast } from '@/utils/toast';
import { AppError, BackendErrorBody, ErrorType, HttpStatus } from './errorTypes';
import type { AxiosError } from 'axios';

// User-facing messages per error type
const USER_MESSAGES: Record<ErrorType, string> = {
    [ErrorType.NETWORK]: 'Network error. Please check your connection.',
    [ErrorType.AUTH]: 'Session expired. Please login again.',
    [ErrorType.VALIDATION]: 'Please check your input and try again.',
    [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
    [ErrorType.CONFLICT]: 'A conflict occurred. Please try again.',
    [ErrorType.RATE_LIMIT]: 'Too many requests. Please slow down.',
    [ErrorType.SERVER]: 'Server error. Please try again later.',
    [ErrorType.UNKNOWN]: 'Something went wrong. Please try again.',
};

// Map HTTP status code → ErrorType
function resolveErrorType(status: number): ErrorType {
    if (status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN) return ErrorType.AUTH;
    if (status === HttpStatus.BAD_REQUEST || status === HttpStatus.UNPROCESSABLE_ENTITY) return ErrorType.VALIDATION;
    if (status === HttpStatus.NOT_FOUND) return ErrorType.NOT_FOUND;
    if (status === HttpStatus.CONFLICT) return ErrorType.CONFLICT;
    if (status === HttpStatus.TOO_MANY_REQUESTS) return ErrorType.RATE_LIMIT;
    if (status >= HttpStatus.INTERNAL_SERVER) return ErrorType.SERVER;
    return ErrorType.UNKNOWN;
}

class ErrorHandler {

    // Dev-only console logging
    private log(error: AppError): void {
        if (process.env.NODE_ENV === 'development') {
            console.warn('🟡 AppError', {
                message: error.message,
                type: error.type,
                statusCode: error.statusCode,
                timestamp: error.timestamp,
            });
        }
    }

    // Core handler — called by axiosInstance interceptor
    handle(error: AxiosError<BackendErrorBody>): AppError {

        // ── No response (network/timeout) ───────────────────────────────
        if (!error.response) {
            const appError = new AppError(
                'Network connection failed',
                ErrorType.NETWORK,
                0
            );
            this.log(appError);
            toast.error(USER_MESSAGES[ErrorType.NETWORK]);
            return appError;
        }

        const { status, data } = error.response;

        // ── Use backend message when available, else fall back ──────────
        // Backend always returns { success: false, message: string }
        const backendMessage = data?.message;
        const errorType = resolveErrorType(status);

        // ── 401: Don't toast during token refresh ───────────────────────
        if (status === HttpStatus.UNAUTHORIZED) {
            const appError = new AppError(
                backendMessage || 'Authentication failed',
                ErrorType.AUTH,
                status
            );
            this.log(appError);
            if (!error.config?.url?.includes('/refresh-token')) {
                toast.error(backendMessage || USER_MESSAGES[ErrorType.AUTH]);
            }
            return appError;
        }

        // ── 403: Show backend message (e.g. "Premium subscription required") ──
        if (status === HttpStatus.FORBIDDEN) {
            const appError = new AppError(
                backendMessage || 'Access forbidden',
                ErrorType.AUTH,
                status
            );
            this.log(appError);
            toast.error(backendMessage || USER_MESSAGES[ErrorType.AUTH]);
            return appError;
        }

        // ── 400 / 422: Always show backend message (Zod validation errors) ──
        if (status === HttpStatus.BAD_REQUEST || status === HttpStatus.UNPROCESSABLE_ENTITY) {
            const message = backendMessage || USER_MESSAGES[ErrorType.VALIDATION];
            const appError = new AppError(message, ErrorType.VALIDATION, status);
            this.log(appError);
            toast.error(message);
            return appError;
        }

        // ── 409: Conflict (e.g. "Email already exists") ─────────────────
        if (status === HttpStatus.CONFLICT) {
            const message = backendMessage || USER_MESSAGES[ErrorType.CONFLICT];
            const appError = new AppError(message, ErrorType.CONFLICT, status);
            this.log(appError);
            toast.error(message);
            return appError;
        }

        // ── 404 ──────────────────────────────────────────────────────────
        if (status === HttpStatus.NOT_FOUND) {
            const message = backendMessage || USER_MESSAGES[ErrorType.NOT_FOUND];
            const appError = new AppError(message, ErrorType.NOT_FOUND, status);
            this.log(appError);
            toast.error(message);
            return appError;
        }

        // ── 429: Rate limit ──────────────────────────────────────────────
        if (status === HttpStatus.TOO_MANY_REQUESTS) {
            const appError = new AppError(
                backendMessage || USER_MESSAGES[ErrorType.RATE_LIMIT],
                ErrorType.RATE_LIMIT,
                status
            );
            this.log(appError);
            toast.error(USER_MESSAGES[ErrorType.RATE_LIMIT]);
            return appError;
        }

        // ── 500+ ─────────────────────────────────────────────────────────
        if (status >= HttpStatus.INTERNAL_SERVER) {
            const appError = new AppError(
                'Internal server error',
                ErrorType.SERVER,
                status
            );
            this.log(appError);
            toast.error(USER_MESSAGES[ErrorType.SERVER]);
            return appError;
        }

        // ── Catch-all ────────────────────────────────────────────────────
        const appError = new AppError(
            backendMessage || 'Unknown error',
            ErrorType.UNKNOWN,
            status
        );
        this.log(appError);
        toast.error(backendMessage || USER_MESSAGES[ErrorType.UNKNOWN]);
        return appError;
    }

    // Utility: get user-facing message by type (usable in components)
    getMessage(type: ErrorType): string {
        return USER_MESSAGES[type];
    }

    // Utility: check if an error is a specific type (usable in components)
    is(error: unknown, type: ErrorType): boolean {
        return error instanceof AppError && error.type === type;
    }

    // Utility: check if error is auth-related (usable in guards)
    isAuthError(error: unknown): boolean {
        return error instanceof AppError && error.type === ErrorType.AUTH;
    }

    // Utility: check if error is a validation error (usable in forms)
    isValidationError(error: unknown): boolean {
        return error instanceof AppError && error.type === ErrorType.VALIDATION;
    }
}

export const errorHandler = new ErrorHandler();