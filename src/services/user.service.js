// src/services/user.service.js - CREATE

import axiosInstance from '@/app/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const userService = {
  getProfile: () => 
    axiosInstance.get(API_CONFIG.ENDPOINTS.USERS.PROFILE),
  
  updateProfile: (data) => 
    axiosInstance.put(API_CONFIG.ENDPOINTS.USERS.PROFILE, data),
  
  getSubscription: () => 
    axiosInstance.get(API_CONFIG.ENDPOINTS.USERS.SUBSCRIPTION),
  
  getBilling: () => 
    axiosInstance.get(API_CONFIG.ENDPOINTS.USERS.BILLING),
};