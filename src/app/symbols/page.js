'use client'

import React, { useEffect } from 'react';
import { srcFile } from '../utils/tradingViewSrcFiles';
import { useDarkMode } from '../components/dark-mode/DarkModeContext';
import { addTradingViewWidget } from '../utils/utils';

export default function Symbol({ searchParams}) {

    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        console.log(searchParams, 'searchParams')
        const symbol = searchParams.tvwidgetsymbol;

        console.log(symbol, 'symbol')

        // Function to initialize a TradingView widget
        const initializeWidget = (containerId, config, callback) => {
            const widgetContainer = document.getElementById(containerId);

            if (widgetContainer) {
                widgetContainer.innerHTML = ''; // Clear the container to remove any duplicate widgets
            }

            return addTradingViewWidget(containerId, config, callback);
        };

        // Initialize widgets
        const symbolDetails = initializeWidget('tradingSymbol-widget-container', {
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
            "symbol": symbol,
            "width": '100%',
            "locale": 'en',
            "isTransparent": false,
        }, srcFile.getWidgetSymbolInfo);

        // Initialize widgets
        const timelineWidget = initializeWidget('topnews-widget-container', {
            "feedMode": "symbol",
            "symbol": symbol,
            "isTransparent": true,
            "displayMode": "compact",
            "width": "100%",
            "height": "100%",
            "colorTheme": isDarkMode ? 'dark' : 'light',
            "locale": "en",
        }, srcFile.getTimeline);

        // Cleanup on unmount
        return () => {
            symbolDetails();
            timelineWidget();
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
