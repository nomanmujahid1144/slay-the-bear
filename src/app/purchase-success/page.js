'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { getSessionSubscriptoinDetails } from './actions';
import toast from 'react-hot-toast';
import { LoadingRotating } from '../components/Loader/LoadingRotating';


function ThankYouComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id'); // Extract session_id from URL
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSubscriptionDetails();
    }, [sessionId]); // Dependency on sessionId and router

    const fetchSubscriptionDetails = async () => {
        setIsLoading(true);
        if (sessionId) {
            try {
                const response = await getSessionSubscriptoinDetails({ session_id: sessionId });

                if (!response.success) {
                    toast.error(response.message)
                    throw new Error(response.message);
                } else {
                    setSubscriptionDetails(response.data);
                }
            } catch (error) {
                toast.error('An error occurred while retrieving your subscription details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setTimeout(() => {
                toast.error('Session ID not found. Please ensure the URL is correct and try again.');
                setIsLoading(false); // Stop loading after 1 second
                router.push('/'); // Redirect after error
            }, 1000); // Delay for 1 second before redirection
        }
    };

    return (
        <section className="contact-area py-8 md:py-16 antialiased">
            {isLoading ? (
                <div className="my-2 h-screen w-full flex justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <LoadingRotating className="w-10 h-10 animate-spin text-muted-foreground" />
                        <h3 className="text-xl font-bold">Redirecting...</h3>
                        <p>Please wait</p>
                    </div>
                </div>
            ) : (
                <>
                    {subscriptionDetails && (
                        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                            <h2 className="title-two text-xl font-semibold sm:text-2xl mb-2">
                                Welcome to the SlayTheBear Family!
                            </h2>
                            <p className="mb-6 md:mb-8">
                                Thank you for subscribing to our premium service! We are thrilled to welcome you as a premium member of the SlayTheBear family. Your order <span className="font-medium hover:underline">#{subscriptionDetails.invoiceId}</span> has been successfully processed.
                                As a valued member, you now have access to exclusive calculators and advanced features, designed to enhance your experience.
                            </p>
                            <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 p-6 dark:border-gray-700 mb-6 md:mb-8">
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-normal mb-1 sm:mb-0">
                                        <p>Start Date</p>
                                    </dt>
                                    <dd className="font-medium sm:text-end">
                                        <p>{new Date(subscriptionDetails.startDate).toLocaleDateString()}</p>
                                    </dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-normal mb-1 sm:mb-0">
                                        <p>End Date</p>
                                    </dt>
                                    <dd className="font-medium sm:text-end">
                                        <p>{new Date(subscriptionDetails.endDate).toLocaleDateString()}</p>
                                    </dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-normal mb-1 sm:mb-0">
                                        <p>Subscription Period</p>
                                    </dt>
                                    <dd className="font-medium sm:text-end">
                                        <p>{subscriptionDetails.period === 'year' ? 'Yearly' : 'Monthly'}</p>
                                    </dd>
                                </dl>
                                <dl className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-normal mb-1 sm:mb-0">
                                        <p>Amount</p>
                                    </dt>
                                    <dd className="font-medium sm:text-end">
                                        <p>${(subscriptionDetails.amount).toFixed(2)}</p>
                                    </dd>
                                </dl>
                            </div>
                            <div className="flex justify-center items-center space-x-4">
                                <Link
                                    href={'/'}
                                    className={`btn btn-two w-1/3 justify-content-center cursor-pointer`}
                                >
                                    Return to Home
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

// Wrap SymbolComponent in Suspense
export default function ThankYou() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ThankYouComponent />
        </Suspense>
    );
}