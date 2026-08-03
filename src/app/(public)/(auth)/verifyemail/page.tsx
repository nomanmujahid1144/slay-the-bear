// src/app/(public)/(auth)/verifyemail/page.tsx

'use client'

import { Suspense, useEffect, useState } from 'react';
import OTPInput from '@/app/components/fields/OTPInput';
import { DefaultButton } from '@/app/components/buttons/Default';
import { AuthBackground } from '@/app/components/auths/AuthBackground';
import { AuthHeading } from '@/app/components/auths/AuthHeading';
import { AuthSubHeading } from '@/app/components/auths/AuthSubHeading';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from '@/utils/toast';
import Link from 'next/link';
import { LoadingRotating } from '@/app/components/loader/LoadingRotating';

const RESEND_COOLDOWN_SECONDS = 60;

// Mask email for display: nomanmujahid@gmail.com → no•••••••@gmail.com
const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const visible = local.slice(0, 2).toLowerCase();
    return `${visible}${'•'.repeat(Math.max(local.length - 2, 3))}@${domain.toLowerCase()}`;
};

function VerifyEmailComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setUser = useAuthStore((state) => state.setUser);

    const email = searchParams.get('email') ?? '';
    // sent=true → arrived right after signup, code just sent → start cooldown
    const justSent = searchParams.get('sent') === 'true';

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [cooldown, setCooldown] = useState(justSent ? RESEND_COOLDOWN_SECONDS : 0);

    // Derived — 6-digit numeric code required
    const isOtpValid = /^\d{6}$/.test(otp);

    // No email in URL — can't verify anyone, send back to login
    useEffect(() => {
        if (!email) {
            router.replace('/login');
        }
    }, [email, router]);

    // Resend cooldown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const submitVerification = async () => {
        if (!isOtpValid || loading) return;

        setLoading(true);
        try {
            const { data } = await authService.verifyEmail({ email, otp });
            // Auto sign-in — cookies are set by the server, hydrate the store
            if (data.data?.user) {
                setUser(data.data.user);
            }
            toast.success(data.message || 'Email verified successfully!');
            router.push('/');
        } catch {
            // Error already handled by errorHandler — clear boxes, OTPInput refocuses first box
            setOtp('');
        } finally {
            setLoading(false);
        }
    };

    // Auto-submit the moment the 6th digit lands (typed or pasted)
    useEffect(() => {
        if (isOtpValid && !loading) {
            submitVerification();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isOtpValid) {
            toast.error('Please enter the 6-digit code sent to your email');
            return;
        }

        await submitVerification();
    };

    const handleResend = async () => {
        if (cooldown > 0 || resending) return;

        setResending(true);
        try {
            const { data } = await authService.resendOTP({ email });
            toast.success(data.message || 'A new code has been sent to your email');
            setOtp('');
            setCooldown(RESEND_COOLDOWN_SECONDS);
        } catch {
            // Error already handled by errorHandler
        } finally {
            setResending(false);
        }
    };

    if (!email) return null;

    return (
        <AuthBackground>
            <AuthHeading title="Check Your Email" />
            <AuthSubHeading className='normal-case' subHeading={`We sent a 6-digit code to ${maskEmail(email)}. Enter it below to activate your account.`} />
            <form onSubmit={handleVerify}>
                <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                <p className="text-center text-sm mb-3" style={{ opacity: 0.7 }}>
                    Can&apos;t find it? Check your spam folder.
                </p>
                <DefaultButton
                    type="submit"
                    text="Verify Email"
                    loadingText="Verifying, please wait..."
                    loading={loading}
                    disabled={!isOtpValid || loading}
                />
                <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                    Didn&apos;t receive the code?
                    {resending ? (
                        <span className="d-flex py-2 text-capitalize">
                            <LoadingRotating key={2} />
                        </span>
                    ) : cooldown > 0 ? (
                        <span className="d-flex py-2 text-sm text-capitalize">Resend in {cooldown}s</span>
                    ) : (
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleResend();
                            }}
                            className="d-flex py-2 text-capitalize"
                        >
                            Resend Code
                        </Link>
                    )}
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    Wrong email?
                    <Link href="/register" className="d-flex py-2">
                        Sign Up Again
                    </Link>
                </div>
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailComponent />
        </Suspense>
    );
}