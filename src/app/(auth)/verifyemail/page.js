'use client'

import { DefaultButton } from "@/app/components/Buttons/Default";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import axiosInstance from "@/app/utils/axiosInstance";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Suspense } from "react";

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const router = useRouter();


    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = searchParams.get("token");
        setToken(token || "");
    }, [searchParams])


    const verifyEmail = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (token.length > 0) {
                const response = await axiosInstance.post('/api/users/verifyemail', { token });
                setLoading(false);
                if (response.status === 200) { // Use response.status for axios instead of response.ok
                    toast.success('Verified Successfully')
                    router.push('/login');
                } else {
                    toast.error(response.data.message);
                }
            } else {
                setLoading(false);
                toast.error("Token Does not Exists");
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    return (
        <Suspense>
            <AuthBackground>
                <AuthHeading
                    title={'Verify Your Email Address'}
                />
                <AuthSubHeading
                    subHeading={'Click the button below to verify your email address and activate your account.'}
                />
                <form onSubmit={verifyEmail}>
                    <DefaultButton
                        type={'submit'}
                        text={'Verify Email'}
                        loadingText={'Verifying, please wait...'}
                        loading={loading}
                    />
                </form>
                <p className="ajax-response mb-0" />
            </AuthBackground>
        </Suspense>
    )
}