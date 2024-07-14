'use client'

import { useState } from "react";
import InputField from "../components/fields/Input";
import { DefaultButton } from "../components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "../components/Auths/AuthBackground";
import { AuthHeading } from "../components/Auths/AuthHeading";
import { AuthSubHeading } from "../components/Auths/AuthSubHeading";

export default function Login() {

    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        console.log(email, password)
    };
    
    

    // Function to toggle password visibility
    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
            <AuthBackground>
                <AuthHeading
                    title={'Sign In'}
            />
                <AuthSubHeading
                    subHeading={'Sign In to your account'}
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
                        text={'Login'}
                    />
                    <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                        Do you have an account?
                        <Link href={'/register'} className="d-flex py-2 text-capitalize">
                            Sign Up
                        </Link>
                    </div>
                </form>
                <p className="ajax-response mb-0" />
            </AuthBackground>
    );
}
