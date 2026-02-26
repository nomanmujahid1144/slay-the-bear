// src/utils/axiosInstance.ts

import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { errorHandler } from '@/utils/errors/errorHandler';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// Public endpoints — 401 on these should NEVER trigger a redirect
const PUBLIC_ENDPOINTS = [
    API_CONFIG.ENDPOINTS.USERS.PROFILE,      // called by initialize() on public pages
    API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    API_CONFIG.ENDPOINTS.AUTH.SIGNUP,
];

const isPublicEndpoint = (url?: string): boolean => {
    if (!url) return false;
    return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

const axiosInstance = axios.create({
    baseURL:         API_CONFIG.BASE_URL,
    timeout:         API_CONFIG.TIMEOUT,
    headers:         { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(errorHandler.handle(error))
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryAxiosRequestConfig;

        // Handle 401 — attempt token refresh once
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(
                    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN}`,
                    {},
                    { withCredentials: true }
                );
                return axiosInstance(originalRequest);
            } catch {
                // Only redirect to login if this was a protected endpoint request.
                // Public pages call getProfile() to check auth state — a 401 there
                // just means the user is logged out, which is fine on public routes.
                if (typeof window !== 'undefined' && !isPublicEndpoint(originalRequest.url)) {
                    window.location.href = '/login';
                }
                return Promise.reject(errorHandler.handle(error));
            }
        }

        return Promise.reject(errorHandler.handle(error));
    }
);

export default axiosInstance;