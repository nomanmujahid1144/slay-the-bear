// src/types/user/user.types.ts

export type SubscriptionPlan = 'free' | 'basic' | 'premium';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'past_due';
export type BillingInterval = 'monthly' | 'yearly';

import { Plan } from '@/constants/enums';

// Core user profile returned by GET /api/users/profile
export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    picture?: string;
    location?: unknown;
    isVerified: boolean;
    plan: Plan;
    referralCode?: string;
    referralCount?: number;
    createdAt: Date;
    updatedAt: Date;
}

// Matches DB subscriptions table (returned by /get-user-latest-subscription)
export interface UserSubscription {
    id: string;
    userId: string;
    plan: SubscriptionPlan;
    period: BillingInterval;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

// Matches Stripe billing object (returned by getCustomerPortal / billing summary)
export interface UserBilling {
    customerId: string;
    subscriptionId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    interval: BillingInterval;
    amount: number;
    currency: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

// Matches DB subscription_entries table (returned by /get-user-billing-detail as array)
export interface UserBillingEntry {
    id: string;
    subscriptionId: string;
    invoiceId: string;
    amount: number;
    status: string;
    startDate: string;
    endDate: string;
    viewURL?: string;
    downloadURL?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
}