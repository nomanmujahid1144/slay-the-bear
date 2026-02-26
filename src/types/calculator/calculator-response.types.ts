// src/types/calculator/calculator-response.types.ts
// Mirrors exact return shapes from backend services/calculator.service.ts

import type { BudgetExpense, CDFrequency } from './calculator-request.types';

// ── Shared ────────────────────────────────────────────────────────────────────

export interface CalcBase {
    message: string;
}

// ── Bond Price ────────────────────────────────────────────────────────────────

export interface BondPriceResult extends CalcBase {
    bondPrice: number;
    breakdown: {
        presentValueOfCoupons: number;
        presentValueOfFaceValue: number;
        totalBondPrice: number;
    };
    inputs: {
        couponPayment: number;
        yieldRate: number;
        yearsToMaturity: number;
        faceValue: number;
    };
}

// ── Bond YTM ─────────────────────────────────────────────────────────────────

export interface BondYTMResult extends CalcBase {
    ytm: number;
    breakdown: {
        couponPayment: number;
        capitalGainPerPeriod: number;
        averagePrice: number;
        ytmPercentage: number;
    };
    inputs: {
        bondPrice: number;
        faceValue: number;
        couponRate: number;
        periodsToMaturity: number;
    };
}

// ── Break Even ────────────────────────────────────────────────────────────────

export interface BreakEvenResult extends CalcBase {
    breakEvenUnits: number;
    breakdown: {
        contributionMarginPerUnit: number;
        breakEvenRevenue: number;
        totalFixedCosts: number;
        totalVariableCosts: number;
        totalCosts: number;
    };
    inputs: {
        fixedCosts: number;
        variableCostPerUnit: number;
        sellingPricePerUnit: number;
    };
}

// ── Budget ────────────────────────────────────────────────────────────────────

export interface BudgetResult extends CalcBase {
    remainingBudget: number;
    breakdown: {
        totalIncome: number;
        totalExpenses: number;
        percentageSpent: number;
        percentageRemaining: number;
        expensesByCategory: Record<string, number>;
    };
    inputs: {
        income: number;
        expenses: BudgetExpense[];
    };
}

// ── CD ────────────────────────────────────────────────────────────────────────

export interface CDResult extends CalcBase {
    futureValue: number;
    breakdown: {
        principalAmount: number;            // was: principal
        totalInterestEarned: number;
        effectiveRate: number;              // was: monthlyInterestRate
        compoundingPeriodsPerYear: number;  // new field from backend
        totalCompoundingPeriods: number;    // was: termMonths
    };
    inputs: {
        principal: number;
        annualInterestRate: number;
        timePeriod: number;
        compoundingFrequency: CDFrequency;
    };
}

// ── Compound Interest ─────────────────────────────────────────────────────────

export interface CompoundInterestResult extends CalcBase {
    futureValue: number;
    breakdown: {
        principalAmount: number;
        totalInterestEarned: number;
        effectiveAnnualRate: number;
        totalCompoundingPeriods: number;
    };
    inputs: {
        principal: number;
        interestRate: number;
        compoundingFrequency: number;
        timePeriod: number;
    };
}

// ── Credit Payoff ─────────────────────────────────────────────────────────────

export interface CreditPayoffResult extends CalcBase {
    monthsToPayoff: number;
    totalInterest: number;
    breakdown: {
        originalBalance: number;
        monthlyPayment: number;
        totalAmountPaid: number;
        totalInterestPaid: number;
        monthlyInterestRate: number;
    };
    inputs: {
        balance: number;
        interestRate: number;
        monthlyPayment: number;
    };
}

// ── Currency Converter ────────────────────────────────────────────────────────

export interface CurrencyConverterResult extends CalcBase {
    convertedAmount: number;
    exchangeRate: number;
    breakdown: {
        originalAmount: number;
        fromCurrency: string;
        toCurrency: string;
        rate: number;
    };
    inputs: {
        amount: number;
        fromCurrency: string;
        toCurrency: string;
    };
}

// ── Debt to Income ────────────────────────────────────────────────────────────

export interface DebtToIncomeResult extends CalcBase {
    dtir: number;
    assessment: string;
    breakdown: {
        totalMonthlyDebt: number;
        grossMonthlyIncome: number;
        remainingIncome: number;
        debtPercentage: number;
    };
    inputs: {
        debtPayments: number;
        monthlyIncome: number;
    };
}

// ── Dividend ──────────────────────────────────────────────────────────────────

export interface DividendResult extends CalcBase {
    totalDividendIncome: number;
    breakdown: {
        numberOfShares: number;
        annualDividendPerShare: number;
        annualIncome: number;
        timePeriodYears: number;
        totalIncome: number;
    };
    inputs: {
        numShares: number;
        annualDividend: number;
        timePeriod: number;
    };
}

// ── Investment Return ─────────────────────────────────────────────────────────

export interface InvestmentReturnResult extends CalcBase {
    futureValue: number;
    breakdown: {
        initialInvestment: number;
        totalReturn: number;
        returnPercentage: number;
        annualReturnRate: number;
        investmentPeriod: number;
    };
    inputs: {
        initialInvestment: number;
        annualReturnRate: number;
        investmentYears: number;
    };
}

// ── Loan Amortization ─────────────────────────────────────────────────────────

export interface LoanAmortizationScheduleEntry {
    month: number;
    principalPayment: number;
    interestPayment: number;
    balance: number;
}

export interface LoanAmortizationResult extends CalcBase {
    amortizationSchedule: LoanAmortizationScheduleEntry[];
    summary: {
        totalPayments: number;
        baseMonthlyPayment: number;
        totalMonthlyPayment: number;
        totalInterestPaid: number;
        totalPrincipalPaid: number;
        totalAmountPaid: number;
    };
    inputs: {
        principal: number;
        annualInterestRate: number;
        loanTerm: number;
        loanTermType: 'years' | 'months';
        extraPayment: number;
    };
}

// ── Modified Duration ─────────────────────────────────────────────────────────

export interface ModifiedDurationResult extends CalcBase {
    modifiedDuration: number;
    breakdown: {
        macaulayDuration: number;
        bondPrice: number;
        faceValue: number;
        periodsPerYear: number;
    };
    inputs: {
        bondPrice: number;
        faceValue: number;
        couponRate: number;
        yieldRate: number;
        periodsPerYear: number;
    };
}

// ── Mortgage ──────────────────────────────────────────────────────────────────

export interface MortgageResult extends CalcBase {
    monthlyPayment: number;
    breakdown: {
        loanAmount: number;
        totalPayments: number;
        totalAmountPaid: number;
        totalInterest: number;
        monthlyInterestRate: number;
    };
    inputs: {
        loanAmount: number;
        interestRate: number;
        loanTerm: number;
        paymentType: 'years' | 'months';
    };
}

// ── Net Worth ─────────────────────────────────────────────────────────────────

export interface NetWorthResult extends CalcBase {
    netWorth: number;
    status: string;
    breakdown: {
        totalAssets: number;
        totalLiabilities: number;
        difference: number;
    };
    inputs: {
        assets: number;
        liabilities: number;
    };
}

// ── Retirement ────────────────────────────────────────────────────────────────

export interface RetirementResult extends CalcBase {
    futureValue: number;
    breakdown: {
        yearsToRetirement: number;
        futureValueOfContributions: number;
        futureValueOfCurrentSavings: number;
        totalFutureValue: number;
    };
    inputs: {
        currentAge: number;
        retirementAge: number;
        currentSavings: number;
        annualContributions: number;
        expectedRateOfReturn: number;
    };
}

// ── Rule of 72 ────────────────────────────────────────────────────────────────

export interface RuleOf72Result extends CalcBase {
    yearsToDouble: number;
    breakdown: {
        annualRate: number;
        formula: string;
        yearsToDouble: number;
    };
    inputs: {
        annualRate: number;
    };
}

// ── Savings Goal ──────────────────────────────────────────────────────────────

export interface SavingsGoalResult extends CalcBase {
    requiredSavings: number;
    breakdown: {
        savingsGoal: number;
        currentSavings: number;
        remainingGoal: number;
        timeFrameYears: number;
        totalMonths: number;
        monthlyContribution: number;
    };
    inputs: {
        savingsGoal: number;
        currentSavings: number;
        timeFrame: number;
    };
}






// ── Premium: Stock Analyzer ───────────────────────────────────────────────────

export interface StockAnalyzerResult extends CalcBase {
    companyName: string;
    symbol: string;
    intrinsicStockValue: string;
    currentStockPrice: string;
    stockTrend: string;
    valuationStatus: string;
    explanation: string;
    disclaimer: string;
}

// ── Premium: Portfolio Optimizer ──────────────────────────────────────────────

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

export interface PortfolioOptimizerResult extends CalcBase {
    portfolio: PortfolioAllocation[];
    metrics: PortfolioMetrics;
    inputs: {
        investmentAmount: number;
        riskFreeRate: number;
        targetReturn: number;
    };
}

export interface CalculatorHistory<
    TInput = Record<string, unknown>,
    TResult = Record<string, unknown>
> {
    id: string;
    calculatorType: string;
    inputData: TInput;
    resultData: TResult;
    createdAt: string;
}