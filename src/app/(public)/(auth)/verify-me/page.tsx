// src/app/(public)/(auth)/verify-me/page.tsx

'use client'

import { useEffect, useState } from 'react';
import { DefaultButton } from '@/app/components/buttons/Default';
import { AuthBackground } from '@/app/components/auths/AuthBackground';
import { AuthHeading } from '@/app/components/auths/AuthHeading';
import { AuthSubHeading } from '@/app/components/auths/AuthSubHeading';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from '@/utils/toast';

export default function VerifyMe() {
    const router = useRouter();

    // null = still hydrating, '' = missing, string = valid
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
            const { data } = await authService.verifyResetToken({ token });
            toast.success(data.message || 'Identity verified!');
            // Pass token + userId to edit-password page
            router.push(`/edit-password?token=${token}&id=${data.data?.user.id}`);
        } catch {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    // Still reading token from URL
    if (token === null) return null;

    return (
        <AuthBackground>
            <AuthHeading title="Verify Your Identity to Proceed" />
            <AuthSubHeading subHeading="Click the button below to confirm your identity and continue with resetting your password." />
            <form onSubmit={handleVerify}>
                <DefaultButton
                    type="submit"
                    text="Create New Password"
                    loadingText="Verifying, please wait..."
                    loading={loading}
                    disabled={!token || loading}
                />
                {!token && (
                    <p className="mt-3 text-sm text-red-400 text-center">
                        No reset token found. Please use the link from your email.
                    </p>
                )}
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}