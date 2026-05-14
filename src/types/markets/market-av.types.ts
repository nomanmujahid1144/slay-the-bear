// src/types/markets/market-av.types.ts

/**
 * Alpha Vantage Market Types — Frontend
 * Used by market-av.service.ts for Crypto, Forex, Mutual Funds, Top Gainers/Losers
 */

// ── Crypto ─────────────────────────────────────────────────────────────────

export interface CryptoQuote {
  symbol: string;               // e.g. 'BTC'
  name: string;                 // e.g. 'Bitcoin'
  market: string;               // e.g. 'USD'
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  last_refreshed: string;
  change: number;
  change_percentage: number;
}

export interface CryptoIntradayData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CryptoHistoryDay {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// ── Forex ──────────────────────────────────────────────────────────────────

export interface ForexQuote {
  from_currency: string;        // e.g. 'EUR'
  from_name: string;            // e.g. 'Euro'
  to_currency: string;          // e.g. 'USD'
  to_name: string;              // e.g. 'United States Dollar'
  rate: number;
  bid: number;
  ask: number;
  last_refreshed: string;
}

export interface ForexIntradayData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ForexHistoryDay {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

// ── Mutual Funds ───────────────────────────────────────────────────────────

export interface MutualFundQuote {
  symbol: string;               // e.g. 'VFIAX'
  name: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  last_refreshed: string;
  change: number;
  change_percentage: number;
}

export interface MutualFundHistoryDay {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// ── Top Gainers / Losers / Most Active ────────────────────────────────────

export interface TopMover {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export interface TopGainersLosers {
  top_gainers: TopMover[];
  top_losers: TopMover[];
  most_actively_traded: TopMover[];
  last_updated: string;
}

// ── Market Status ──────────────────────────────────────────────────────────

export interface MarketStatusItem {
  market_type: string;
  region: string;
  primary_exchanges: string;
  local_open: string;
  local_close: string;
  current_status: string;       // 'open' | 'closed'
  notes: string;
}

export interface MarketStatus {
  markets: MarketStatusItem[];
}