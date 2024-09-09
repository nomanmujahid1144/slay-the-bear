'use client'

import { Banner } from "../../ads/Banner"
import { DateTime } from "../../post-creation/post-date-time/Index"
import { Heading } from "../../heading/Heading"
import { PostDescription } from "../../post-creation/post-description/Index"
import { PostTag } from "../../post-creation/post-tag/Index"
import { PostTitle } from "../../post-creation/post-title/Index"
import { HotPicks } from "../hot-news/Index"
import { Market } from "../market/Index";
import horizentalImage from '../../../../../public/assets/img/blog/cr_recent_post03.jpg';
import { SmallPostTitle } from "../../post-creation/post-title/SmallPostTitle"
import Link from "next/link"
import Image from "next/image"
import { Goto } from "../../Buttons/Goto"
import { useEffect, useState } from "react";
import axios from 'axios';
import { srcFile } from "@/app/utils/tradingViewSrcFiles"
import { addTradingViewWidget } from "@/app/utils/utils"

const horizentalPosts = [
    { postTitle: 'Using Instagram Tawo Promote Your', postTag: 'CRYPTOCURRENCY', postDate: '27 AUGUST, 2024', postTime: '', postImage: horizentalImage },
    { postTitle: 'Using Instagram Tawo Promote Your', postTag: 'CRYPTOCURRENCY', postDate: '27 AUGUST, 2024', postTime: '', postImage: horizentalImage },
    { postTitle: 'Using Instagram Tawo Promote Your', postTag: 'CRYPTOCURRENCY', postDate: '27 AUGUST, 2024', postTime: '', postImage: horizentalImage }
]

export const TopNews = ({ isDarkMode }) => {

    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const cleanupTimeline = addTradingViewWidget('topnews-widget-container', {
            "feedMode": "all_symbols",
            "isTransparent": true,
            "displayMode": "compact",
            "width": "100%",
            "height": "100%",
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
            "locale": "en"
        }, srcFile.getTimeline);

        return () => {
            cleanupTimeline();
            // Call other cleanup functions if more widgets are added
        };
    }, []);


    // Function to format date
    const formatDate = (dateStr) => {
        const year = dateStr.substring(0, 4);
        const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Month is zero-based
        const day = dateStr.substring(6, 8);

        const date = new Date(year, month, day);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Function to format time in minutes
    const formatTimeInMinutes = (timeStr) => {
        const hour = parseInt(timeStr.substring(9, 11), 10);
        const minute = parseInt(timeStr.substring(11, 13), 10);
        const minutesSinceMidnight = hour * 60 + minute; // Calculate total minutes
        return `${minutesSinceMidnight} Mins`;
    };

    useEffect(() => {

        const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&apikey=${process.env.alphaVantageStockApi}`;

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
                            {newsData.feed?.length > 0 && (
                                <div className="col-12">
                                    <div className="top-news-post">
                                        <div className="top-news-post-thumb">
                                            <Link href={newsData.feed[0].url}>
                                                <img src={newsData.feed[0].banner_image} alt={newsData.feed[0].source + ' image'} />
                                            </Link>
                                            {/* <a
                                                href="https://www.youtube.com/watch?v=G_AEL-Xo5l8"
                                                className="paly-btn popup-video"
                                            >
                                                <i className="fas fa-play" />
                                            </a> */}
                                        </div>
                                        <div className="top-news-post-content">
                                            <PostTag
                                                tagName={'Sports'}
                                            />
                                            <PostTitle
                                                extras={'bold-underline'}
                                                heading={newsData.feed[0].title}
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
                            )}
                            {horizentalPosts.map((horizentalPost, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className="horizontal-post-four">
                                        <div className="horizontal-post-thumb-four">
                                            <Link href="#">
                                                <Image
                                                    src={horizentalPost.postImage}
                                                    layout="responsive"
                                                    width={100}
                                                    height={150}
                                                    alt="no image"
                                                />
                                            </Link>
                                        </div>
                                        <div className="horizontal-post-content-four">
                                            <PostTag
                                                tagName={horizentalPost.postTag}
                                            />
                                            <SmallPostTitle
                                                title={horizentalPost.postTitle}
                                            />
                                            <DateTime
                                                date={horizentalPost.postDate}
                                                time={horizentalPost.postTime}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Banner />
                        <HotPicks />
                        <Market
                            market="Markets"
                        />
                        <Banner />
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <div className="sidebar-wrap-three">
                            <div className="sidebar-widget-three">
                                {/* <Heading
                                    textHeading={'Business'}
                                />
                                <div className="hot-post-wrap">
                                    
                                </div> */}
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