// src/app/(public)/purchase-success/page.tsx

'use client'

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { stripeService } from "@/services/stripe.service";
import { LoaderCircleIcon } from "@/app/components/loader/LoadingCircle";

interface SubscriptionDetails {
    invoiceId: string;
    startDate: string;
    endDate: string;
    period: string;
    amount: number;
}

function ThankYouComponent() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSessionDetails = async () => {
            if (!session_id) {
                setError('No session ID found');
                setLoading(false);
                return;
            }

            try {
                const { data } = await stripeService.getSessionDetails(session_id);
                setSubscriptionDetails(data.data as SubscriptionDetails);
            } catch {
                setError('Failed to load subscription details');
            } finally {
                setLoading(false);
            }
        };

        fetchSessionDetails();
    }, [session_id]);

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center py-12 px-4">
                <LoaderCircleIcon />
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen flex items-center justify-center py-12 px-4">
                <div className="max-w-2xl w-full contact-area rounded-lg shadow-lg p-8 text-center">
                    <div className="mb-6">
                        <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Error Loading Details</h2>
                    <p className="mb-6">{error}</p>
                    <Link href="/" className="btn btn-two">Return to Home</Link>
                </div>
            </section>
        );
    }

    if (!subscriptionDetails) return null;

    return (
        <section className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full contact-area rounded-lg shadow-lg p-8 md:p-12">
                <div className="text-center mb-8">
                    <div className="mb-6">
                        <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8">
                        Thank you for subscribing to our premium service! We are thrilled to welcome you as a premium
                        member of the SlayTheBear family. Your order{' '}
                        <span className="font-medium hover:underline">#{subscriptionDetails.invoiceId}</span> has been
                        successfully processed. As a valued member, you now have access to exclusive calculators and
                        advanced features.
                    </p>
                </div>

                <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 md:mb-8 bg-gray-50 dark:bg-gray-800">
                    <dl className="sm:flex items-center justify-between gap-4 py-2">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-600 dark:text-gray-400">Start Date</dt>
                        <dd className="font-medium sm:text-end">
                            {new Date(subscriptionDetails.startDate).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                            })}
                        </dd>
                    </dl>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <dl className="sm:flex items-center justify-between gap-4 py-2">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-600 dark:text-gray-400">End Date</dt>
                        <dd className="font-medium sm:text-end">
                            {new Date(subscriptionDetails.endDate).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                            })}
                        </dd>
                    </dl>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <dl className="sm:flex items-center justify-between gap-4 py-2">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-600 dark:text-gray-400">Subscription Period</dt>
                        <dd className="font-medium sm:text-end capitalize">
                            {subscriptionDetails.period === 'year' ? 'Yearly' : 'Monthly'}
                        </dd>
                    </dl>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <dl className="sm:flex items-center justify-between gap-4 py-2">
                        <dt className="font-normal mb-1 sm:mb-0 text-gray-600 dark:text-gray-400">Amount</dt>
                        <dd className="font-medium sm:text-end text-primary text-xl">
                            ${subscriptionDetails.amount.toFixed(2)}
                        </dd>
                    </dl>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/profile" className="btn btn-two text-center">View Profile</Link>
                    <Link href="/" className="btn btn-one text-center">Return to Home</Link>
                </div>
            </div>
        </section>
    );
}

export default function ThankYou() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <LoaderCircleIcon />
            </div>
        }>
            <ThankYouComponent />
        </Suspense>
    );
}