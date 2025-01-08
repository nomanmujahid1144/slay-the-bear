import axiosInstance from "@/app/utils/axiosInstance";

export const checkIsLoggedInUser = async (request) => {
    try {
        const response = await axiosInstance.post('/api/users/profile');
        if (response?.data.success) {
            return { user: response.data.data }; // Return user data
        }
        return { user: null }; // Explicitly handle the failure case
    } catch (error) {
        return { error: error.message }; // Return an error object
    }
};
