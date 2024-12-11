'use client'

import { useState } from "react";
import { DefaultButton } from "../components/Buttons/Default";
import InputField from "../components/fields/Input";

export default function Profile() {

    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Function to toggle password visibility
    const handlePasswordVisible = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

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
                <div className="col-span-8 overflow-hidden rounded-xl contact-area sm:px-8 sm:shadow">
                    <div className="pt-4">
                        <h1 className="py-2 text-2xl font-semibold">Profile settings</h1>
                        {/* <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
                    </div>
                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold">Email Address</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-gray-600">
                            Your email address is <strong>john.doe@company.com</strong>
                        </p>
                        <button className="inline-flex text-sm font-semibold !text-secondary underline decoration-2">
                            Change
                        </button>
                    </div>
                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold">Password</p>
                    <div className="space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <form>
                            <div className="row !flex w-full">
                                <div className="w-2/4">
                                    <InputField
                                        extra="position-relative w-full !rounded !border !border-[#D6D6D6] !bg-white !text-sm !font-medium !text-secondary !py-3 !px-4 !h-12 !block"
                                        label="Current Password"
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
                                <div className="w-2/4">
                                    <InputField
                                        extra="position-relative w-full !rounded !border !border-[#D6D6D6] !bg-white !text-sm !font-medium !text-secondary !py-3 !px-4 !h-12 !block"
                                        label="Current Password"
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
                            </div>
                        </form>
                    </div>
                    <p className="mt-2">
                        Can&apos;t remember your current password.{" "}
                        <a
                            className="text-sm font-semibold text-blue-600 underline decoration-2"
                            href="#"
                        >
                            Recover Account
                        </a>
                    </p>
                    <DefaultButton
                        extras={'!w-full md:!w-1/4'}
                        type={'submit'}
                        text={'Save Password'}
                    />
                    <hr className="mt-4 mb-8" />
                    <div className="mb-10">
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
                    </div>
                </div>
            </div>
        </div>

    )
}