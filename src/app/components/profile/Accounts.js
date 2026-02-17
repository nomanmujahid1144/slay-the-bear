// src/app/components/profile/Accounts.js - UPDATE

'use client'

import { useEffect, useState } from "react";
import { DefaultButton } from "../Buttons/Default";
import InputField from "@/app/components/fields/Input";
import { userService } from "@/services/user.service";
import { authService } from "@/services/auth.service";
import { stripeService } from "@/services/stripe.service";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";
import { LoaderCircleIcon } from "../Loader/LoadingCircle";

export const Accounts = () => {
    const { user, setUser } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [reactivateLoading, setReactivateLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleUpdateUserDetails = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await userService.updateProfile({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
            });

            toast.success('Profile updated successfully!');
            setUser({ ...user, ...credentials });
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await userService.getProfile();
            const userData = data.data;

            setCredentials({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
            });
        } catch (error) {
            setCredentials({
                firstName: "",
                lastName: "",
                email: ""
            });
        }
    };

    const getSubscriptionData = async () => {
        try {
            const { data } = await userService.getSubscription();
            setSubscription(data.data);
        } catch (error) {
            setSubscription(null);
        }
    };

    useEffect(() => {
        getUserData();
        getSubscriptionData();
    }, []);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleRecoverPassword = async (e) => {
        e.preventDefault();
        setPasswordLoading(true);

        try {
            await authService.forgotPassword({ email: credentials.email });
            toast.success('Password reset link sent to your email!');
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        console.log('Clicke')
        if (!confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.')) return;

        setCancelLoading(true);
        try {
            await stripeService.cancelSubscription();
            toast.success('Subscription will be canceled at the end of billing period');
            getSubscriptionData();
        } catch (error) {
            // Error handled by errorHandler
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
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setReactivateLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center py-20">
                <LoaderCircleIcon />
            </div>
        );
    }

    return (
        <>
            <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Account Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Manage your profile information and subscription
                </p>
            </div>
            <hr className="mt-4 mb-8" />

            {/* Profile Information */}
            <p className="py-2 text-xl font-semibold">Profile Information</p>
            <form onSubmit={handleUpdateUserDetails}>
                <div className="row">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            required={true}
                            label="First Name"
                            id="firstName"
                            type="text"
                            value={credentials.firstName}
                            onChange={onChange}
                            placeholder="First Name"
                        />
                        <InputField
                            label="Last Name"
                            required={true}
                            id="lastName"
                            type="text"
                            value={credentials.lastName}
                            onChange={onChange}
                            placeholder="Last Name"
                        />
                        <InputField
                            label="Email"
                            required={true}
                            id="email"
                            type="email"
                            value={credentials.email}
                            onChange={onChange}
                            placeholder="Email"
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <DefaultButton
                        type="submit"
                        text="Update Profile"
                        loadingText="Updating..."
                        loading={loading}
                        disabled={loading}
                    />
                </div>
            </form>

            <hr className="mt-8 mb-8" />

            {/* Password Recovery */}
            <div className="mb-10">
                <p className="py-2 text-xl font-semibold">Password Recovery</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Click the button below to receive a password reset link via email.
                </p>
                <DefaultButton
                    type="button"
                    text="Send Password Reset Link"
                    loadingText="Sending..."
                    loading={passwordLoading}
                    disabled={passwordLoading}
                    onClick={handleRecoverPassword}
                />
            </div>

            {/* Subscription Management */}
            {subscription && subscription.plan === 'premium' && (
                <>
                    <hr className="mt-8 mb-8" />
                    <div className="mb-10">
                        <p className="py-2 text-xl font-semibold">Subscription Management</p>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                                        Plan
                                    </p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {subscription.plan}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                        {subscription.period}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                                        Start Date
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                                        {new Date(subscription.startDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                                        End Date
                                    </p>
                                    <p className="text-sm text-gray-900 dark:text-white font-medium">
                                        {new Date(subscription.endDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <DefaultButton
                                type="button"
                                text="Cancel Subscription"
                                loadingText="Canceling..."
                                loading={cancelLoading}
                                disabled={cancelLoading}
                                onClick={handleCancelSubscription}
                            />

                            <DefaultButton
                                type="button"
                                text="Reactivate Subscription"
                                loadingText="Reactivating..."
                                loading={reactivateLoading}
                                disabled={reactivateLoading}
                                onClick={handleReactivateSubscription}
                            />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                            * Canceling will maintain your access until the end of your current billing period
                        </p>
                    </div>
                </>
            )}
        </>
    );
};