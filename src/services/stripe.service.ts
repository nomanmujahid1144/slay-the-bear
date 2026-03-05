// src/services/stripe.service.ts

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types';
import type { CreateCheckoutRequest, CheckoutResponse } from '@/types';

export interface ChangePlanRequest {
    planType: 'basic' | 'premium';
    period:   'monthly' | 'yearly';
}

export interface ChangePlanResponse {
    message:       string;
    changeType:    'upgrade' | 'downgrade';
    effectiveDate: string;
    newPlan:       string;
    newPeriod:     string;
}

export const stripeService = {

    createCheckout: (data: CreateCheckoutRequest) =>
        axiosInstance.post<ApiResponse<CheckoutResponse>>(
            API_CONFIG.ENDPOINTS.STRIPE.CREATE_CHECKOUT,
            data
        ),

    getSessionDetails: (sessionId: string) =>
        axiosInstance.get<ApiResponse<unknown>>(
            `${API_CONFIG.ENDPOINTS.STRIPE.SESSION_DETAILS}/${sessionId}`
        ),

    cancelSubscription: () =>
        axiosInstance.post<ApiResponse<void>>(
            API_CONFIG.ENDPOINTS.STRIPE.CANCEL_SUBSCRIPTION
        ),

    reactivateSubscription: () =>
        axiosInstance.post<ApiResponse<void>>(
            API_CONFIG.ENDPOINTS.STRIPE.REACTIVATE_SUBSCRIPTION
        ),

    changePlan: (data: ChangePlanRequest) =>
        axiosInstance.post<ApiResponse<ChangePlanResponse>>(
            API_CONFIG.ENDPOINTS.STRIPE.CHANGE_PLAN,
            data
        ),
};