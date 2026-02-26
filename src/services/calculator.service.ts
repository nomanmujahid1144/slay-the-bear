// src/services/calculator.service.ts

import axiosInstance from '@/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';
import type { ApiResponse } from '@/types/api';
import type {
    // Requests
    BondPriceRequest, BondYTMRequest, BreakEvenRequest, BudgetRequest,
    CDRequest, CompoundInterestRequest, CreditPayoffRequest, CurrencyConverterRequest,
    DebtToIncomeRequest, DividendRequest, InvestmentReturnRequest, LoanAmortizationRequest,
    ModifiedDurationRequest, MortgageRequest, NetWorthRequest, RetirementRequest,
    RuleOf72Request, SavingsGoalRequest, StockAnalyzerRequest, PortfolioOptimizerRequest,
    // Responses
    BondPriceResult, BondYTMResult, BreakEvenResult, BudgetResult,
    CDResult, CompoundInterestResult, CreditPayoffResult, CurrencyConverterResult,
    DebtToIncomeResult, DividendResult, InvestmentReturnResult, LoanAmortizationResult,
    ModifiedDurationResult, MortgageResult, NetWorthResult, RetirementResult,
    RuleOf72Result, SavingsGoalResult, StockAnalyzerResult, PortfolioOptimizerResult,
} from '@/types/calculator';
import { CalculatorHistory } from '@/types/calculator.types';

const C = API_CONFIG.ENDPOINTS.CALCULATORS;

export const calculatorService = {

    // ── Free Calculators ──────────────────────────────────────────────────────

    bondPrice: (data: BondPriceRequest) =>
        axiosInstance.post<ApiResponse<BondPriceResult>>(C.BOND_PRICE, data),

    bondYTM: (data: BondYTMRequest) =>
        axiosInstance.post<ApiResponse<BondYTMResult>>(C.BOND_YTM, data),

    breakEven: (data: BreakEvenRequest) =>
        axiosInstance.post<ApiResponse<BreakEvenResult>>(C.BREAK_EVEN, data),

    budget: (data: BudgetRequest) =>
        axiosInstance.post<ApiResponse<BudgetResult>>(C.BUDGET, data),

    cd: (data: CDRequest) =>
        axiosInstance.post<ApiResponse<CDResult>>(C.CD, data),

    compoundInterest: (data: CompoundInterestRequest) =>
        axiosInstance.post<ApiResponse<CompoundInterestResult>>(C.COMPOUND_INTEREST, data),

    creditPayoff: (data: CreditPayoffRequest) =>
        axiosInstance.post<ApiResponse<CreditPayoffResult>>(C.CREDIT_PAYOFF, data),

    currencyConverter: (data: CurrencyConverterRequest) =>
        axiosInstance.post<ApiResponse<CurrencyConverterResult>>(C.CURRENCY_CONVERTER, data),

    debtToIncome: (data: DebtToIncomeRequest) =>
        axiosInstance.post<ApiResponse<DebtToIncomeResult>>(C.DEBT_TO_INCOME, data),

    dividend: (data: DividendRequest) =>
        axiosInstance.post<ApiResponse<DividendResult>>(C.DIVIDEND, data),

    investmentReturn: (data: InvestmentReturnRequest) =>
        axiosInstance.post<ApiResponse<InvestmentReturnResult>>(C.INVESTMENT_RETURN, data),

    loanAmortization: (data: LoanAmortizationRequest) =>
        axiosInstance.post<ApiResponse<LoanAmortizationResult>>(C.LOAN_AMORTIZATION, data),

    modifiedDuration: (data: ModifiedDurationRequest) =>
        axiosInstance.post<ApiResponse<ModifiedDurationResult>>(C.MODIFIED_DURATION, data),

    mortgage: (data: MortgageRequest) =>
        axiosInstance.post<ApiResponse<MortgageResult>>(C.MORTGAGE, data),

    netWorth: (data: NetWorthRequest) =>
        axiosInstance.post<ApiResponse<NetWorthResult>>(C.NET_WORTH, data),

    retirement: (data: RetirementRequest) =>
        axiosInstance.post<ApiResponse<RetirementResult>>(C.RETIREMENT, data),

    ruleOf72: (data: RuleOf72Request) =>
        axiosInstance.post<ApiResponse<RuleOf72Result>>(C.RULE_OF_72, data),

    savingsGoal: (data: SavingsGoalRequest) =>
        axiosInstance.post<ApiResponse<SavingsGoalResult>>(C.SAVINGS_GOAL, data),

    // ── Premium Calculators ───────────────────────────────────────────────────

    stockAnalyzer: (data: StockAnalyzerRequest) =>
        axiosInstance.post<ApiResponse<StockAnalyzerResult>>(C.STOCK_ANALYZER, data),

    portfolioOptimizer: (data: PortfolioOptimizerRequest) =>
        axiosInstance.post<ApiResponse<PortfolioOptimizerResult>>(C.PORTFOLIO_OPTIMIZER, data),

    // ── History (Premium calculators only) ───────────────────────────────────────

    getHistory: (type: 'stock-analyzer' | 'portfolio-optimizer') =>
        axiosInstance.get<ApiResponse<CalculatorHistory[]>>(
            `${C.HISTORY}?type=${type}`
        ),

    deleteHistory: (historyId: string) =>
        axiosInstance.delete<ApiResponse<void>>(
            `${C.HISTORY}/${historyId}`
        ),
};

// Re-export result types for use in calculator pages
export type {
    BondPriceResult, BondYTMResult, BreakEvenResult, BudgetResult,
    CDResult, CompoundInterestResult, CreditPayoffResult, CurrencyConverterResult,
    DebtToIncomeResult, DividendResult, InvestmentReturnResult, LoanAmortizationResult,
    ModifiedDurationResult, MortgageResult, NetWorthResult, RetirementResult,
    RuleOf72Result, SavingsGoalResult, StockAnalyzerResult, PortfolioOptimizerResult,
};