// src/utils/errors/errorHandler.js

import { AppError, ErrorTypes } from './errorTypes';
import toast from 'react-hot-toast';

class ErrorHandler {
  
  // Log errors (send to monitoring service in production)
  logError(error) {
    if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
      console.error('🔴 Error:', {
        message: error.message,
        type: error.type,
        statusCode: error.statusCode,
        details: error.details,
        timestamp: error.timestamp,
        stack: error.stack,
      });
    }
    
    // TODO: Send to monitoring service (Sentry, LogRocket, etc.)
    // Sentry.captureException(error);
  }

  // Handle different error types
  handle(error) {
    this.logError(error);

    // Network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return new AppError(
        'Network connection failed',
        ErrorTypes.NETWORK_ERROR,
        0
      );
    }

    const { status, data } = error.response;

    // Authentication errors
    if (status === 401) {
      // Don't show toast for refresh token attempts
      if (!error.config?.url?.includes('/refresh-token')) {
        toast.error('Session expired. Please login again.');
      }
      return new AppError(
        data?.message || 'Authentication failed',
        ErrorTypes.AUTH_ERROR,
        401
      );
    }

    // Validation errors
    if (status === 400) {
      const message = data?.message || 'Invalid input';
      toast.error(message);
      return new AppError(
        message,
        ErrorTypes.VALIDATION_ERROR,
        400,
        data?.errors
      );
    }

    // Forbidden
    if (status === 403) {
      toast.error('You do not have permission to perform this action.');
      return new AppError(
        'Access forbidden',
        ErrorTypes.AUTH_ERROR,
        403
      );
    }

    // Not found
    if (status === 404) {
      toast.error('Resource not found.');
      return new AppError(
        data?.message || 'Resource not found',
        ErrorTypes.BUSINESS_ERROR,
        404
      );
    }

    // Server errors
    if (status >= 500) {
      toast.error('Server error. Please try again later.');
      return new AppError(
        'Internal server error',
        ErrorTypes.SERVER_ERROR,
        status
      );
    }

    // Other errors
    toast.error(data?.message || 'Something went wrong.');
    return new AppError(
      data?.message || 'Unknown error',
      ErrorTypes.BUSINESS_ERROR,
      status
    );
  }

  // User-friendly messages
  getUserMessage(error) {
    const messages = {
      [ErrorTypes.NETWORK_ERROR]: 'Please check your internet connection.',
      [ErrorTypes.AUTH_ERROR]: 'Please login again to continue.',
      [ErrorTypes.VALIDATION_ERROR]: 'Please check your input and try again.',
      [ErrorTypes.SERVER_ERROR]: 'Our servers are experiencing issues. Please try again later.',
      [ErrorTypes.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
    };

    return messages[error.type] || 'Something went wrong. Please try again.';
  }
}

export const errorHandler = new ErrorHandler();