// src/types/auth/auth-request.types.ts

// POST /api/auth/signup
export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referralCode?: string;
}

// POST /api/auth/login
export interface LoginRequest {
    email: string;
    password: string;
}

// POST /api/auth/verify-email
export interface VerifyEmailRequest {
    token: string;
}

// POST /api/auth/forgot-password
export interface ForgotPasswordRequest {
    email: string;
}

// POST /api/auth/verify-reset-token
export interface VerifyResetTokenRequest {
    token: string;
}

// POST /api/auth/change-password
export interface ChangePasswordRequest {
    userId: string;
    password: string;
}