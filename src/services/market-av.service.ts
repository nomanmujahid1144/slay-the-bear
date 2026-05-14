// src/services/market-av.service.ts

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types';
import type {
    CryptoQuote,
    CryptoIntradayData,
    CryptoHistoryDay,
    ForexQuote,
    ForexIntradayData,
    ForexHistoryDay,
    MutualFundQuote,
    MutualFundHistoryDay,
    TopGainersLosers,
    MarketStatus,
} from '@/types/markets';

// Re-export types for convenience
export type {
    CryptoQuote,
    CryptoIntradayData,
    CryptoHistoryDay,
    ForexQuote,
    ForexIntradayData,
    ForexHistoryDay,
    MutualFundQuote,
    MutualFundHistoryDay,
    TopGainersLosers,
    MarketStatus,
};

// ── Market AV Service ─────────────────────────────────────────────────────────
// Handles Alpha Vantage API calls for Crypto, Forex, and Mutual Funds
// Companion to market.service.ts which handles Stocks and ETFs via Tradier

export const marketAvService = {

    // ── Crypto ────────────────────────────────────────────────────────────────

    // GET /api/markets/crypto/quote?symbol=BTC&market=USD
    getCryptoQuote: (symbol: string, market: string = 'USD') =>
        axiosInstance.get<ApiResponse<CryptoQuote>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.CRYPTO_QUOTE}?symbol=${symbol}&market=${market}`
        ),

    // GET /api/markets/crypto/intraday?symbol=ETH&market=USD&interval=5min
    getCryptoIntraday: (
        symbol: string,
        market: string = 'USD',
        interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min',
        outputsize: 'compact' | 'full' = 'compact'
    ) =>
        axiosInstance.get<ApiResponse<CryptoIntradayData[]>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.CRYPTO_INTRADAY}?symbol=${symbol}&market=${market}&interval=${interval}&outputsize=${outputsize}`
        ),

    // GET /api/markets/crypto/history?symbol=BTC&market=USD&interval=daily
    getCryptoHistory: (
        symbol: string,
        market: string = 'USD',
        interval: 'daily' | 'weekly' | 'monthly' = 'daily'
    ) =>
        axiosInstance.get<ApiResponse<CryptoHistoryDay[]>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.CRYPTO_HISTORY}?symbol=${symbol}&market=${market}&interval=${interval}`
        ),

    // ── Forex ─────────────────────────────────────────────────────────────────

    // GET /api/markets/forex/rate?from_currency=EUR&to_currency=USD
    getForexRate: (from_currency: string, to_currency: string = 'USD') =>
        axiosInstance.get<ApiResponse<ForexQuote>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.FOREX_RATE}?from_currency=${from_currency}&to_currency=${to_currency}`
        ),

    // GET /api/markets/forex/intraday?from_currency=EUR&to_currency=USD&interval=5min
    getForexIntraday: (
        from_currency: string,
        to_currency: string = 'USD',
        interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min',
        outputsize: 'compact' | 'full' = 'compact'
    ) =>
        axiosInstance.get<ApiResponse<ForexIntradayData[]>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.FOREX_INTRADAY}?from_currency=${from_currency}&to_currency=${to_currency}&interval=${interval}&outputsize=${outputsize}`
        ),

    // GET /api/markets/forex/history?from_currency=EUR&to_currency=USD&interval=daily
    getForexHistory: (
        from_currency: string,
        to_currency: string = 'USD',
        interval: 'daily' | 'weekly' | 'monthly' = 'daily'
    ) =>
        axiosInstance.get<ApiResponse<ForexHistoryDay[]>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.FOREX_HISTORY}?from_currency=${from_currency}&to_currency=${to_currency}&interval=${interval}`
        ),

    // ── Mutual Funds ──────────────────────────────────────────────────────────

    // GET /api/markets/mutual-fund/quote?symbol=VFIAX
    getMutualFundQuote: (symbol: string) =>
        axiosInstance.get<ApiResponse<MutualFundQuote>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.MUTUAL_FUND_QUOTE}?symbol=${symbol}`
        ),

    // GET /api/markets/mutual-fund/history?symbol=VFIAX&interval=daily
    getMutualFundHistory: (
        symbol: string,
        interval: 'daily' | 'weekly' | 'monthly' = 'daily'
    ) =>
        axiosInstance.get<ApiResponse<MutualFundHistoryDay[]>>(
            `${API_CONFIG.ENDPOINTS.MARKETS.MUTUAL_FUND_HISTORY}?symbol=${symbol}&interval=${interval}`
        ),

    // ── Market Intelligence ───────────────────────────────────────────────────

    // GET /api/markets/top-gainers-losers
    getTopGainersLosers: () =>
        axiosInstance.get<ApiResponse<TopGainersLosers>>(
            API_CONFIG.ENDPOINTS.MARKETS.TOP_GAINERS_LOSERS
        ),

    // GET /api/markets/market-status
    getMarketStatus: () =>
        axiosInstance.get<ApiResponse<MarketStatus>>(
            API_CONFIG.ENDPOINTS.MARKETS.MARKET_STATUS
        ),
};