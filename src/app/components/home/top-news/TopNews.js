'use client'

import { Banner } from "../../ads/Banner"
import { DateTime } from "../../post-creation/post-date-time/Index"
import { Heading } from "../../heading/Heading"
import { PostDescription } from "../../post-creation/post-description/Index"
import { PostTag } from "../../post-creation/post-tag/Index"
import { PostTitle } from "../../post-creation/post-title/Index"
import { Market } from "../market/Index";
import { SmallPostTitle } from "../../post-creation/post-title/SmallPostTitle"
import Link from "next/link"
import { Goto } from "../../Buttons/Goto"
import { useEffect, useState } from "react";
import axios from 'axios';
import { srcFile } from "@/app/utils/tradingViewSrcFiles"
import { addTradingViewWidget } from "@/app/utils/utils"
import { srcFileAlphaVantage } from "@/app/utils/alphaVantageSrcFile";
import { useDarkMode } from "../../dark-mode/DarkModeContext"
import { formatDate, formatTimeInMinutes } from "@/app/utils/extrasFunctions"
import Image from "next/image"

export const TopNews = () => {
    const { isDarkMode } = useDarkMode();
    const [newsData, setNewsData] = useState([]);

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
                    width: 'auto',
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

    useEffect(() => {
        const url = `${srcFileAlphaVantage.latestNews}${process.env.alphaVantageStockApi}`;

        // Fetch data using axios
        axios
            .get(url)
            .then((response) => {
                setNewsData(response.data);
            })
            .catch((err) => {
                setNewsData([])
                console.error('Error:', err);
            });
    }, []);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <Heading
                                    textHeading={'World Top News'}
                                />
                            </div>
                        </div>
                        <div className="row">
                            {/* {newsData.feed?.length > 0 && (
                                <>
                                    <div className="col-12">
                                        <div className="top-news-post">
                                            {newsData.feed[0].banner_image !== '' && (
                                                <div className="top-news-post-thumb">
                                                    <Link href={newsData.feed[0].url} target="_blank">
                                                        <Image
                                                            src={newsData.feed[0]?.banner_image}
                                                            alt={newsData.feed[0]?.source + ' image'}
                                                            width={460} // Rendered width
                                                            height={320} // Rendered height
                                                            quality={85} // Adjust quality if needed
                                                            priority // Optional for critical images
                                                            unoptimized
                                                        />
                                                    </Link>
                                                </div>
                                            )}
                                            <div className="top-news-post-content">
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
                                    {newsData?.feed?.slice(1, 4).map((newsData, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className="horizontal-post-four">
                                                <div className="horizontal-post-thumb-four">
                                                    {newsData.banner_image !== '' && (
                                                        <Link href={newsData.url} target="_blank">
                                                            <Image
                                                                src={newsData.banner_image}
                                                                alt={newsData.source + ' image'}
                                                                width={100} // Rendered width
                                                                height={100} // Rendered height
                                                                qualityy={100} // Adjust quality if needed
                                                                priority // Optional for critical images
                                                                unoptimized
                                                            />
                                                        </Link>
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
                                        </div>
                                    ))}
                                </>
                            )} */}
                        </div>
                        <Banner />
                        <Market
                            market="Markets"
                        />
                        <Banner />
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <div className="sidebar-wrap-three">
                            <div className="sidebar-widget-three">
                                <div className="!h-[64rem]" id="topnews-widget-container">
                                    <div className="tradingview-widget-container__widget"></div>
                                </div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    {/* <a href="#">
                                        <Image
                                            src={slideBarImage}
                                            alt="no image found"
                                            className="w-full h-auto"
                                            unoptimized
                                        />
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}