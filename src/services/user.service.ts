// src/services/user.service.ts

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
            API_CONFIG.ENDPOINTS.USERS.SUBSCRIPTION
        ),

    // Backend returns an array of invoice entries, not a single billing object
    getBilling: () =>
        axiosInstance.get<ApiResponse<UserBillingEntry[]>>(
            API_CONFIG.ENDPOINTS.USERS.BILLING
        ),
};