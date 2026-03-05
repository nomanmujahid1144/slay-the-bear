// src/app/components/profile/Accounts.tsx
'use client'

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultButton } from "../buttons/Default";
import InputField from "@/app/components/fields/Input";
import { userService } from "@/services/user.service";
import { authService } from "@/services/auth.service";
import { stripeService } from "@/services/stripe.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from '@/utils/toast';
import { LoaderCircleIcon } from "../loader/LoadingCircle";
import type { ChangeEvent, FormEvent } from "react";
import type { UserSubscription } from "@/types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Credentials {
    firstName: string;
    lastName: string;
    email: string;
}

type PlanTier = 'basic' | 'premium';
type PlanPeriod = 'monthly' | 'yearly';

interface PlanOption {
    tier: PlanTier;
    period: PlanPeriod;
    label: string;
    price: string;
    yearlyNote?: string;
}

const PLAN_OPTIONS: PlanOption[] = [
    { tier: 'basic', period: 'monthly', label: 'Basic Monthly', price: '$2.99/mo' },
    { tier: 'basic', period: 'yearly', label: 'Basic Yearly', price: '$2.00/mo', yearlyNote: 'Billed $24/yr' },
    { tier: 'premium', period: 'monthly', label: 'Premium Monthly', price: '$6.99/mo' },
    { tier: 'premium', period: 'yearly', label: 'Premium Yearly', price: '$5.00/mo', yearlyNote: 'Billed $60/yr' },
];

// Rank for determining upgrade vs downgrade
const PLAN_RANK: Record<string, number> = {
    'basic-monthly': 1,
    'basic-yearly': 2,
    'premium-monthly': 3,
    'premium-yearly': 4,
};

// ── Component ──────────────────────────────────────────────────────────────────

export const Accounts = () => {
    const { user, setUser } = useAuthStore();

    const [loading, setLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [reactivateLoading, setReactivateLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [changePlanLoading, setChangePlanLoading] = useState(false);

    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [credentials, setCredentials] = useState<Credentials>({ firstName: '', lastName: '', email: '' });

    const [showPlanChange, setShowPlanChange] = useState(false);
    const [selectedTier, setSelectedTier] = useState<PlanTier>('premium');
    const [selectedPeriod, setSelectedPeriod] = useState<PlanPeriod>('yearly');

    // ── Data fetching ─────────────────────────────────────────────────────────

    const getUserData = async () => {
        try {
            const { data } = await userService.getProfile();
            const u = data.data;
            setCredentials({ firstName: u.firstName, lastName: u.lastName, email: u.email });
        } catch {
            setCredentials({ firstName: '', lastName: '', email: '' });
        }
    };

    const getSubscriptionData = async () => {
        try {
            const { data } = await userService.getSubscription();
            setSubscription(data.data);
        } catch {
            // silentOn404 suppresses toast — free users simply have no subscription
            setSubscription(null);
        }
    };

    useEffect(() => {
        getUserData();
        getSubscriptionData();
    }, []);

    // Pre-select the opposite tier when the panel opens
    useEffect(() => {
        if (showPlanChange && subscription) {
            const otherTier = subscription.plan === 'premium' ? 'basic' : 'premium';
            setSelectedTier(otherTier as PlanTier);
            setSelectedPeriod(subscription.period as PlanPeriod);
        }
    }, [showPlanChange]);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userService.updateProfile({ firstName: credentials.firstName, lastName: credentials.lastName });
            toast.success('Profile updated successfully!');
            if (user) setUser({ ...user, ...credentials });
        } catch {
            // handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleRecoverPassword = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPasswordLoading(true);
        try {
            await authService.forgotPassword({ email: credentials.email });
            toast.success('Password reset link sent to your email!');
        } catch {
            // handled by errorHandler
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        if (!confirm('Are you sure? You will keep access until the end of your billing period.')) return;
        setCancelLoading(true);
        try {
            await stripeService.cancelSubscription();
            toast.success('Subscription will be canceled at the end of the billing period.');
            getSubscriptionData();
        } catch {
            // handled by errorHandler
        } finally {
            setCancelLoading(false);
        }
    };

    const handleReactivateSubscription = async () => {
        setReactivateLoading(true);
        try {
            await stripeService.reactivateSubscription();
            toast.success('Subscription reactivated successfully!');
            getSubscriptionData();
        } catch {
            // handled by errorHandler
        } finally {
            setReactivateLoading(false);
        }
    };

    const handleChangePlan = async () => {
        if (!subscription) return;
        const currentKey = `${subscription.plan}-${subscription.period}`;
        const newKey = `${selectedTier}-${selectedPeriod}`;
        if (currentKey === newKey) {
            toast.error(`You are already on the ${selectedTier} ${selectedPeriod} plan.`);
            return;
        }
        setChangePlanLoading(true);
        try {
            const { data } = await stripeService.changePlan({ planType: selectedTier, period: selectedPeriod });
            toast.success(data.data.message);
            setShowPlanChange(false);
            getSubscriptionData();
        } catch {
            // handled by errorHandler
        } finally {
            setChangePlanLoading(false);
        }
    };

    // ── Helpers ───────────────────────────────────────────────────────────────

    const getChangeType = (): 'upgrade' | 'downgrade' | 'same' => {
        if (!subscription) return 'same';
        const currentRank = PLAN_RANK[`${subscription.plan}-${subscription.period}`] ?? 0;
        const newRank = PLAN_RANK[`${selectedTier}-${selectedPeriod}`] ?? 0;
        if (newRank === currentRank) return 'same';
        return newRank > currentRank ? 'upgrade' : 'downgrade';
    };

    // ── Render ────────────────────────────────────────────────────────────────

    if (!user) {
        return <div className="profile-section-loader"><LoaderCircleIcon /></div>;
    }

    const hasSubscription = subscription && (subscription.plan === 'basic' || subscription.plan === 'premium');
    const currentKey = subscription ? `${subscription.plan}-${subscription.period}` : '';
    const changeType = getChangeType();

    return (
        <div className="profile-tab-content">

            {/* ── Profile Information ──────────────────────────────────── */}
            <div className="profile-section">
                <div className="profile-section-header">
                    <span className="profile-section-icon">
                        <FontAwesomeIcon icon={['fas', 'user']} />
                    </span>
                    <div>
                        <h2 className="profile-section-title">Profile Information</h2>
                        <p className="profile-section-desc">Update your name and personal details</p>
                    </div>
                </div>
                <form onSubmit={handleUpdateProfile}>
                    <div className="row">
                        <div className="col-md-6">
                            <InputField required label="First Name" id="firstName" type="text"
                                value={credentials.firstName} onChange={onChange}
                                placeholder="First Name" isVisible={false} />
                        </div>
                        <div className="col-md-6">
                            <InputField required label="Last Name" id="lastName" type="text"
                                value={credentials.lastName} onChange={onChange}
                                placeholder="Last Name" isVisible={false} />
                        </div>
                        <div className="col-md-12">
                            <InputField required label="Email Address" id="email" type="email"
                                value={credentials.email} onChange={onChange}
                                placeholder="Email" disabled isVisible={false} />
                        </div>
                    </div>
                    <div className="profile-action-row">
                        <DefaultButton type="submit" text="Save Changes" loadingText="Saving..."
                            loading={loading} disabled={loading} />
                    </div>
                </form>
            </div>

            <div className="profile-divider" />

            {/* ── Password ─────────────────────────────────────────────── */}
            <div className="profile-section">
                <div className="profile-section-header">
                    <span className="profile-section-icon">
                        <FontAwesomeIcon icon={['fas', 'lock']} />
                    </span>
                    <div>
                        <h2 className="profile-section-title">Password</h2>
                        <p className="profile-section-desc">We'll send a reset link to your email address</p>
                    </div>
                </div>
                <div className="profile-action-row">
                    <DefaultButton type="button" text="Send Reset Link" loadingText="Sending..."
                        loading={passwordLoading} disabled={passwordLoading}
                        onClick={handleRecoverPassword} />
                </div>
            </div>

            {/* ── Subscription ─────────────────────────────────────────── */}
            {hasSubscription && (
                <>
                    <div className="profile-divider" />
                    <div className="profile-section">
                        <div className="profile-section-header">
                            <span className="profile-section-icon">
                                <FontAwesomeIcon icon={['fas', 'crown']} />
                            </span>
                            <div>
                                <h2 className="profile-section-title">Subscription</h2>
                                <p className="profile-section-desc">Manage your active plan</p>
                            </div>
                        </div>

                        {/* ── Current plan card ─────────────────────────── */}
                        <div className="profile-plan-card">
                            <div className="profile-plan-grid">
                                <div className="profile-plan-cell">
                                    <span className="profile-plan-label">Current Plan</span>
                                    <span className={`profile-plan-badge profile-plan-badge--${subscription!.plan}`}>
                                        <FontAwesomeIcon icon={['fas', subscription!.plan === 'premium' ? 'crown' : 'shield-halved']} />
                                        &nbsp;{subscription!.plan.charAt(0).toUpperCase() + subscription!.plan.slice(1)}
                                    </span>
                                    <span className="profile-plan-period">{subscription!.period}</span>
                                </div>
                                <div className="profile-plan-cell">
                                    <span className="profile-plan-label">Start Date</span>
                                    <span className="profile-plan-value">
                                        {new Date(subscription!.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="profile-plan-cell">
                                    <span className="profile-plan-label">Renews / Ends</span>
                                    <span className="profile-plan-value">
                                        {new Date(subscription!.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ── Pending downgrade notice ──────────────────────── */}
                        {subscription!.pendingDowngrade && (
                            <div className="profile-plan-notice profile-plan-notice--warning">
                                <FontAwesomeIcon icon={['fas', 'clock']} className="mt-1" />
                                <div>
                                    <strong>Downgrade Scheduled</strong>
                                    <p>
                                        Your plan will change to{' '}
                                        <strong>
                                            {subscription!.pendingDowngrade.plan.charAt(0).toUpperCase() +
                                                subscription!.pendingDowngrade.plan.slice(1)}{' '}
                                            {subscription!.pendingDowngrade.period.charAt(0).toUpperCase() +
                                                subscription!.pendingDowngrade.period.slice(1)}
                                        </strong>{' '}
                                        on{' '}
                                        {new Date(subscription!.pendingDowngrade.effectiveDate).toLocaleDateString('en-US', {
                                            month: 'long', day: 'numeric', year: 'numeric'
                                        })}.
                                        You have full access until then.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── Cancellation notice ───────────────────────────── */}
                        {subscription!.cancelAtPeriodEnd && (
                            <div className="profile-plan-notice profile-plan-notice--danger">
                                <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} />
                                <div>
                                    <strong>Subscription Canceling</strong>
                                    <p>
                                        Your subscription will end on{' '}
                                        <strong>
                                            {new Date(subscription!.endDate).toLocaleDateString('en-US', {
                                                month: 'long', day: 'numeric', year: 'numeric'
                                            })}
                                        </strong>
                                        . You have full access until then.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── Plan change panel ─────────────────────────── */}
                        {showPlanChange && (
                            <div className="profile-plan-change-panel">
                                <p className="profile-plan-change-title">Select a new plan</p>

                                <div className="profile-plan-options">
                                    {PLAN_OPTIONS.map((opt) => {
                                        const key = `${opt.tier}-${opt.period}`;
                                        const isCurrent = key === currentKey;
                                        const isSelected = key === `${selectedTier}-${selectedPeriod}`;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                disabled={isCurrent}
                                                onClick={() => { setSelectedTier(opt.tier); setSelectedPeriod(opt.period); }}
                                                className={`profile-plan-option ${isSelected ? 'profile-plan-option--selected' : ''} ${isCurrent ? 'profile-plan-option--current' : ''}`}
                                            >
                                                <span className="profile-plan-option-label">{opt.label}</span>
                                                <span className="profile-plan-option-price">{opt.price}</span>
                                                {opt.yearlyNote && (
                                                    <span className="profile-plan-option-note">{opt.yearlyNote}</span>
                                                )}
                                                {isCurrent && (
                                                    <span className="profile-plan-option-current-tag">Current</span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Upgrade / downgrade hint */}
                                {changeType !== 'same' && (
                                    <p className={`profile-plan-change-hint profile-plan-change-hint--${changeType}`}>
                                        <FontAwesomeIcon icon={['fas', changeType === 'upgrade' ? 'arrow-up' : 'arrow-down']} />
                                        &nbsp;
                                        {changeType === 'upgrade'
                                            ? 'Upgrade — charged immediately with proration.'
                                            : 'Downgrade — takes effect at end of your current billing period.'}
                                    </p>
                                )}

                                <div className="profile-sub-actions" style={{ marginTop: '16px' }}>
                                    <DefaultButton
                                        type="button"
                                        text={changeType === 'upgrade' ? 'Confirm Upgrade' : changeType === 'downgrade' ? 'Confirm Downgrade' : 'Select a different plan'}
                                        loadingText="Changing plan..."
                                        loading={changePlanLoading}
                                        disabled={changePlanLoading || changeType === 'same'}
                                        onClick={handleChangePlan}
                                    />
                                    <DefaultButton
                                        type="button"
                                        text="Cancel"
                                        loadingText=""
                                        disabled={changePlanLoading}
                                        onClick={() => setShowPlanChange(false)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* ── Main action buttons ───────────────────────── */}
                        {!showPlanChange && (
                            <div className="profile-sub-actions">
                                <DefaultButton
                                    type="button" text="Change Plan" loadingText=""
                                    disabled={cancelLoading || reactivateLoading || !!subscription?.pendingDowngrade || subscription?.cancelAtPeriodEnd}
                                    onClick={() => setShowPlanChange(true)} />

                                <DefaultButton
                                    type="button" text="Cancel Subscription" loadingText="Canceling..."
                                    loading={cancelLoading}
                                    disabled={cancelLoading || reactivateLoading || subscription?.cancelAtPeriodEnd}
                                    onClick={handleCancelSubscription} />
                                <DefaultButton
                                    type="button" text="Reactivate" loadingText="Reactivating..."
                                    loading={reactivateLoading} disabled={cancelLoading || reactivateLoading}
                                    onClick={handleReactivateSubscription} />
                            </div>
                        )}

                        <p className="profile-sub-note">
                            <FontAwesomeIcon icon={['fas', 'circle-info']} />
                            &nbsp;Canceling keeps access active until the end of your current billing period.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};