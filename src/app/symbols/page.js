'use client'

import React, { useEffect } from 'react';

export default function Symbol({ searchParams, isDarkMode }) {
    useEffect(() => {
        const symbol = searchParams.tvwidgetsymbol;

        // TradingView Symbol Info Widget
        const symbolInfoScript = document.createElement('script');
        symbolInfoScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
        symbolInfoScript.async = true;
        symbolInfoScript.innerHTML = JSON.stringify({
            largeChartUrl: `${process.env.baseURL}/symbols`,
            symbol: symbol,
            width: '100%',
            locale: 'en',
            colorTheme: 'light',
            isTransparent: false,
        });

        // Append Symbol Info Script to container
        document.getElementById('tradingSymbol-widget-container').appendChild(symbolInfoScript);

        // TradingView Timeline Widget
        const timelineScript = document.createElement('script');
        timelineScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
        timelineScript.async = true;
        timelineScript.innerHTML = JSON.stringify({
            feedMode: "symbol",
            symbol: symbol,
            isTransparent: true,
            displayMode: "compact",
            width: "100%",
            height: "100%",
            colorTheme: isDarkMode ? 'dark' : 'light',
            locale: "en",
        });

        // Append Timeline Script to container
        document.getElementById('topnews-widget-container').appendChild(timelineScript);

        // Cleanup on unmount
        return () => {
            document.getElementById('tradingSymbol-widget-container').removeChild(symbolInfoScript);
            document.getElementById('topnews-widget-container').removeChild(timelineScript);
        };
    }, [searchParams, isDarkMode]);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="tradingview-widget-container" id="tradingSymbol-widget-container">
                                    <div className="tradingview-widget-container__widget"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <div className="sidebar-wrap-three">
                            <div className="!h-[64rem]" id="topnews-widget-container">
                                <div className="tradingview-widget-container__widget"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
