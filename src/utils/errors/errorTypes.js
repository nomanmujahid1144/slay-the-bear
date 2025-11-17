// src/utils/errors/errorTypes.js

export const ErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  BUSINESS_ERROR: 'BUSINESS_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
};

export class AppError extends Error {
  constructor(message, type, statusCode, details = null) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}