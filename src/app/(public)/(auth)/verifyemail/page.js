'use client'

import { DefaultButton } from "@/app/components/Buttons/Default";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import { authService } from '@/services/auth.service';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmail() {
    const router = useRouter();

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        setToken(token || "");
    }, [])

    const verifyEmail = async (e) => {
        e.preventDefault();
        
        if (!token) {
            toast.error("Token does not exist");
            return;
        }

        setLoading(true);

        try {
            const { data } = await authService.verifyEmail({ token });
            toast.success(data.message || 'Email verified successfully!');
            router.push('/login');
        } catch (error) {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    return (
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
    )
}