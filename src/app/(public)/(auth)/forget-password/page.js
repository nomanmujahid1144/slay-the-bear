'use client'

import { useEffect, useState } from "react";
import InputField from "@/app/components/fields/Input";
import { DefaultButton } from "@/app/components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import { authService } from '@/services/auth.service';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {

    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await authService.forgotPassword(credentials);
            toast.success(data.message || 'Reset link sent to your email!');
            router.push('/');
        } catch (error) {
            // Error already handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (credentials.email.length > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true)
        }
    }, [credentials])

    return (
        <AuthBackground>
            <AuthHeading
                title={'Forget Password'}
            />
            <AuthSubHeading
                subHeading={'Enter email to forget your Password'}
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
                </div>
                <DefaultButton
                    type={'submit'}
                    text={'Send Email'}
                    loadingText={'Processed'}
                    loading={loading}
                    disabled={disabledButton || loading}
                />
                <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                    I remember my Password
                    <Link href={'/login'} className="d-flex py-2 text-capitalize">
                        Login
                    </Link>
                </div>
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}