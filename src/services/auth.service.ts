// src/services/auth.service.ts

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api/api-response.types';
import type {
    SignupRequest,
    SignupResponse,
    LoginRequest,
    LoginResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    VerifyResetTokenRequest,
    VerifyResetTokenResponse,
    ChangePasswordRequest,
    ChangePasswordResponse,
} from '@/types/auth';

export const authService = {
    // POST /api/auth/signup
    // Response: { success, message }
    signup: (data: SignupRequest) =>
        axiosInstance.post<ApiResponse<SignupResponse>>(
            API_CONFIG.ENDPOINTS.AUTH.SIGNUP,
            data
        ),

    // POST /api/auth/login
    // Response: { success, message, data: { user } }
    login: (data: LoginRequest) =>
        axiosInstance.post<ApiResponse<LoginResponse>>(
            API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            data
        ),

    // POST /api/auth/logout
    // Response: { success, message }
    logout: () =>
        axiosInstance.post<ApiResponse>(
            API_CONFIG.ENDPOINTS.AUTH.LOGOUT
        ),

    // POST /api/auth/verify-email
    // Response: { success, message }
    verifyEmail: (data: VerifyEmailRequest) =>
        axiosInstance.post<ApiResponse<VerifyEmailResponse>>(
            API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL,
            data
        ),

    // POST /api/auth/forgot-password
    // Response: { success, message }
    forgotPassword: (data: ForgotPasswordRequest) =>
        axiosInstance.post<ApiResponse<ForgotPasswordResponse>>(
            API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD,
            data
        ),

    // POST /api/auth/verify-reset-token
    // Response: { success, message, data: { user: { id } } }
    verifyResetToken: (data: VerifyResetTokenRequest) =>
        axiosInstance.post<ApiResponse<VerifyResetTokenResponse>>(
            API_CONFIG.ENDPOINTS.AUTH.VERIFY_RESET_TOKEN,
            data
        ),

    // POST /api/auth/change-password
    // Response: { success, message }
    changePassword: (data: ChangePasswordRequest) =>
        axiosInstance.post<ApiResponse<ChangePasswordResponse>>(
            API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD,
            data
        ),

    // POST /api/auth/refresh-token
    // Response: { success, message }
    refreshToken: () =>
        axiosInstance.post<ApiResponse>(
            API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN
        ),
};