// src/app/components//markets/shared/MarketNews.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsItem } from '@/types/news';
import type { ApiResponse } from '@/types';
import type { AxiosResponse } from 'axios';
import { SmallPostTitle } from '@/app/components/post-creation/post-title/SmallPostTitle';
import { DateTime } from '@/app/components/post-creation/post-date-time/Index';
import { formatDate, formatTimeInMinutes } from '@/app/utils/extrasFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MarketNewsProps {
    fetchNews: () => Promise<AxiosResponse<ApiResponse<{ feed: NewsItem[] }>>>;
    refreshInterval?: number;
    itemsPerPage?: number;
}

const LOAD_MORE_DELAY = 800;

export const MarketNews = ({ 
    fetchNews,
    refreshInterval = 300000,
    itemsPerPage = 20
}: MarketNewsProps) => {
    const [allNews, setAllNews] = useState<NewsItem[]>([]);
    const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadNews = useCallback(async () => {
        try {
            setError(null);
            const { data } = await fetchNews();
            
            // Store all news
            setAllNews(data.data.feed);
            
            // Display first page
            setDisplayedNews(data.data.feed.slice(0, itemsPerPage));
            setCurrentPage(1);
        } catch (err) {
            console.error('Error fetching news:', err);
            setError('Failed to load news');
        } finally {
            setLoading(false);
        }
    }, [fetchNews, itemsPerPage]);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    // Auto-refresh
    useEffect(() => {
        const interval = setInterval(loadNews, refreshInterval);
        return () => clearInterval(interval);
    }, [loadNews, refreshInterval]);

    const loadMore = async () => {
        setLoadingMore(true);
        
        // Simulate loading delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, LOAD_MORE_DELAY));
        
        const nextPage = currentPage + 1;
        const newItems = allNews.slice(0, nextPage * itemsPerPage);
        setDisplayedNews(newItems);
        setCurrentPage(nextPage);
        setLoadingMore(false);
    };

    const hasMore = displayedNews.length < allNews.length;

    if (loading) {
        return (
            <div className="markets-news-loading">
                <div className="market-news-spinner">
                    <FontAwesomeIcon icon="spinner" spin />
                </div>
                <p>Loading news...</p>
            </div>
        );
    }

    if (error || !allNews.length) {
        return (
            <div className="markets-news-placeholder">
                <h4>Market News</h4>
                <p>Unable to load news at this time</p>
                <small>Please try again later</small>
            </div>
        );
    }

    return (
        <div className="markets-news-section">
            {/* News Grid - 3 columns */}
            <div className="row">
                {displayedNews.map((item, index) => (
                    <div className="col-lg-4 col-md-6" key={index}>
                        <div className="horizontal-post-four">
                            {item.banner_image && (
                                <div className="horizontal-post-thumb-four">
                                    <Link href={item.url} target="_blank">
                                        <Image
                                            src={item.banner_image}
                                            alt={item.source + ' image'}
                                            width={100}
                                            height={100}
                                            unoptimized
                                        />
                                    </Link>
                                </div>
                            )}
                            <div className="horizontal-post-content-four">
                                <SmallPostTitle
                                    title={
                                        item.title.length > 60
                                            ? `${item.title.substring(0, 60)}...`
                                            : item.title
                                    }
                                    headingLink={item.url}
                                />
                                <DateTime
                                    date={formatDate(item.time_published)}
                                    time={formatTimeInMinutes(item.time_published)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="view-all-btn text-center mt-4">
                    <div className="view-all-btn">
                        <button 
                            onClick={loadMore} 
                            className="link-btn"
                            disabled={loadingMore}
                        >
                            {loadingMore ? (
                                <>
                                    <FontAwesomeIcon icon="spinner" spin className="me-2" />
                                    Loading...
                                </>
                            ) : (
                                'Keep Reading'
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};