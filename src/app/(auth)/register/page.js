'use client'

import { useEffect, useState } from "react";
import InputField from "@/app/components/fields/Input";
import { DefaultButton } from "@/app/components/Buttons/Default";
import Link from "next/link";
import { AuthBackground } from "@/app/components/Auths/AuthBackground";
import { AuthHeading } from "@/app/components/Auths/AuthHeading";
import { AuthSubHeading } from "@/app/components/Auths/AuthSubHeading";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TermAndConditionTxt } from "@/app/components/Auths/TermAndConditionTxt";

export default function Register() {

    const router = useRouter();

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [disabledButton, setDisabledButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(null);

    // const onChange = (e) => {
    //     setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final check for password match
        if (credentials.password !== credentials.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.post('/api/users/signup', credentials);

            if (response.status == 200) {
                toast.success('Sign up successfully')
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
        if (credentials.firstName.length > 0 && credentials.lastName.length > 0 && credentials.email.length > 0 && credentials.password.length > 0 && credentials.confirmPassword.length > 0) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true)
        }
    }, [credentials])

    
    // Function to toggle password visibility
    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    // Function to toggle confirm password visibility
    const handleConfirmPasswordVisible = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <AuthBackground>
            <AuthHeading
                title={'Create a Secure Account'}
            />
            <AuthSubHeading
                subHeading={'Fill in the form below to join our platform'}
            />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <InputField
                        required={true}
                        id="firstName"
                        type="text"
                        value={credentials.firstName}
                        onChange={onChange}
                        placeholder="First Name"
                        isVisible={false}
                    />
                    <InputField
                        required={true}
                        id="lastName"
                        type="text"
                        value={credentials.lastName}
                        onChange={onChange}
                        placeholder="Last Name"
                        isVisible={false}
                    />
                    <InputField
                        required={true}
                        id="email"
                        type="email"
                        value={credentials.email}
                        onChange={onChange}
                        placeholder="Email address"
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
                    <InputField
                        extra="position-relative"
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
                    text={'Create Account'}
                    loadingText={'Registering, please wait...'}
                    loading={loading}
                    disabled={disabledButton || loading}
                />
                <div className="d-flex gap-2 align-items-center justify-content-center pt-3">
                    Already have an Account
                    <Link href={'/login'} className="d-flex py-2 text-capitalize">
                        Login
                    </Link>
                </div>
                <TermAndConditionTxt 
                    text={'signing up'}
                />
            </form>
            <p className="ajax-response mb-0" />
        </AuthBackground>
    );
}
