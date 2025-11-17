'use client'

import { useEffect, useState, Suspense } from "react";
import InputField from "@/app/components/fields/Input";
import { DefaultButton } from "@/app/components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import toast from "react-hot-toast";

function LoginComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect_url = searchParams.get("redirect_url");
    const login = useAuthStore((state) => state.login);
    
    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    });
    const [disabledButton, setDisabledButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(credentials);
            toast.success('Logged in successfully!');
            router.push(redirect_url || '/');
        } catch (error) {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (credentials.email.length > 0 && credentials.password.length > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true)
        }
    }, [credentials])

    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <AuthBackground>
            <AuthHeading
                title={'Welcome Back, Please Sign In'}
            />
            <AuthSubHeading
                subHeading={'Enter your credentials to log in to your account.'}
            />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <InputField
                        required={true}
                        id="email"
                        type="email"
                        value={credentials.email}
                        onChange={onChange}
                        placeholder="Email"
                        isVisible={false}
                    />
                    <InputField
                        extra="position-relative"
                        label="Password"
                        required={true}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={onChange}
                        placeholder="Password"
                        isVisible={true}
                        isPasswordVisible={handlePasswordVisible}
                    />
                </div>
                <Link href={'/forget-password'} className="d-flex py-2">
                    Forget Password?
                </Link>
                <DefaultButton
                    type={'submit'}
                    text={'Sign In'}
                    loadingText={'Authenticating, please wait...'}
                    loading={loading}
                    disabled={disabledButton || loading}
                />
                <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                    Don&apos;t have an account?
                    <Link href={'/register'} className="d-flex py-2 text-capitalize">
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