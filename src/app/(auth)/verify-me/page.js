'use client'

import { DefaultButton } from "@/app/components/Buttons/Default";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import axiosInstance from "@/app/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyMe() {
    const searchParams = useSearchParams();
    const router = useRouter();


    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = searchParams.get("token");
        setToken(token || "");
    })


    const verifyForgetToken = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if(token.length > 0){
                const response = await axiosInstance.post('/api/users/verify-reset-password', {token});
                setLoading(false);
                console.log(response, 'response')
                if (response.status === 200) { // Use response.status for axios instead of response.ok
                    router.push(`/edit-password?token=${token}&id=${response.data?.user?._id}`);
                } else {
                    toast.error(response.data.message);
                }
            }else{
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