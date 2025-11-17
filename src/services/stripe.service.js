// src/services/stripe.service.js - CREATE

import axiosInstance from '@/app/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const stripeService = {
  createCheckout: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.STRIPE.CREATE_CHECKOUT, data),
  
  getSessionDetails: (sessionId) => 
    axiosInstance.get(`${API_CONFIG.ENDPOINTS.STRIPE.SESSION_DETAILS}/${sessionId}`),
  
  cancelSubscription: () => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.STRIPE.CANCEL_SUBSCRIPTION),
  
  reactivateSubscription: () => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.STRIPE.REACTIVATE_SUBSCRIPTION),
  
  getCustomerPortal: () => 
    axiosInstance.get(API_CONFIG.ENDPOINTS.STRIPE.CUSTOMER_PORTAL),
};