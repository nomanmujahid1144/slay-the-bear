'use client'

import { useEffect, useState } from "react";
import InputField from "@/app/components/fields/Input";
import { DefaultButton } from "@/app/components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import axiosInstance from "@/app/utils/axiosInstance";
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
        try {
            setLoading(true);
            const response = await axiosInstance.post('/api/users/forget-password', credentials);
            if (response.data.success) {
                toast.success(response.data.message)
                router.push('/')
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message)
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
