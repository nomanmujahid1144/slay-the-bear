// src/app/(public)/(auth)/register/page.tsx

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
import type { SignupRequest } from '@/types/auth';

interface RegisterFormState extends SignupRequest {
    confirmPassword: string;
}

export default function Register() {
    const router = useRouter();

    const [form, setForm] = useState<RegisterFormState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    // Derived — always computed from latest form state, never stale
    const passwordsMatch =
        form.confirmPassword.length > 0 && form.password === form.confirmPassword;

    const confirmPasswordDirty = form.confirmPassword.length > 0;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        const isValid =
            form.firstName.length > 0 &&
            form.lastName.length > 0 &&
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.confirmPassword.length > 0 &&
            passwordsMatch;
        setDisabledButton(!isValid);
    }, [form, passwordsMatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordsMatch) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const { data } = await authService.signup({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
            });
            toast.success(data.message || 'Registered successfully! Please check your email.');
            router.push('/login');
        } catch {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthBackground>
            <AuthHeading title="Create a Secure Account" />
            <AuthSubHeading subHeading="Fill in the form below to join our platform" />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <InputField
                            required
                            id="firstName"
                            type="text"
                            value={form.firstName}
                            onChange={onChange}
                            placeholder="First Name"
                            isVisible={false}
                        />
                    </div>
                    <div className="col-md-6">
                        <InputField
                            required
                            id="lastName"
                            type="text"
                            value={form.lastName}
                            onChange={onChange}
                            placeholder="Last Name"
                            isVisible={false}
                        />
                    </div>
                </div>
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
                        // Highlight password field red when confirm has content but they don't match
                        style={
                            confirmPasswordDirty && !passwordsMatch
                                ? { borderColor: '#dc3545' }
                                : undefined
                        }
                    />
                    <InputField
                        extra="position-relative"
                        required
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={onChange}
                        placeholder="Confirm Password"
                        isVisible={true}
                        isPasswordVisible={() => setShowConfirmPassword((p) => !p)}
                        style={
                            confirmPasswordDirty
                                ? { borderColor: passwordsMatch ? '#28a745' : '#dc3545' }
                                : undefined
                        }
                    />
                    {/* Inline feedback below confirm password */}
                    {confirmPasswordDirty && (
                        <span
                            className={`mb-3 text-xs ${
                                passwordsMatch ? 'text-green-500' : 'text-red-400'
                            }`}
                        >
                            {passwordsMatch ? '✔ Passwords match' : '✘ Passwords do not match'}
                        </span>
                    )}
                </div>
                <DefaultButton
                    type="submit"
                    text="Create Account"
                    loadingText="Registering, please wait..."
                    loading={loading}
                    disabled={disabledButton || loading}
                />
                <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                    Already have an account?
                    <Link href="/login" className="d-flex py-2 text-capitalize">
                        Login
                    </Link>
                </div>
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}