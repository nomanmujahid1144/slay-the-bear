'use client'

import { Banner } from "../../components/ads/Banner";
import { Heading } from "../../components/heading/Heading";
import { DateTime } from "../../components/post-creation/post-date-time/Index";
import { PostTag } from "../../components/post-creation/post-tag/Index";
import { PostTitle } from "../../components/post-creation/post-title/PostTitle";
import { NewsTabs } from "../../components/news-page/Index";
import { useEffect, useState } from "react";
import { srcFileAlphaVantage } from "@/app/utils/alphaVantageSrcFile";
import { formatDate, formatTimeInMinutes } from "@/app/utils/extrasFunctions";
import { Goto } from "../../components/buttons/Goto";
import { PostDescription } from "../../components/post-creation/post-description/Index";
import axios from "axios";
import { SmallPostTitle } from "../../components/post-creation/post-title/SmallPostTitle";
import { useDarkMode } from "../../components/dark-mode/DarkModeContext";
import { addTradingViewWidget } from "../../utils/utils";
import { srcFile } from "../../utils/tradingViewSrcFiles";
import Link from "next/link";
import Image from "next/image";

interface NewsFeedItem {
    url: string;
    title: string;
    summary: string;
    banner_image?: string;
    source: string;
    time_published: string;
    postTag?: string;
}

interface NewsData {
    feed?: NewsFeedItem[];
}

export default function NewsPage() {
    const { isDarkMode } = useDarkMode();
    const [newsData, setNewsData] = useState<NewsData>({});

    // Fetch latest news
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = `${srcFileAlphaVantage.latestNews}${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`;
                const response = await axios.get(url);
                setNewsData(response.data);
            } catch (err) {
                console.error('Error:', err);
            }
        };
        fetchNews();
    }, []);

    // TradingView timeline widget
    useEffect(() => {
        const widgetContainerId = 'topnews-widget-container';

        const widgetContainer = document.getElementById(widgetContainerId);
        if (widgetContainer) widgetContainer.innerHTML = '';

        const cleanupTimeline = addTradingViewWidget(
            widgetContainerId,
            {
                feedMode: 'all_symbols',
                isTransparent: true,
                displayMode: 'compact',
                width: 'auto',
                height: '100%',
                colorTheme: isDarkMode ? 'dark' : 'light',
                locale: 'en',
            },
            srcFile.getTimeline
        );

        return () => {
            if (cleanupTimeline) cleanupTimeline();
        };
    }, [isDarkMode]);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sports-post-wrap">
                            <Heading textHeading={'World Top News'} />
                            <div className="row">
                                {newsData.feed && newsData.feed.length > 0 && (
                                    <>
                                        <div className="col-lg-8">
                                            <div className="sports-post">
                                                {newsData.feed[0].banner_image && (
                                                    <div className="sports-post-thumb">
                                                        <Link href={newsData.feed[0].url} target="_blank">
                                                            <Image
                                                                src={newsData.feed[0].banner_image}
                                                                alt={newsData.feed[0].source + ' image'}
                                                                width={460}
                                                                height={320}
                                                                quality={85}
                                                                priority
                                                                unoptimized
                                                            />
                                                        </Link>
                                                    </div>
                                                )}
                                                <div className="sports-post-content">
                                                    <PostTitle
                                                        extras="bold-underline"
                                                        heading={newsData.feed[0].title}
                                                        headingLink={newsData.feed[0].url}
                                                    />
                                                    <DateTime
                                                        date={formatDate(newsData.feed[0].time_published)}
                                                        time={formatTimeInMinutes(newsData.feed[0].time_published)}
                                                    />
                                                    <PostDescription description={newsData.feed[0].summary} />
                                                    <div className="view-all-btn">
                                                        <Goto buttonText="Read More" goTo={newsData.feed[0].url} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="sidebar-wrap sidebar-wrap-four">
                                                {newsData.feed.slice(1, 4).map((item, index) => (
                                                    <div key={index} className="horizontal-post-four horizontal-post-five">
                                                        <div className="horizontal-post-thumb-four">
                                                            {item.banner_image && (
                                                                <Link href={item.url} target="_blank">
                                                                    <Image
                                                                        src={item.banner_image}
                                                                        alt={item.source + ' image'}
                                                                        width={100}
                                                                        height={100}
                                                                        quality={85}
                                                                        priority
                                                                        unoptimized
                                                                    />
                                                                </Link>
                                                            )}
                                                        </div>
                                                        <div className="horizontal-post-content-four">
                                                            <PostTag tagName={item.postTag} />
                                                            <SmallPostTitle
                                                                title={
                                                                    item.title.length > 40
                                                                        ? `${item.title.substring(0, 40)}...`
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
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <Banner />
                        <NewsTabs />
                    </div>
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <Banner />
                                </div>
                            </div>
                            <div className="sidebar-widget-three">
                                <div className="!h-[64rem]" id="topnews-widget-container">
                                    <div className="tradingview-widget-container__widget"></div>
                                </div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <Banner />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}