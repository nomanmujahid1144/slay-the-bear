// src/app/(public)/(auth)/forget-password/page.tsx

'use client'

import { useState } from 'react';
import InputField from '@/app/components/fields/Input';
import { DefaultButton } from '@/app/components/buttons/Default';
import Link from 'next/link';
import { AuthBackground } from '@/app/components/auths/AuthBackground';
import { AuthHeading } from '@/app/components/auths/AuthHeading';
import { AuthSubHeading } from '@/app/components/auths/AuthSubHeading';
import { authService } from '@/services/auth.service';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import type { ForgotPasswordRequest } from '@/types/auth';

export default function ForgetPassword() {
    const router = useRouter();

    const [form, setForm] = useState<ForgotPasswordRequest>({ email: '' });
    const [loading, setLoading] = useState(false);

    // Derived — no useEffect or disabledButton state needed
    const isFormValid = form.email.length > 0;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await authService.forgotPassword(form);
            toast.success(data.message || 'Reset link sent to your email!');
            router.push('/login');
        } catch {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthBackground>
            <AuthHeading title="Forgot Password?" />
            <AuthSubHeading subHeading="Enter your email address and we'll send you a link to reset your password." />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <InputField
                        required
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="Email address"
                        isVisible={false}
                    />
                </div>
                <DefaultButton
                    type="submit"
                    text="Send Reset Link"
                    loadingText="Sending, please wait..."
                    loading={loading}
                    disabled={!isFormValid || loading}
                />
                <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                    Remember your password?
                    <Link href="/login" className="d-flex py-2 text-capitalize">
                        Back to Login
                    </Link>
                </div>
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}