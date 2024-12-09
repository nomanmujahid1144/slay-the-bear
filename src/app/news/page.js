'use client'

import { Banner } from "../components/ads/Banner";
import { Heading } from "../components/heading/Heading";
import { DateTime } from "../components/post-creation/post-date-time/Index";
import { PostTag } from "../components/post-creation/post-tag/Index";
import { PostTitle } from "../components/post-creation/post-title/Index";
import crypoImage from '../../../public/assets/img/blog/cr_recent_post02.jpg';
import Link from "next/link";
import Image from "next/image";
import defaultImage from '../../../public/assets/img/blog/sports_post01.jpg';
import { NewsTabs } from "../components/news-page/Index";
import { useEffect, useState } from "react";
import { srcFileAlphaVantage } from "@/app/utils/alphaVantageSrcFile";
import { formatDate, formatTimeInMinutes } from "@/app/utils/extrasFunctions"
import { Goto } from "../components/Buttons/Goto";
import { PostDescription } from "../components/post-creation/post-description/Index";
import axios from "axios";
import { SmallPostTitle } from "../components/post-creation/post-title/SmallPostTitle";
import { useDarkMode } from "../components/dark-mode/DarkModeContext";
import { addTradingViewWidget } from "../utils/utils";
import { srcFile } from "../utils/tradingViewSrcFiles";

export default function NewsPage() {
    const { isDarkMode } = useDarkMode();
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const url = `${srcFileAlphaVantage.latestNews}${process.env.alphaVantageStockApi}`;

        // Fetch data using axios
        axios
            .get(url)
            .then((response) => {
                setNewsData(response.data);
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, []);

    useEffect(() => {
        const widgetContainerId = 'topnews-widget-container';

        // Function to initialize the TradingView widget
        const initializeWidget = () => {
            // Clear the existing widget content
            const widgetContainer = document.getElementById(widgetContainerId);
            if (widgetContainer) {
                widgetContainer.innerHTML = ''; // Clear the container to remove any duplicate widgets
            }

            // Initialize the TradingView widget
            return addTradingViewWidget(
                widgetContainerId,
                {
                    feedMode: 'all_symbols',
                    isTransparent: true,
                    displayMode: 'compact',
                    width: '100%',
                    height: '100%',
                    colorTheme: isDarkMode ? 'dark' : 'light',
                    locale: 'en',
                },
                srcFile.getTimeline
            );
        };

        // Initialize the widget
        const cleanupTimeline = initializeWidget();

        // Cleanup function to remove the widget before re-rendering
        return () => {
            if (cleanupTimeline) {
                cleanupTimeline(); // Properly cleanup the widget
            }
        };
    }, [isDarkMode]); // Re-run the effect when `isDarkMode` changes

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sports-post-wrap">
                            <Heading
                                textHeading={'World Top News'}
                            />
                            <div className="row">
                                {newsData.feed?.length > 0 && (
                                    <>
                                        <div className="col-lg-8">
                                            <div className="sports-post">
                                                {newsData.feed[0].banner_image !== '' || newsData.feed[0].banner_image !== null && (
                                                    <div className="sports-post-thumb">
                                                        <Link href={newsData.feed[0].url} target="_blank">
                                                            <img src={newsData.feed[0].banner_image} alt={newsData.feed[0].source + ' image'} />
                                                        </Link>
                                                    </div>
                                                )}
                                                <div className="sports-post-content">
                                                    <PostTitle
                                                        extras={'bold-underline'}
                                                        heading={newsData.feed[0].title}
                                                        headingLink={newsData.feed[0].url}
                                                    />
                                                    <DateTime
                                                        date={formatDate(newsData.feed[0].time_published)}
                                                        time={formatTimeInMinutes(newsData.feed[0].time_published)}
                                                    />
                                                    <PostDescription
                                                        description={newsData.feed[0].summary}
                                                    />
                                                    <div className="view-all-btn">
                                                        <Goto
                                                            buttonText={'Read More'}
                                                            goTo={newsData.feed[0].url}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="sidebar-wrap sidebar-wrap-four">
                                                {newsData?.feed?.slice(1, 4).map((newsData, index) => (
                                                    <div key={index} className="horizontal-post-four horizontal-post-five">
                                                        <div className="horizontal-post-thumb-four">
                                                            {newsData.banner_image !== '' && (
                                                                <div className="top-news-post-thumb">
                                                                    <Link href={newsData.url} target="_blank">
                                                                        <img
                                                                            src={newsData.banner_image}
                                                                            className="!w-[100px] !h-[104px]"
                                                                            alt={newsData.source + ' image'}
                                                                        />
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="horizontal-post-content-four">
                                                            <PostTag
                                                                tagName={newsData.postTag}
                                                            />
                                                            <SmallPostTitle
                                                                title={
                                                                    newsData.title.length > 40
                                                                        ? `${newsData.title.substring(0, 40)}...`
                                                                        : newsData.title
                                                                }
                                                                headingLink={newsData.url}
                                                            />
                                                            <DateTime
                                                                date={formatDate(newsData.time_published)}
                                                                time={formatTimeInMinutes(newsData.time_published)}
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
                            <div className="sidebar-widget-three">
                                <div className="!h-[64rem]" id="topnews-widget-container">
                                    <div className="tradingview-widget-container__widget"></div>
                                </div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <a href="#">
                                        <img src="assets/img/images/sidebar_img06.jpg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}