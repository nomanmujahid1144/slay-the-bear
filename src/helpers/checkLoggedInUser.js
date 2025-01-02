import axiosInstance from "@/app/utils/axiosInstance"

export const checkIsLoggedInUser = async (request) => {
    try {
        const response = await axiosInstance.post('/api/users/profile');
        if (response?.data.success) {
            return response.data
        }
    } catch (error) {
        return error.message
    }
}