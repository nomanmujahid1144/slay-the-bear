// src/services/user.service.ts
// getSubscription uses silentOn404 — free users have no subscription, that's fine

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types';
import type {
    UserProfile,
    UserSubscription,
    UserBillingEntry,
    UpdateProfileRequest,
} from '@/types/user';

export const userService = {
    getProfile: () =>
        axiosInstance.get<ApiResponse<UserProfile>>(
            API_CONFIG.ENDPOINTS.USERS.PROFILE
        ),

    updateProfile: (data: UpdateProfileRequest) =>
        axiosInstance.put<ApiResponse<void>>(
            API_CONFIG.ENDPOINTS.USERS.PROFILE,
            data
        ),

    getSubscription: () =>
        axiosInstance.get<ApiResponse<UserSubscription>>(
            API_CONFIG.ENDPOINTS.USERS.SUBSCRIPTION,
            { silentOn404: true } as any   // no subscription = expected, don't toast
        ),

    getBilling: () =>
        axiosInstance.get<ApiResponse<UserBillingEntry[]>>(
            API_CONFIG.ENDPOINTS.USERS.BILLING
        ),
};