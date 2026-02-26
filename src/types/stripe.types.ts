// src/types/stripe.types.ts

import type { SubscriptionPlan, BillingInterval } from './user.types';

export type BillingPeriod = 'monthly' | 'yearly';
export type PlanType = 'basic' | 'premium';

// ── Requests ──────────────────────────────────────────────
// export interface CreateCheckoutRequest {
//   planType: SubscriptionPlan;
//   interval: BillingInterval;
//   successUrl?: string;
//   cancelUrl?: string;
// }

export interface CreateCheckoutRequest {
    period: BillingPeriod;
    planType: PlanType;
}

// ── Responses ─────────────────────────────────────────────
export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface SessionDetails {
  sessionId: string;
  status: string;
  customerEmail: string;
  plan: SubscriptionPlan;
  interval: BillingInterval;
  amountTotal: number;
  currency: string;
}

export interface CustomerPortal {
  url: string;
}

export interface CheckoutResponse {
    url: string;
}