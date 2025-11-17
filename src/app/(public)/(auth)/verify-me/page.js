// src/app/(public)/verify-me/page.js - REPLACE

'use client'

import { DefaultButton } from "@/app/components/Buttons/Default";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import { authService } from '@/services/auth.service';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyMe() {
    const router = useRouter();

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        setToken(token || "");
    }, [])

    const verifyForgetToken = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Token does not exist");
            return;
        }

        setLoading(true);

        try {
            const { data } = await authService.verifyResetToken({ token });
            toast.success(data.message || 'Token verified!');
            router.push(`/edit-password?token=${token}&id=${data.data.user.id}`);
        } catch (error) {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthBackground>
            <AuthHeading
                title={'Verify Your Identity to Proceed'}
            />
            <AuthSubHeading
                subHeading={'Click the button below to confirm your identity and continue with resetting your password.'}
            />
            <form onSubmit={verifyForgetToken}>
                <DefaultButton
                    type={'submit'}
                    text={'Create New Password'}
                    loadingText={'Verifying, please wait...'}
                    loading={loading}
                />
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    )
}