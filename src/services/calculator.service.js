// src/services/calculator.service.js - CREATE

import axiosInstance from '@/app/utils/axiosInstance';
import { API_CONFIG } from '@/config/api.config';

export const calculatorService = {
  // Premium Calculators
  stockAnalyzer: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.STOCK_ANALYZER, data),
  
  portfolioOptimizer: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.PORTFOLIO_OPTIMIZER, data),

  // Free Calculators
  bondPrice: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.BOND_PRICE, data),
  
  bondYTM: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.BOND_YTM, data),
  
  breakEven: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.BREAK_EVEN, data),
  
  budget: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.BUDGET, data),
  
  cd: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.CD, data),
  
  compoundInterest: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.COMPOUND_INTEREST, data),
  
  creditPayoff: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.CREDIT_PAYOFF, data),
  
  currencyConverter: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.CURRENCY_CONVERTER, data),
  
  debtToIncome: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.DEBT_TO_INCOME, data),
  
  dividend: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.DIVIDEND, data),
  
  investmentReturn: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.INVESTMENT_RETURN, data),
  
  loanAmortization: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.LOAN_AMORTIZATION, data),
  
  modifiedDuration: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.MODIFIED_DURATION, data),
  
  mortgage: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.MORTGAGE, data),
  
  netWorth: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.NET_WORTH, data),
  
  retirement: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.RETIREMENT, data),
  
  ruleOf72: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.RULE_OF_72, data),
  
  savingsGoal: (data) => 
    axiosInstance.post(API_CONFIG.ENDPOINTS.CALCULATORS.SAVINGS_GOAL, data),
};