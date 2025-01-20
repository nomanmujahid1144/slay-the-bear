'use client'

import { useEffect, useState } from "react";
import { DefaultButton } from "../../components/Buttons/Default";
import InputField from "../../components/fields/Input";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { LoaderCircleIcon } from "../Loader/LoadingCircle";
// import InputField from '../fields/Input';

export const Accounts = () => {

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
        <>
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
                            <div className="w-5 h-5 flex">
                                <LoaderCircleIcon />
                            </div>
                        </span>
                    ) : ("Recover Password")}
                </span>
            </p>
        </>
    )
}