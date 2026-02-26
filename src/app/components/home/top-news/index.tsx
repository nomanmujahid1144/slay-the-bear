'use client'

import { Banner } from "../../ads/Banner"
import { DateTime } from "../../post-creation/post-date-time/Index"
import { Heading } from "../../heading/Heading"
import { PostDescription } from "../../post-creation/post-description/Index"
import { PostTag } from "../../post-creation/post-tag/Index"
import { PostTitle } from "../../post-creation/post-title/PostTitle"
import { Market } from "../market/Index"
import { SmallPostTitle } from "../../post-creation/post-title/SmallPostTitle"
import Link from "next/link"
import { Goto } from "../../buttons/Goto"
import { useEffect, useState } from "react"
import axios from 'axios'
import { srcFile } from "@/app/utils/tradingViewSrcFiles"
import { addTradingViewWidget } from "@/app/utils/utils"
import { srcFileAlphaVantage } from "@/app/utils/alphaVantageSrcFile"
import { useDarkMode } from "../../dark-mode/DarkModeContext"
import { formatDate, formatTimeInMinutes } from "@/app/utils/extrasFunctions"
import Image from "next/image"

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

export const TopNews = () => {
    const { isDarkMode } = useDarkMode()
    const [newsData, setNewsData] = useState<NewsData>({})

    // TradingView widget
    useEffect(() => {
        const widgetContainerId = 'topnews-widget-container'

        const initializeWidget = () => {
            const widgetContainer = document.getElementById(widgetContainerId)
            if (widgetContainer) {
                widgetContainer.innerHTML = ''
            }
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
            )
        }

        const cleanupTimeline = initializeWidget()

        return () => {
            if (cleanupTimeline) cleanupTimeline()
        }
    }, [isDarkMode])

    // ── Fixed: no async useEffect ─────────────────────────
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = `${srcFileAlphaVantage.latestNews}${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_STOCK_API}`
                const response = await axios.get(url)
                setNewsData(response.data)
            } catch (err) {
                setNewsData({})
                console.error('Error fetching news:', err)
            }
        }

        fetchNews()
    }, [])

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <Heading textHeading={'World Top News'} />
                            </div>
                        </div>
                        <div className="row">
                            {newsData.feed && newsData.feed.length > 0 && (
                                <>
                                    <div className="col-12">
                                        <div className="top-news-post">
                                            {newsData.feed[0].banner_image && (
                                                <div className="top-news-post-thumb">
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
                                    {newsData.feed.slice(1, 4).map((item, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className="horizontal-post-four">
                                                <div className="horizontal-post-thumb-four">
                                                    {item.banner_image && (
                                                        <Link href={item.url} target="_blank">
                                                            <Image
                                                                src={item.banner_image}
                                                                alt={item.source + ' image'}
                                                                width={100}
                                                                height={100}
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
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <Banner />
                        <Market market="Markets" />
                        <Banner />
                    </div>
                    <div className="col-xl-3 col-lg-12">
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
    )
}