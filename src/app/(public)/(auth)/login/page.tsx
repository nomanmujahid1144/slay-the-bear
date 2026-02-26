// src/app/(public)/(auth)/login/page.tsx

'use client'

import { Suspense, useEffect, useState } from 'react';
import InputField from '@/app/components/fields/Input';
import { DefaultButton } from '@/app/components/buttons/Default';
import Link from 'next/link';
import { AuthBackground } from '@/app/components/auths/AuthBackground';
import { AuthHeading } from '@/app/components/auths/AuthHeading';
import { AuthSubHeading } from '@/app/components/auths/AuthSubHeading';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { toast } from '@/utils/toast';
import type { LoginRequest } from '@/types/auth';

function LoginComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect_url');
    const login = useAuthStore((state) => state.login);

    const [form, setForm] = useState<LoginRequest>({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Derived — no need for separate disabledButton state
    const isFormValid = form.email.length > 0 && form.password.length > 0;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form);
            toast.success('Logged in successfully!');
            router.push(redirectUrl ?? '/');
        } catch {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthBackground>
            <AuthHeading title="Welcome Back, Please Sign In" />
            <AuthSubHeading subHeading="Enter your credentials to log in to your account." />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <InputField
                        required
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="Email"
                        isVisible={false}
                    />
                    <InputField
                        extra="position-relative"
                        label="Password"
                        required
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={onChange}
                        placeholder="Password"
                        isVisible={true}
                        isPasswordVisible={() => setShowPassword((p) => !p)}
                    />
                </div>
                <Link href="/forget-password" className="d-flex py-2">
                    Forgot Password?
                </Link>
                <DefaultButton
                    type="submit"
                    text="Sign In"
                    loadingText="Authenticating, please wait..."
                    loading={loading}
                    disabled={!isFormValid || loading}
                />
                <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                    Don&apos;t have an account?
                    <Link href="/register" className="d-flex py-2 text-capitalize">
                        Sign Up
                    </Link>
                </div>
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginComponent />
        </Suspense>
    );
}