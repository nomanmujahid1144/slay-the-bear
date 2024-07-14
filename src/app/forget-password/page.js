'use client'

import { useState } from "react";
import InputField from "../components/fields/Input";
import { DefaultButton } from "../components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "../components/Auths/AuthBackground";
import { AuthHeading } from "../components/Auths/AuthHeading";
import { AuthSubHeading } from "../components/Auths/AuthSubHeading";

export default function ForgetPassword() {

    const [credentials, setcredentials] = useState({
        email: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email} = credentials;
        console.log(email)
    };
    
    

    // Function to toggle password visibility
    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

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
