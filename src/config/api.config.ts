// src/config/api.config.ts

const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  TIMEOUT: 30000,

  ENDPOINTS: {
    AUTH: {
      SIGNUP:             '/api/auth/signup',
      LOGIN:              '/api/auth/login',
      LOGOUT:             '/api/auth/logout',
      VERIFY_EMAIL:       '/api/auth/verify-email',
      FORGOT_PASSWORD:    '/api/auth/forgot-password',
      VERIFY_RESET_TOKEN: '/api/auth/verify-reset-token',
      CHANGE_PASSWORD:    '/api/auth/change-password',
      REFRESH_TOKEN:      '/api/auth/refresh-token',
    },
    USERS: {
      PROFILE:      '/api/users/profile',
      SUBSCRIPTION: '/api/users/subscription',
      BILLING:      '/api/users/billing',
    },
    STRIPE: {
      CREATE_CHECKOUT:        '/api/stripe/create-checkout-session',
      SESSION_DETAILS:        '/api/stripe/session',
      CANCEL_SUBSCRIPTION:    '/api/stripe/cancel-subscription',
      REACTIVATE_SUBSCRIPTION:'/api/stripe/reactivate-subscription',
      CUSTOMER_PORTAL:        '/api/stripe/customer-portal',
      CHANGE_PLAN:            '/api/stripe/change-plan',
    },
    CALCULATORS: {
      // Premium
      STOCK_ANALYZER:     '/api/calculators/stock-analyzer',
      PORTFOLIO_OPTIMIZER:'/api/calculators/portfolio-optimizer',
      HISTORY:            '/api/calculators/history',
      // Free
      BOND_PRICE:         '/api/calculators/bond-price',
      BOND_YTM:           '/api/calculators/bond-ytm',
      BREAK_EVEN:         '/api/calculators/break-even',
      BUDGET:             '/api/calculators/budget',
      CD:                 '/api/calculators/cd',
      COMPOUND_INTEREST:  '/api/calculators/compound-interest',
      CREDIT_PAYOFF:      '/api/calculators/credit-payoff',
      CURRENCY_CONVERTER: '/api/calculators/currency-converter',
      DEBT_TO_INCOME:     '/api/calculators/debt-to-income',
      DIVIDEND:           '/api/calculators/dividend',
      INVESTMENT_RETURN:  '/api/calculators/investment-return',
      LOAN_AMORTIZATION:  '/api/calculators/loan-amortization',
      MODIFIED_DURATION:  '/api/calculators/modified-duration',
      MORTGAGE:           '/api/calculators/mortgage',
      NET_WORTH:          '/api/calculators/net-worth',
      RETIREMENT:         '/api/calculators/retirement',
      RULE_OF_72:         '/api/calculators/rule-of-72',
      SAVINGS_GOAL:       '/api/calculators/savings-goal',
    },
    LEGAL: {
      TERMS_OF_SERVICE: '/api/legal/terms-of-service',
      PRIVACY_POLICY:   '/api/legal/privacy-policy',
    },
  },
} as const;

export { API_CONFIG };