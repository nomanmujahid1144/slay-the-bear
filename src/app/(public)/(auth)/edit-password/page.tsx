// src/app/(public)/(auth)/edit-password/page.tsx

'use client'

import { useEffect, useState } from 'react';
import InputField from '@/app/components/fields/Input';
import { DefaultButton } from '@/app/components/buttons/Default';
import Link from 'next/link';
import { AuthBackground } from '@/app/components/auths/AuthBackground';
import { AuthHeading } from '@/app/components/auths/AuthHeading';
import { AuthSubHeading } from '@/app/components/auths/AuthSubHeading';
import { authService } from '@/services/auth.service';
import { toast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Goto } from '@/app/components/buttons/Goto';
import NotFoundAnimation from '../../../../../public/assets/animation/not-found.json';
import type { ChangePasswordRequest } from '@/types/auth';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface EditPasswordForm {
    password: string;
    confirmPassword: string;
}

export default function EditPassword() {
    const router = useRouter();

    const [form, setForm] = useState<EditPasswordForm>({
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // null = still hydrating
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // Derived — always in sync with latest form values
    const confirmDirty = form.confirmPassword.length > 0;
    const passwordsMatch = confirmDirty && form.password === form.confirmPassword;
    const isFormValid =
        form.password.length > 0 &&
        form.confirmPassword.length > 0 &&
        passwordsMatch;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setToken(params.get('token') ?? '');
        setUserId(params.get('id') ?? '');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordsMatch) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const payload: ChangePasswordRequest = {
                userId: userId!,
                password: form.password,
            };
            const { data } = await authService.changePassword(payload);
            toast.success(data.message || 'Password changed successfully!');
            router.push('/login');
        } catch {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    // Still hydrating from URL
    if (token === null || userId === null) return null;

    // Invalid/missing token or userId — show 404 state
    if (!token || !userId) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
                <Lottie className="w-28" animationData={NotFoundAnimation} loop={true} />
                <p className="text-center text-sm text-gray-500 max-w-sm">
                    This reset link is invalid or has expired. Please request a new password reset.
                </p>
                <Goto buttonText="Back to Home" goTo="/" />
            </div>
        );
    }

    return (
        <AuthBackground>
            <AuthHeading title="Set New Password" />
            <AuthSubHeading subHeading="Please enter your new password and confirm it below." />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <InputField
                        extra="position-relative"
                        label="New Password"
                        required
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={onChange}
                        placeholder="New Password"
                        isVisible={true}
                        isPasswordVisible={() => setShowPassword((p) => !p)}
                        style={
                            confirmDirty && !passwordsMatch
                                ? { borderColor: '#dc3545' }
                                : undefined
                        }
                    />
                    <InputField
                        extra="position-relative"
                        label="Confirm Password"
                        required
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={onChange}
                        placeholder="Confirm New Password"
                        isVisible={true}
                        isPasswordVisible={() => setShowConfirmPassword((p) => !p)}
                        style={
                            confirmDirty
                                ? { borderColor: passwordsMatch ? '#28a745' : '#dc3545' }
                                : undefined
                        }
                    />
                    {confirmDirty && (
                        <span className={`mb-3 text-xs ${passwordsMatch ? 'text-green-500' : 'text-red-400'}`}>
                            {passwordsMatch ? '✔ Passwords match' : '✘ Passwords do not match'}
                        </span>
                    )}
                </div>
                <DefaultButton
                    type="submit"
                    text="Change Password"
                    loadingText="Changing, please wait..."
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