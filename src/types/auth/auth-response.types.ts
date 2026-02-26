// src/types/auth/auth-response.types.ts

import { UserProfile } from '@/types/user/user.types';

// POST /api/auth/signup → { success, message }
export interface SignupResponse {
    message: string;
}

// POST /api/auth/login → { success, message, data: { user } }
export interface LoginResponse {
    user: UserProfile;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

// POST /api/auth/verify-email → { success, message }
export interface VerifyEmailResponse {
    message: string;
}

// POST /api/auth/forgot-password → { success, message }
export interface ForgotPasswordResponse {
    message: string;
}

// POST /api/auth/verify-reset-token → { success, message, data: { user: { id } } }
export interface VerifyResetTokenResponse {
    user: {
        id: string;
    };
}

// POST /api/auth/change-password → { success, message }
export interface ChangePasswordResponse {
    message: string;
}