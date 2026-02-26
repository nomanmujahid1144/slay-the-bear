// src/app/utils/extrasFunctions.ts

import { srcFileAlphaVantage } from "@/app/utils/alphaVantageSrcFile";
import axiosInstance from "@/utils/axiosInstance";

export const formatTimeInMinutes = (timeStr: string): string => {
    const hour = parseInt(timeStr.substring(9, 11), 10);
    const minute = parseInt(timeStr.substring(11, 13), 10);
    const minutesSinceMidnight = hour * 60 + minute;
    return `${minutesSinceMidnight} Mins`;
};

export const formatDate = (dateStr: string): string => {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Month is zero-based
    const day = parseInt(dateStr.substring(6, 8), 10);

    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const fetchNews = async (category: string, query: string): Promise<unknown[] | null> => {
    try {
        const url = `${srcFileAlphaVantage.latestNews}&${query}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`;
        const response = await axiosInstance.get(url);
        return response.data.feed;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Error fetching news for ${category}:`, message);
        return null;
    }
};