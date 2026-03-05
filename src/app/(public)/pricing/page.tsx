'use client'

import { useRouter } from "next/navigation";
import { useDarkMode } from "../../components/dark-mode/DarkModeContext";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { stripeService } from "@/services/stripe.service";

// ── Types ─────────────────────────────────────────────────────────────────────

type BillingPeriod = 'monthly' | 'yearly';
type PlanTier = 'basic' | 'premium';
type LoadingKey = `${PlanTier}-${BillingPeriod}` | null;

interface PlanFeature {
    text: string;
    included: boolean;
}

interface PricingPlan {
    tier: PlanTier;
    period: BillingPeriod;
    title: string;
    subtitle: string;
    monthlyPrice: number;
    originalPrice?: number;
    yearlyTotal?: number;
    discount?: string;
    badge?: string;
    features: PlanFeature[];
}

// ── Plan data ─────────────────────────────────────────────────────────────────

const BASIC_FEATURES: PlanFeature[] = [
    { text: 'Access to all free calculators',    included: true  },
    { text: 'Ad-free experience',                included: true  },
    { text: 'Save & view calculation history',   included: true  },
    { text: 'Basic financial reports',           included: true  },
    { text: 'Email support',                     included: true  },
    { text: 'Portfolio Optimizer',               included: false },
    { text: 'Stock Analyzer',                    included: false },
    { text: 'Priority support',                  included: false },
];

const PREMIUM_FEATURES: PlanFeature[] = [
    { text: 'Access to all free calculators',    included: true  },
    { text: 'Ad-free experience',                included: true  },
    { text: 'Save & view calculation history',   included: true  },
    { text: 'Advanced financial reports',        included: true  },
    { text: 'Portfolio Optimizer',               included: true  },
    { text: 'Stock Analyzer',                    included: true  },
    { text: 'Priority support',                  included: true  },
    { text: 'Early access to new tools',         included: true  },
];

const PLANS: PricingPlan[] = [
    {
        tier: 'basic',
        period: 'monthly',
        title: 'Basic',
        subtitle: 'Ad-Free',
        monthlyPrice: 2.99,
        features: BASIC_FEATURES,
    },
    {
        tier: 'basic',
        period: 'yearly',
        title: 'Basic',
        subtitle: 'Ad-Free',
        monthlyPrice: 2.00,           // $24.00 / 12
        originalPrice: 2.99,
        discount: '33% off',
        badge: 'Best Value',
        yearlyTotal: 24.00,
        features: BASIC_FEATURES,
    },
    {
        tier: 'premium',
        period: 'monthly',
        title: 'Premium',
        subtitle: 'Ad-Free + Pro Tools',
        monthlyPrice: 6.99,
        features: PREMIUM_FEATURES,
    },
    {
        tier: 'premium',
        period: 'yearly',
        title: 'Premium',
        subtitle: 'Ad-Free + Pro Tools',
        monthlyPrice: 5.00,           // $60.00 / 12
        originalPrice: 6.99,
        discount: '28% off',
        badge: 'Most Popular',
        yearlyTotal: 60.00,
        features: PREMIUM_FEATURES,
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Pricing() {
    const { isDarkMode } = useDarkMode();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    const [activeTier, setActiveTier] = useState<PlanTier>('premium');
    const [loadingKey, setLoadingKey] = useState<LoadingKey>(null);

    // Only show the 2 cards for the active tier
    const visiblePlans = PLANS.filter(p => p.tier === activeTier);

    const handlePurchase = async (plan: PricingPlan) => {
        if (!isAuthenticated) {
            router.push('/login?redirect_url=/pricing');
            return;
        }
        const key: LoadingKey = `${plan.tier}-${plan.period}`;
        setLoadingKey(key);
        try {
            const { data } = await stripeService.createCheckout({
                period: plan.period,
                planType: plan.tier,
            });
            window.location.href = data.data.url;
        } catch {
            setLoadingKey(null);
        }
    };

    return (
        <div className="contact-area pricing-page">
            <main>
                <div className="pricing-container">

                    {/* ── Page header ─────────────────────────────────────── */}
                    <div className="pricing-header">
                        <h1 className="title-two pricing-title">Choose Your Plan</h1>
                        <p className="pricing-subtitle">
                            Unlock powerful financial tools and enjoy a fully ad-free experience.
                            Cancel anytime.
                        </p>
                    </div>

                    {/* ── Tier toggle ──────────────────────────────────────── */}
                    <div className="pricing-toggle-wrap">
                        <div className="pricing-toggle">
                            <button
                                type="button"
                                onClick={() => setActiveTier('basic')}
                                className={`pricing-toggle-btn ${activeTier === 'basic' ? 'active' : ''}`}
                            >
                                Ads Free
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTier('premium')}
                                className={`pricing-toggle-btn ${activeTier === 'premium' ? 'active' : ''}`}
                            >
                                Premium
                            </button>
                        </div>
                    </div>

                    {/* ── Tier description ─────────────────────────────────── */}
                    <p className="pricing-tier-desc">
                        {activeTier === 'basic'
                            ? 'All free calculators with zero ads, clean, fast and distraction free.'
                            : 'Everything in Ads Free, plus Portfolio Optimizer, Stock Analyzer and priority support.'}
                    </p>

                    {/* ── Plan cards ───────────────────────────────────────── */}
                    <div className="pricing-cards">
                        {visiblePlans.map((plan) => {
                            const key: LoadingKey = `${plan.tier}-${plan.period}`;
                            const isLoading = loadingKey === key;
                            const isHighlighted = !!plan.badge;

                            return (
                                <div
                                    key={key}
                                    className={`pricing-card contact-form ${isHighlighted ? 'pricing-card--highlighted' : ''}`}
                                >
                                    {/* Badge */}
                                    {plan.badge && (
                                        <div className="pricing-card-badge">{plan.badge}</div>
                                    )}

                                    {/* Header */}
                                    <div className="pricing-card-header">
                                        <div className="pricing-card-title-row">
                                            <h2 className="title-two pricing-card-title">
                                                {plan.title}
                                                <span className="pricing-card-period-label">
                                                    · {plan.period === 'yearly' ? 'Yearly' : 'Monthly'}
                                                </span>
                                            </h2>
                                            {plan.discount && (
                                                <span className="pricing-card-discount">{plan.discount}</span>
                                            )}
                                        </div>
                                        <p className="pricing-card-subtitle">{plan.subtitle}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="pricing-card-price-wrap">
                                        <div className="pricing-card-price-row">
                                            {plan.originalPrice && (
                                                <span className="pricing-card-original-price">
                                                    ${plan.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                            <span className="title-two pricing-card-price">
                                                ${plan.monthlyPrice.toFixed(2)}
                                            </span>
                                            <span className="pricing-card-per-mo">/mo</span>
                                        </div>
                                        {plan.period === 'yearly' && plan.yearlyTotal && (
                                            <p className="pricing-card-billed-yearly">
                                                Billed ${plan.yearlyTotal.toFixed(2)} per year
                                            </p>
                                        )}
                                    </div>

                                    {/* CTA */}
                                    <button
                                        type="button"
                                        disabled={isLoading || loadingKey !== null}
                                        onClick={() => handlePurchase(plan)}
                                        className={`btn btn-two w-100 justify-content-center pricing-card-btn ${isLoading || loadingKey !== null ? 'disabled' : ''}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin" />
                                                &nbsp;Processing...
                                            </>
                                        ) : (
                                            `Get ${plan.title} ${plan.period === 'yearly' ? 'Yearly' : 'Monthly'}`
                                        )}
                                    </button>

                                    <hr className="pricing-card-divider" />

                                    {/* Features */}
                                    <ul className="pricing-feature-list">
                                        {plan.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className={`pricing-feature-item ${!feature.included ? 'pricing-feature-item--excluded' : ''}`}
                                            >
                                                <span className={`pricing-feature-icon ${feature.included ? 'pricing-feature-icon--included' : 'pricing-feature-icon--excluded'}`}>
                                                    <i className={feature.included ? 'fas fa-check' : 'fas fa-times'} />
                                                </span>
                                                {feature.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Footer note ──────────────────────────────────────── */}
                    <p className="pricing-footer-note">
                        All plans renew automatically. Cancel anytime from your profile settings.&nbsp;
                        Secure payments powered by <span className="pricing-stripe-label">Stripe</span>.
                    </p>

                </div>
            </main>
        </div>
    );
}