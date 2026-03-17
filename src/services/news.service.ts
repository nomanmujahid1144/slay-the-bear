// src/services/news.service.ts

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types';
import type { NewsResponse } from '@/types/news';

export const newsService = {
  /**
   * Get latest news (all topics)
   */
  getLatestNews: () =>
    axiosInstance.get<ApiResponse<NewsResponse>>(
      API_CONFIG.ENDPOINTS.NEWS.LATEST
    ),

  /**
   * Get stock market news
   */
  getStocksNews: () =>
    axiosInstance.get<ApiResponse<NewsResponse>>(
      API_CONFIG.ENDPOINTS.NEWS.STOCKS
    ),

  /**
   * Get cryptocurrency news
   */
  getCryptoNews: () =>
    axiosInstance.get<ApiResponse<NewsResponse>>(
      API_CONFIG.ENDPOINTS.NEWS.CRYPTO
    ),

  /**
   * Get forex news
   */
  getForexNews: () =>
    axiosInstance.get<ApiResponse<NewsResponse>>(
      API_CONFIG.ENDPOINTS.NEWS.FOREX
    ),

  /**
   * Get ETF news
   */
  getETFsNews: () =>
    axiosInstance.get<ApiResponse<NewsResponse>>(
      API_CONFIG.ENDPOINTS.NEWS.ETFS
    ),

  /**
   * Get mutual funds news
   */
  getMutualFundsNews: () =>
    axiosInstance.get<ApiResponse<NewsResponse>>(
      API_CONFIG.ENDPOINTS.NEWS.MUTUAL_FUNDS
    ),
};