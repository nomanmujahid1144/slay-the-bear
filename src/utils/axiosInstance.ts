// src/utils/axiosInstance.ts
// Add silentOn404 support to skip toasting for expected 404s

import axios, { type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/config/api.config';
import { errorHandler } from '@/utils/errors/errorHandler';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    silentOn404?: boolean;   // ← new: skip toast when 404 is expected
}

const PUBLIC_ENDPOINTS = [
    API_CONFIG.ENDPOINTS.USERS.PROFILE,
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

axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(errorHandler.handle(error))
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryAxiosRequestConfig;

        // If caller marked this as silentOn404 and it's a 404 — reject silently
        if (originalRequest?.silentOn404 && error.response?.status === 404) {
            return Promise.reject(error);
        }

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