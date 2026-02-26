// src/types/calculator.types.ts

// ── History ───────────────────────────────────────────────
export type CalculatorType =
  | 'stock-analyzer'
  | 'portfolio-optimizer'
  | 'bond-price'
  | 'bond-ytm'
  | 'break-even'
  | 'budget'
  | 'cd'
  | 'compound-interest'
  | 'credit-payoff'
  | 'currency-converter'
  | 'debt-to-income'
  | 'dividend'
  | 'investment-return'
  | 'loan-amortization'
  | 'modified-duration'
  | 'mortgage'
  | 'net-worth'
  | 'retirement'
  | 'rule-of-72'
  | 'savings-goal';

export interface CalculatorHistory<TInput = unknown, TResult = unknown> {
  id: string;
  calculatorType: CalculatorType;
  inputData: TInput;
  resultData: TResult;
  createdAt: string;
}

// ── Portfolio Optimizer ───────────────────────────────────
export interface PortfolioSymbol {
  symbol: string;
  name?: string;
}

export interface PortfolioOptimizerRequest {
  investmentAmount: number;
  riskFreeRate: number;
  targetReturn: number;
  symbols: PortfolioSymbol[];
}

export interface PortfolioAllocation {
  symbol: string;
  weight: number;
  allocation: number;
}

export interface PortfolioMetrics {
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
  valueAtRisk: number;
  potentialLoss: number;
}

export interface PortfolioOptimizerResult {
  portfolio: PortfolioAllocation[];
  metrics: PortfolioMetrics;
  inputs: {
    investmentAmount: number;
    riskFreeRate: number;
    targetReturn: number;
  };
}

// ── Stock Analyzer ────────────────────────────────────────
export interface StockAnalyzerRequest {
    symbol: string;
    term: 'Short Term' | 'Long Term';
}

export interface StockAnalyzerResult {
    companyName: string;
    symbol: string;
    intrinsicStockValue: string;
    currentStockPrice: string;
    stockTrend: string;
    valuationStatus: string;
    explanation: string;
    disclaimer: string;
}