import { srcFileAlphaVantage } from "@/app/utils/alphaVantageSrcFile";
import axiosInstance from "./axiosInstance";

export const formatTimeInMinutes = (timeStr) => {
    const hour = parseInt(timeStr.substring(9, 11), 10);
    const minute = parseInt(timeStr.substring(11, 13), 10);
    const minutesSinceMidnight = hour * 60 + minute; // Calculate total minutes
    return `${minutesSinceMidnight} Mins`;
};

// Function to format date
export const formatDate = (dateStr) => {
    const year = dateStr.substring(0, 4);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Month is zero-based
    const day = dateStr.substring(6, 8);

    const date = new Date(year, month, day);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const fetchNews = async (category, query) => {
    try {
        const url = `${srcFileAlphaVantage.latestNews}&${query}&apikey=${process.env.alphaVantageStockApi}`;

        const response = await axiosInstance.get(url);
        return response.data.feed; // Return the feed to handle it elsewhere
    } catch (error) {
        console.error(`Error fetching news for ${category}:`, error.message);
        return null; // Return null in case of error to handle gracefully
    }
};