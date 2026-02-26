// src/config/env.ts

interface EnvConfig {
    // App
    NODE_ENV: string;
    BASE_URL: string;
    API_BASE_URL: string;

    // Alpha Vantage
    ALPHA_VANTAGE_API_KEY: string;

    // Stripe (public)
    STRIPE_MONTHLY_PLAN_LINK: string;
    STRIPE_YEARLY_PLAN_LINK: string;
    STRIPE_CUSTOMER_PORTAL_URL: string;

    // PostHog
    POSTHOG_KEY: string;
    POSTHOG_HOST: string;
}

const env: EnvConfig = {
    // App
    NODE_ENV: process.env.NODE_ENV || 'development',
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',

    // Alpha Vantage
    ALPHA_VANTAGE_API_KEY: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || '',

    // Stripe (public-facing links only)
    STRIPE_MONTHLY_PLAN_LINK: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK || '',
    STRIPE_YEARLY_PLAN_LINK: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK || '',
    STRIPE_CUSTOMER_PORTAL_URL: process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL || '',

    // PostHog
    POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
    POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
};

// Validate required env vars at startup
const requiredEnvVars: Array<keyof typeof env> = [
    'API_BASE_URL',
    'POSTHOG_KEY',
];

const missingEnvVars = requiredEnvVars.filter((key) => !env[key]);

if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
}

export default env;