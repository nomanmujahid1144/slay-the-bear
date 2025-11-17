'use client'

import { useEffect, useState } from "react";
import InputField from "@/app/components/fields/Input";
import { DefaultButton } from "@/app/components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import toast from "react-hot-toast";

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import NotFoundAnimation from '../../../../../public/assets/animation/not-found.json';
import { Goto } from "@/app/components/Buttons/Goto";

export default function EditPassword() {
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        password: "",
        confirmPassword: ""
    });
    const [disabledButton, setDisabledButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(null);

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');

    const onChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));

        if (id === "confirmPassword") {
            setPasswordMatch(value === credentials.password && value.length > 0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const { data } = await authService.changePassword({
                userId,
                password: credentials.password,
                confirmPassword: credentials.confirmPassword
            });

            toast.success(data.message || 'Password changed successfully!');
            router.push('/login');
        } catch (error) {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isValid = credentials.password.length > 0 &&
            credentials.confirmPassword.length > 0 &&
            passwordMatch;
        setDisabledButton(!isValid);
    }, [credentials, passwordMatch])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const id = params.get("id");
        setToken(token || "");
        setUserId(id || "");
    }, [])

    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleConfirmPasswordVisible = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <>
            {(token.length > 0 && userId.length > 0) ? (
                <AuthBackground>
                    <AuthHeading
                        title={'Edit Your Password'}
                    />
                    <AuthSubHeading
                        subHeading={'Please enter your new password and confirm it below.'}
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="row">
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
                            <InputField
                                extra="position-relative"
                                label="Confirm Password"
                                required={true}
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={credentials.confirmPassword}
                                onChange={onChange}
                                placeholder="Confirm Password"
                                isVisible={true}
                                isPasswordVisible={handleConfirmPasswordVisible}
                            />
                            {credentials.confirmPassword.length > 0 && (
                                <span
                                    className={`mb-4 text-right text-xs ${passwordMatch
                                        ? "text-green-500"
                                        : "text-red-400"
                                        }`}
                                >
                                    {passwordMatch
                                        ? "Passwords match ✔"
                                        : "Passwords do not match ✘"}
                                </span>
                            )}
                        </div>
                        <DefaultButton
                            type={'submit'}
                            text={'Change Password'}
                            loadingText={'Changing, please wait...'}
                            loading={loading}
                            disabled={disabledButton || loading}
                        />
                        <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                            Remember your password?
                            <Link href={'/login'} className="d-flex py-2 text-capitalize">
                                Login
                            </Link>
                        </div>
                    </form>
                    <p className="ajax-response mb-0" />
                </AuthBackground>
            ) : (
                <>
                    <div className="w-full h-screen flex flex-col justify-center items-center">
                        <Lottie className="w-28" animationData={NotFoundAnimation} loop={true} />
                        <p>Token Does not exisits, go back to home and try to re-set password again! Thanks</p>
                        <div className="mt-4">
                            <Goto
                                buttonText="Go back to home"
                                goTo={'/'}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}