'use client'

import { useRouter } from "next/navigation";
import { ButtonGoTo } from "../../components/buttons/ButtonGoTo";
import { useDarkMode } from "../../components/dark-mode/DarkModeContext";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { stripeService } from "@/services/stripe.service";

type BillingPeriod = 'monthly' | 'yearly';

interface PricingItem {
    title: string;
    description: string;
    price: number;
    discount: string;
    discountedPrice: string;
    href: string;
    paymentLink: BillingPeriod;
    features: string[];
}

const pricingsList: PricingItem[] = [
    {
        title: 'Monthly',
        description: 'There are many variations available, but the majority have suffered.',
        price: 6,
        discount: '',
        discountedPrice: '',
        href: '/login',
        paymentLink: 'monthly',
        features: [
            "Gutenberg Integration",
            "Gutenberg Integration",
            "Gutenberg Integration",
        ],
    },
    {
        title: 'Yearly',
        description: 'There are many variations available, but the majority have suffered.',
        price: 60,
        discount: '12% off',
        discountedPrice: '72',
        href: '/login',
        paymentLink: 'yearly',
        features: [
            "Gutenberg Integration",
            "Gutenberg Integration",
            "Gutenberg Integration",
        ],
    },
];

export default function Pricing() {
    const { isDarkMode } = useDarkMode();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState<BillingPeriod | null>(null);

    const handlePricingNavigator = async ({ paymentLink }: { paymentLink?: string }) => {
        if (!isAuthenticated) {
            router.push('/login?redirect_url=/pricing');
            return;
        }

        if (!paymentLink) return;
        const period = paymentLink as BillingPeriod;
        setLoading(period);

        try {
            const { data } = await stripeService.createCheckout({
                period,
                planType: 'premium',
            });
            window.location.href = data.data.url;
        } catch {
            setLoading(null);
        }
    };

    return (
        <div className="relative font-inter antialiased">
            <main className="relative min-h-screen flex flex-col justify-center contact-area overflow-hidden">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
                    <div>
                        <div className="max-w-sm mx-auto lg:flex gap-6 justify-center items-start lg:max-w-none pt-10">
                            {pricingsList.map((priceItem, index) => (
                                <div key={index} className="h-full lg:!max-w-sm text-start">
                                    <div className={`relative contact-form flex flex-col h-full p-6 rounded-2xl border ${isDarkMode ? '!border-slate-800' : 'border-slate-200'} shadow shadow-slate-950/5`}>
                                        <div className="blog-details-inner-content">
                                            <div className="mb-5">
                                                <div className="flex justify-between">
                                                    <h1 className="title-two font-semibold mb-1">
                                                        {priceItem.title}
                                                        <sup className="ml-2">
                                                            {priceItem.discount.length > 0 && (
                                                                <span className={`inline-flex items-center rounded-full ${isDarkMode ? 'bg-black-300' : 'bg-indigo-100'} px-2 text-xs font-medium !text-primary ring-1 ring-inset ring-primary`}>
                                                                    {priceItem.discount}
                                                                </span>
                                                            )}
                                                        </sup>
                                                    </h1>
                                                    {priceItem.discount.length > 0 && (
                                                        <span className={`inline-flex items-center rounded-md ${isDarkMode ? 'bg-slate-700' : 'bg-indigo-100'} px-2 py-1 text-xs font-bold !text-primary ring-1 ring-inset ring-primary`}>
                                                            Most Popular
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="inline-flex items-baseline mb-2 gap-1">
                                                    {priceItem.discount.length > 0 && priceItem.discountedPrice && (
                                                        <h3 className="title-two font-semibold !text-base line-through">
                                                            ${parseFloat(priceItem.discountedPrice).toFixed(2)}
                                                            <span className="text-slate-500 lowercase text-base !font-thin">/mo</span>
                                                        </h3>
                                                    )}
                                                    <h3 className="title-two font-bold text-4xl">
                                                        ${priceItem.price.toFixed(2)}
                                                        <span className="text-slate-500 lowercase text-base !font-thin">/mo</span>
                                                    </h3>
                                                </div>
                                                <p>{priceItem.description}</p>
                                                <ButtonGoTo
                                                    href={priceItem.href}
                                                    onClick={handlePricingNavigator}
                                                    paymentLink={priceItem.paymentLink}
                                                    text={loading === priceItem.paymentLink ? 'Loading...' : 'Purchase Plan'}
                                                />
                                            </div>
                                            <ul className="list-wrap">
                                                {priceItem.features.map((feature, i) => (
                                                    <li key={i}>
                                                        <i className="fas fa-check" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}