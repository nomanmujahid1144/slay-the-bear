// src/constants/enums.ts

export const Plan = { FREE: 'free', PREMIUM: 'premium' } as const;
export const SubscriptionPeriod = { MONTHLY: 'monthly', YEARLY: 'yearly' } as const;

export type Plan = typeof Plan[keyof typeof Plan];
export type SubscriptionPeriod = typeof SubscriptionPeriod[keyof typeof SubscriptionPeriod];