'use client';

import { useState, useEffect } from "react";
import { Heading } from "../heading/Heading";
import { Banner } from "../ads/Banner";
import { SinglePostDisplay } from "../post-creation/single-post-display/Index";
import { fetchNews, formatDate, formatTimeInMinutes } from "@/app/utils/extrasFunctions";
import { LottieLoader } from "../Loader/Index";

export const NewsTabs = () => {
    const [activeTab, setActiveTab] = useState('stocks');
    const [allNews, setAllNews] = useState([]);
    const [visibleNews, setVisibleNews] = useState([]); // Tracks currently visible news
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0); // Tracks the index for the next set of news

    const tabs = [
        { id: 'stocks', label: 'Stocks', target: '#stocks-news-tab-pane' },
        { id: 'cryptocurrency', label: 'Cryptocurrency', target: '#cryptocurrency-news-tab-pane' },
        { id: 'forex', label: 'Forex', target: '#forex-tab-pane' },
        { id: 'etfs', label: 'ETFs', target: '#etfs-tab-pane' },
        { id: 'mutual-funds', label: 'Mutual Funds', target: '#mutual-funds-tab-pane' }
    ];

    const handleTabClick = async (tabId) => {
        setIsLoading(true);
        const query = {
            stocks: 'tickers=AAPL&limit=50',
            cryptocurrency: 'tickers=CRYPTO:BTC,CRYPTO:ETH,CRYPTO:XRP&limit=50',
            forex: 'tickers=FOREX:USD,FOREX:EUR,FOREX:JPY&limit=50',
            etfs: 'topics=finance&limit=50',
            'mutual-funds': 'topics=finance&limit=50'
        }[tabId];

        const news = await fetchNews(tabId, query);
        setAllNews(news || []);
        setVisibleNews(news?.slice(0, 10) || []); // Load initial 10 news
        setCurrentIndex(10); // Reset currentIndex
        setIsLoading(false);
        setActiveTab(tabId);
    };

    // Fetch the first tab's news by default when the component mounts
    useEffect(() => {
        handleTabClick('stocks');
    }, []);

    // Infinite scroll logic
    const handleScroll = () => {
        const container = document.getElementById('news-container');
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            loadMoreNews();
        }
    };

    const loadMoreNews = () => {
        if (currentIndex < allNews.length) {
            const nextNews = allNews.slice(currentIndex, currentIndex + 10);
            setVisibleNews((prev) => [...prev, ...nextNews]);
            setCurrentIndex((prev) => prev + 10);
        }
    };

    useEffect(() => {
        const container = document.getElementById('news-container');
        console.table('noman')
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [currentIndex, allNews]); // Reattach listener if `allNews` changes

    return (
        <section className="recent-post-area-two mt-30">
            <div className="container">
                <div className="recent-post-inner-wrap">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <Heading textHeading={'All News'} />
                            <div className="sidebar-wrap no-sticky">
                                <div className="sidebar-tab">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        {tabs.map((tab) => (
                                            <li className="nav-item" role="presentation" key={tab.id}>
                                                <button
                                                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                                    id={`${tab.id}-tab`}
                                                    data-bs-toggle="tab"
                                                    data-bs-target={tab.target}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls={`${tab.id}-tab-pane`}
                                                    aria-selected={activeTab === tab.id}
                                                    onClick={() => handleTabClick(tab.id)}
                                                >
                                                    {tab.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="tab-content" id="myTabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="latest-tab-pane"
                                            role="tabpanel"
                                            aria-labelledby="latest-tab"
                                            tabIndex={0}
                                        >
                                            <div id="news-container" className="container !overflow-auto h-[500px]">
                                                <div className="row over">
                                                    {isLoading ? (
                                                        <LottieLoader />
                                                    ) : (
                                                        <>
                                                            {visibleNews?.map((news, index) => (
                                                                <SinglePostDisplay
                                                                    key={index}
                                                                    postTag={news.postTag}
                                                                    postHeading={
                                                                        news.title.length > 60
                                                                            ? `${news.title.substring(0, 60)}...`
                                                                            : news.title
                                                                    }
                                                                    postImage={news.banner_image}
                                                                    postDescription={
                                                                        news.summary.length > 140
                                                                            ? `${news.summary.substring(0, 140)}...`
                                                                            : news.summary
                                                                    }
                                                                    postURL={news.url}
                                                                    postSource={news.source}
                                                                    postDate={formatDate(news.time_published)}
                                                                    postTime={formatTimeInMinutes(news.time_published)}
                                                                />
                                                            ))}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Banner />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
