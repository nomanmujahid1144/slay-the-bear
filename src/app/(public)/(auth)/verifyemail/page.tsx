// src/app/(public)/(auth)/verifyemail/page.tsx

'use client'

import { useEffect, useState } from 'react';
import { DefaultButton } from '@/app/components/buttons/Default';
import { AuthBackground } from '@/app/components/auths/AuthBackground';
import { AuthHeading } from '@/app/components/auths/AuthHeading';
import { AuthSubHeading } from '@/app/components/auths/AuthSubHeading';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from '@/utils/toast';

export default function VerifyEmail() {
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // null  = not yet read from URL (hydrating)
    // ''    = read from URL but missing
    // str   = valid token present
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setToken(params.get('token') ?? '');
    }, []);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error('Verification token is missing. Please use the link sent to your email.');
            return;
        }

        setLoading(true);
        try {
            const { data } = await authService.verifyEmail({ token });
            toast.success(data.message || 'Email verified successfully!');
            router.push('/login');
        } catch {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    // Still reading token from URL — avoid flashing the button
    if (token === null) return null;

    return (
        <AuthBackground>
            <AuthHeading title="Verify Your Email Address" />
            <AuthSubHeading subHeading="Click the button below to verify your email address and activate your account." />
            <form onSubmit={handleVerify}>
                <DefaultButton
                    type="submit"
                    text="Verify Email"
                    loadingText="Verifying, please wait..."
                    loading={loading}
                    disabled={!token || loading}
                />
                {!token && (
                    <p className="mt-3 text-sm text-red-400 text-center">
                        No verification token found. Please use the link from your email.
                    </p>
                )}
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}