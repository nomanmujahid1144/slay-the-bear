'use client'

import { useState } from "react";
import InputField from "../components/fields/Input";
import { DefaultButton } from "../components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "../components/Auths/AuthBackground";
import { AuthHeading } from "../components/Auths/AuthHeading";
import { AuthSubHeading } from "../components/Auths/AuthSubHeading";

export default function Register() {

    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        console.log(name, email, password)
    };
    
    

    // Function to toggle password visibility
    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
            <AuthBackground>
                <AuthHeading
                    title={'Sign Up'}
            />
                <AuthSubHeading
                    subHeading={'Sign Up to your account'}
                />
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <InputField 
                            required={true}
                            id="name"
                            type="text"
                            value={credentials.name}
                            onChange={onChange}
                            placeholder="Name"
                            isVisible={false}
                        />
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
                    <DefaultButton
                        type={'submit'}
                        text={'Sign Up'}
                    />
                    <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                        Already have an Account
                        <Link href={'/login'} className="d-flex py-2 text-capitalize">
                            Login
                        </Link>
                    </div>
                </form>
                <p className="ajax-response mb-0" />
            </AuthBackground>
    );
}
