'use client'

import { useEffect, useState } from "react";
import InputField from "@/app/components/fields/Input";
import { DefaultButton } from "@/app/components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from "@/app/utils/axiosInstance";
import toast from "react-hot-toast";
import { checkIsLoggedInUser } from "@/helpers/checkLoggedInUser";

import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import NotFoundAnimation from '../../../../public/assets/animation/not-found.json';
import { Goto } from "@/app/components/Buttons/Goto";
import { Suspense } from 'react'

export default function Login() {
    const searchParams = useSearchParams();
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

    // Handle input changes
    const onChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [id]: value }));

        // Check password match dynamically when confirmPassword changes
        if (id === "confirmPassword") {
            if (value === credentials.password) {
                setPasswordMatch(true); // Passwords match
            } else {
                setPasswordMatch(false); // Passwords do not match
            }
        }
    };

    const isPasswordValid = () => {
        return credentials.password === credentials.confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Final check for password match
            if (!isPasswordValid()) {
                toast.error("Passwords do not match");
                return;
            }

            const bodyObject = {
                password: credentials.password,
                confirmPassword: credentials.confirmPassword,
                userId: userId
            }

            const response = await axiosInstance.post('/api/users/change-password', bodyObject);

            if (response.status === 200) { // Use response.status for axios instead of response.ok
                toast.success('Password Changes Successfully');
                setLoading(false);
                router.push('/login');
            } else {
                setLoading(false);
                toast.error(response.data.message)
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message)
        }
    };

    useEffect(() => {
        if (credentials.password.length > 0 && credentials.confirmPassword.length > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true)
        }
    }, [credentials])

    useEffect(() => {
        const token = searchParams.get("token");
        const id = searchParams.get("id");
        setToken(token || "");
        setUserId(id || "");
    }, [searchParams])

    // const checkTokenIsValid = async () => {
    //     try {
    //         const response = await axiosInstance.post('/api/users/verify-reset-password', { token });
    //         console.log(response, 'response.data')

    //     } catch (error) {
    //         console.log(error, 'Error')
    //         setIsTokenValid(error.response.data.message);
    //     }
    // }

    // useEffect(() => {
    //     if (token.length > 0) {
    //         checkTokenIsValid();
    //     }
    // }, [token])


    // Function to toggle password visibility
    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Function to toggle confirm password visibility
    const handleConfirmPasswordVisible = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
                                        ? "text-green-500" // Green if passwords match
                                        : "text-red-400" // Red if passwords do not match
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
                            text={'Update Password'}
                            loadingText={'Please wait, updating password...'}
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
            )
            }
        </Suspense>
    );
}
