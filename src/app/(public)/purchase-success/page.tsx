// src/app/(public)/purchase-success/page.tsx
'use client'

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stripeService } from "@/services/stripe.service";
import { LoaderCircleIcon } from "@/app/components/loader/LoadingCircle";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SubscriptionDetails {
    invoiceId: string;
    amount:    number;
    period:    string;   // 'month' | 'year' from Stripe interval
    planType:  string;   // 'basic' | 'premium' from session metadata
    startDate: string | number;
    endDate:   string | number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmtDate = (d: string | number) =>
    new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const fmtPeriod = (p: string) =>
    p === 'year' || p === 'yearly' ? 'Yearly' : 'Monthly';

const fmtPlan = (p: string) =>
    p ? p.charAt(0).toUpperCase() + p.slice(1) : '';

// Features unlocked per plan
const BASIC_FEATURES = [
    'Ad-free experience across all tools',
    'Save & view calculation history',
    'Basic financial reports',
    'Email support',
];

const PREMIUM_FEATURES = [
    'Ad-free experience across all tools',
    'Save & view calculation history',
    'Advanced financial reports',
    'Portfolio Optimizer',
    'Stock Analyzer',
    'Priority support',
    'Early access to new tools',
];

// ── Inner component (needs useSearchParams) ───────────────────────────────────

function ThankYouInner() {
    const searchParams = useSearchParams();
    const session_id   = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<SubscriptionDetails | null>(null);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {
        if (!session_id) {
            setError('No session ID found.');
            setLoading(false);
            return;
        }
        stripeService.getSessionDetails(session_id)
            .then(({ data }) => setDetails(data.data as SubscriptionDetails))
            .catch(() => setError('Failed to load subscription details. Check your email for confirmation.'))
            .finally(() => setLoading(false));
    }, [session_id]);

    // ── Loading ───────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="purchase-success-wrap">
                <div className="purchase-success-card contact-form">
                    <LoaderCircleIcon />
                </div>
            </div>
        );
    }

    // ── Error ─────────────────────────────────────────────────────────────────

    if (error || !details) {
        return (
            <div className="purchase-success-wrap">
                <div className="purchase-success-card contact-form">
                    <div className="purchase-success-icon purchase-success-icon--error">
                        <FontAwesomeIcon icon={['fas', 'circle-xmark']} />
                    </div>
                    <div className="purchase-success-header">
                        <h2 className="title-two purchase-success-title">Something went wrong</h2>
                        <p className="purchase-success-subtitle">{error}</p>
                    </div>
                    <div className="purchase-success-actions">
                        <Link href="/profile" className="btn btn-two">Go to Profile</Link>
                    </div>
                </div>
            </div>
        );
    }

    const isPremium  = details.planType === 'premium';
    const planLabel  = fmtPlan(details.planType);
    const features   = isPremium ? PREMIUM_FEATURES : BASIC_FEATURES;

    // ── Success ───────────────────────────────────────────────────────────────

    return (
        <div className="purchase-success-wrap">
            <div className="purchase-success-card contact-form">

                {/* Success icon */}
                <div className="purchase-success-icon purchase-success-icon--success">
                    <FontAwesomeIcon icon={['fas', 'circle-check']} />
                </div>

                {/* Heading */}
                <div className="purchase-success-header">
                    <h2 className="title-two purchase-success-title">Payment Successful!</h2>
                    <p className="purchase-success-subtitle">
                        Welcome to Slay the Bear {planLabel}! Your subscription is now active.
                    </p>
                </div>

                {/* Plan badge */}
                <div className="purchase-success-plan-badge-wrap">
                    <span className={`profile-plan-badge profile-plan-badge--${details.planType}`}>
                        <FontAwesomeIcon icon={['fas', isPremium ? 'crown' : 'shield-halved']} />
                        &nbsp;{planLabel} &middot; {fmtPeriod(details.period)}
                    </span>
                </div>

                {/* Order details */}
                <div className="purchase-success-details">
                    <div className="purchase-success-row">
                        <span className="purchase-success-row-label">Invoice</span>
                        <span className="purchase-success-row-value">#{details.invoiceId}</span>
                    </div>
                    <div className="purchase-success-row">
                        <span className="purchase-success-row-label">Amount charged</span>
                        <span className="purchase-success-row-value tg-cell-value">
                            ${details.amount.toFixed(2)}
                        </span>
                    </div>
                    <div className="purchase-success-row">
                        <span className="purchase-success-row-label">Billing period</span>
                        <span className="purchase-success-row-value">{fmtPeriod(details.period)}</span>
                    </div>
                    <div className="purchase-success-row">
                        <span className="purchase-success-row-label">Start date</span>
                        <span className="purchase-success-row-value">{fmtDate(details.startDate)}</span>
                    </div>
                    <div className="purchase-success-row">
                        <span className="purchase-success-row-label">Next renewal</span>
                        <span className="purchase-success-row-value">{fmtDate(details.endDate)}</span>
                    </div>
                </div>

                {/* Features unlocked */}
                <div className="purchase-success-unlocked">
                    <p className="purchase-success-unlocked-title">
                        <FontAwesomeIcon icon={['fas', 'unlock']} />
                        &nbsp;What you've unlocked
                    </p>
                    <ul className="purchase-success-unlocked-list">
                        {features.map((f) => (
                            <li key={f}>
                                <FontAwesomeIcon icon={['fas', 'check']} className="purchase-success-check" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTAs */}
                <div className="purchase-success-actions">
                    <Link href={isPremium ? '/premium-tools' : '/tools'} className="btn btn-two">
                        {isPremium ? 'Explore Premium Tools' : 'Explore Tools'}
                    </Link>
                    <Link href="/profile" className="purchase-success-profile-link">
                        View subscription in profile
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </Link>
                </div>

            </div>
        </div>
    );
}

// ── Page export ───────────────────────────────────────────────────────────────

export default function PurchaseSuccessPage() {
    return (
        <Suspense fallback={
            <div className="purchase-success-wrap">
                <div className="purchase-success-card contact-form">
                    <LoaderCircleIcon />
                </div>
            </div>
        }>
            <ThankYouInner />
        </Suspense>
    );
}