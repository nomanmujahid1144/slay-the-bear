// src/services/market.service.ts

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types';
import type { Quote, HistoryData, TimeSalesData, Security } from '@/types/markets';

// Re-export types for convenience (optional but nice to have)
export type { Quote, HistoryData, TimeSalesData, Security };

// ── Market Service ────────────────────────────────────────────────────────────

export const marketService = {
    // GET /api/markets/quotes?symbols=AAPL,TSLA,SPY
    getQuotes: (symbols: string[]) =>
        axiosInstance.get<ApiResponse<Quote[]>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.QUOTES}?symbols=${symbols.join(',')}`
        ),

    // GET /api/markets/history?symbol=AAPL&interval=daily
    getHistory: (symbol: string, interval: 'daily' | 'weekly' | 'monthly' = 'daily', start?: string, end?: string) => {
        let url = `${API_CONFIG.ENDPOINTS.MARKETS.HISTORY}?symbol=${symbol}&interval=${interval}`;
        if (start) url += `&start=${start}`;
        if (end) url += `&end=${end}`;
        return axiosInstance.get<ApiResponse<HistoryData[]>>(url);
    },

    // GET /api/markets/timesales?symbol=AAPL&interval=5min
    getTimeSales: (symbol: string, interval: '1min' | '5min' | '15min' = '5min', start?: string, end?: string) => {
        let url = `${API_CONFIG.ENDPOINTS.MARKETS.TIMESALES}?symbol=${symbol}&interval=${interval}`;
        if (start) url += `&start=${start}`;
        if (end) url += `&end=${end}`;
        return axiosInstance.get<ApiResponse<TimeSalesData[]>>(url);
    },

    // GET /api/markets/search?q=Apple
    searchSymbols: (query: string, indexes: boolean = false) =>
        axiosInstance.get<ApiResponse<Security[]>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.SEARCH}?q=${query}&indexes=${indexes}`
        ),
};