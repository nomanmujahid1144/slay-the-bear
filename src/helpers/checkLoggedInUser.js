import axiosInstance from "@/app/utils/axiosInstance"
import { NextResponse } from "next/server";

export const checkIsLoggedInUser = async (request) => {
    try {
        console.log(NextResponse.cookies, 'NextResponse.cookies')
        const response = await axiosInstance.post('/api/users/profile');
        console.log(response, 'response')
        if (response?.data.success) {
            return response.data
        }
    } catch (error) {
        return error.message
    }
}