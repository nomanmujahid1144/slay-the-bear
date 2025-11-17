// src/services/auth.service.js - CREATE

import axiosInstance from '@/app/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const authService = {
  signup: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, data),
  
  login: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, data),
  
  logout: () => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT),
  
  verifyEmail: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL, data),
  
  forgotPassword: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, data),
  
  verifyResetToken: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_RESET_TOKEN, data),
  
  changePassword: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
  
  refreshToken: () => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN),
};