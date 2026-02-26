// src/types/calculator/calculator-request.types.ts
// Mirrors backend validators/calculator.validator.ts exactly

// ── Free Calculators ──────────────────────────────────────────────────────────

export interface BondPriceRequest {
    couponPayment: number;
    yieldRate: number;
    yearsToMaturity: number;
    faceValue: number;
}

export interface BondYTMRequest {
    bondPrice: number;
    faceValue: number;
    couponRate: number;
    periodsToMaturity: number;
}

export interface BreakEvenRequest {
    fixedCosts: number;
    variableCostPerUnit: number;
    sellingPricePerUnit: number;
}

export interface BudgetExpense {
    category: string;
    amount: number;
}

export interface BudgetRequest {
    income: number;
    expenses: BudgetExpense[];
}

export type CDFrequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'daily';

export interface CDRequest {
    principal: number;
    annualInterestRate: number;
    timePeriod: number;
    compoundingFrequency: CDFrequency;
}

export interface CompoundInterestRequest {
    principal: number;
    interestRate: number;
    compoundingFrequency: number;
    timePeriod: number;
}

export interface CreditPayoffRequest {
    balance: number;
    interestRate: number;
    monthlyPayment: number;
}

export interface CurrencyConverterRequest {
    amount: number;
    fromCurrency: string;
    toCurrency: string;
}

export interface DebtToIncomeRequest {
    debtPayments: number;
    monthlyIncome: number;
}

export interface DividendRequest {
    numShares: number;
    annualDividend: number;
    timePeriod: number;
}

export interface InvestmentReturnRequest {
    initialInvestment: number;
    annualReturnRate: number;
    investmentYears: number;
}
export type LoanTermType = 'years' | 'months';

export interface LoanAmortizationRequest {
    principal: number;
    annualInterestRate: number;
    loanTerm: number;
    extraPayment?: number;
    loanTermType: 'years' | 'months';
}

export interface ModifiedDurationRequest {
    bondPrice: number;
    faceValue: number;
    couponRate: number;
    yieldRate: number;
    periodsPerYear: number;
}

export interface MortgageRequest {
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
    paymentType: 'years' | 'months';
}

export interface NetWorthRequest {
    assets: number;
    liabilities: number;
}

export interface RetirementRequest {
    currentAge: number;
    retirementAge: number;
    currentSavings: number;
    annualContributions: number;
    expectedRateOfReturn: number;
}

export interface RuleOf72Request {
    annualRate: number;
}

export interface SavingsGoalRequest {
    savingsGoal: number;
    currentSavings: number;
    timeFrame: number;
}

// ── Premium Calculators ───────────────────────────────────────────────────────

export interface StockAnalyzerRequest {
    symbol: string;
    term: 'Short Term' | 'Long Term';
}

export interface PortfolioOptimizerRequest {
    investmentAmount: number;
    riskFreeRate: number;
    targetReturn: number;
    symbols: Array<{ symbol: string; name?: string }>;
}