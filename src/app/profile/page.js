'use client'

import { useEffect, useState } from "react";
import { DefaultButton } from "../components/Buttons/Default";
import InputField from "../components/fields/Input";
import { useRouter } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import LoadingAnimation from '../../../public/assets/animation/loading.json';

export default function Profile() {

    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [loading, setLoading] = useState(false);
    const [credentials, setcredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleUpdateUserDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/users/update-user', credentials);
            if (response.status == 200) {
                toast.success('Updated Successfully')
                window.location.reload();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message)
        }
    }

    const getUserData = async () => {
        const response = await axiosInstance.post('/api/users/profile');
        if (response.data.success) {
            setData(response.data.data)
            setcredentials({
                firstName: response.data.data.firstName,
                lastName: response.data.data.lastName,
                email: response.data.data.email,
            })
        } else {
            setData("nothing")
            setcredentials({
                firstName: "",
                lastName: "",
                email: ""
            })
        }
    }

    useEffect(() => {
        getUserData();
    }, [])


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Function to toggle password visibility
    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleRecoverPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (data) {
                const response = await axiosInstance.post('/api/users/forget-password', { email: data.email });
                if (response.data.success) {
                    setLoading(false);
                    toast.success(response.data.message)
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message)
        }
    }

    return (
        <div className="mx-4 min-h-screen blog-details-inner-content max-w-screen-xl sm:mx-8 xl:mx-auto">
            <h1 className="title-two font-bold !text-4xl border-b py-6">Settings</h1>
            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                <div className="relative my-4 w-56 sm:hidden">
                    <input
                        className="peer hidden"
                        type="checkbox"
                        name="select-1"
                        id="select-1"
                    />
                    <label
                        htmlFor="select-1"
                        className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
                    >
                        Accounts{" "}
                    </label>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                            Accounts
                        </li>
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                            Team
                        </li>
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">
                            Others
                        </li>
                    </ul>
                </div>
                <div className="col-span-2 hidden sm:block">
                    <ul>
                        <li className="mt-5 cursor-pointer border-l-2 border-l-primary px-2 py-2 font-semibold !text-primary transition hover:!border-l-secondary hover:!text-secondary">
                            Accounts
                        </li>
                    </ul>
                </div>
                <div className="col-span-8 overflow-hidden rounded-xl contact-area sm:px-8 sm:shadow pb-10">
                    <div className="pt-4">
                        <h1 className="py-2 text-2xl font-semibold">Profile settings</h1>
                        {/* <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
                    </div>
                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold">Email Address</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600">
                            Your email address is <strong className="lowercase">{data === 'nothing' ? "" : data.email}</strong>
                        </p>
                    </div>
                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold">Edit personal details</p>
                    <div className="space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <form onSubmit={handleUpdateUserDetails}>
                            <div className="row !flex w-full">
                                <div className="w-2/4 py-1">
                                    <InputField
                                        extra="position-relative w-full !rounded !border !border-[#D6D6D6] !bg-white !text-sm !font-medium !text-secondary !py-3 !px-4 !h-12 !block"
                                        required={true}
                                        label="First Name"
                                        id="firstName"
                                        type="text"
                                        value={credentials.firstName}
                                        onChange={onChange}
                                        placeholder="First Name"
                                        isVisible={false}
                                    />
                                </div>
                                <div className="w-2/4 py-1">
                                    <InputField
                                        extra="position-relative w-full !rounded !border !border-[#D6D6D6] !bg-white !text-sm !font-medium !text-secondary !py-3 !px-4 !h-12 !block"
                                        required={true}
                                        label="Last Name"
                                        id="lastName"
                                        type="text"
                                        value={credentials.lastName}
                                        onChange={onChange}
                                        placeholder="Last Name"
                                        isVisible={false}
                                    />
                                </div>
                                <div className="w-2/4 py-1">
                                    <InputField
                                        extra="position-relative w-full !rounded !border !border-[#D6D6D6] !bg-white !text-sm !font-medium !text-secondary !py-3 !px-4 !h-12 !block"
                                        required={true}
                                        label="Email"
                                        id="email"
                                        type="email"
                                        value={credentials.email}
                                        onChange={onChange}
                                        placeholder="Email address"
                                        isVisible={false}
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-4 flex justify-center">
                                <div className="w-1/4">
                                    <DefaultButton
                                        type={'submit'}
                                        text={'Update Details'}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <p className="pt-7 ">
                        Can&apos;t remember your current password.{" "}
                        <span
                            onClick={handleRecoverPassword}
                            className="text-sm inline-block font-semibold !text-primary hover:!text-secondary cursor-pointer underline decoration-2"
                        >
                            {loading ? (
                                <span className="flex justify-between gap-1 items-center">
                                    Sending Email
                                    <div className="w-7 h-7">
                                        <Lottie animationData={LoadingAnimation} loop={true} />
                                    </div>
                                </span>
                            ) : ("Recover Password")}
                        </span>
                    </p>
                    {/* <hr className="mt-4 mb-8" /> */}
                    {/* <div className="mb-10">
                        <p className="py-2 text-xl font-semibold">Delete Account</p>
                        <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Proceed with caution
                        </p>
                        <p className="mt-2">
                            Make sure you have taken backup of your account in case you ever need
                            to get access to your data. We will completely wipe your data. There
                            is no way to access your account after this action.
                        </p>
                        <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
                            Continue with deletion
                        </button>
                    </div> */}
                </div>
            </div>
        </div>

    )
}