'use client';

import React, { useEffect, useState, Suspense } from 'react'; // Added Suspense
import { useSearchParams } from 'next/navigation'; // Import the useSearchParams hook
import { srcFile } from '../utils/tradingViewSrcFiles';
import { useDarkMode } from '../components/dark-mode/DarkModeContext';
import { addTradingViewWidget } from '../utils/utils';

function SymbolComponent() { // Renamed to SymbolComponent for clarity
    const searchParams = useSearchParams(); // Use useSearchParams hook
    const { isDarkMode } = useDarkMode();
    const [symbol, setSymbol] = useState(''); // Initialize symbol state

    useEffect(() => {
        const symbolParam = searchParams.get('tvwidgetsymbol'); // Extract the value of tvwidgetsymbol
        if (symbolParam) {
            setSymbol(symbolParam); // Store it in state if found
            console.log(symbolParam, 'symbol'); // Debugging: log the symbol
        }
    }, [searchParams]); // Re-run if searchParams changes

    useEffect(() => {
        if (!symbol) return; // Ensure symbol is available before initializing the widget

        console.log(symbol, 'symbol');

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

        const timelineWidget = initializeWidget('topnews-widget-container', {
            "feedMode": "symbol",
            "symbol": symbol,
            "isTransparent": true,
            "displayMode": "compact",
            "width": "100%",
            "height": "100%",
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
            "locale": "en",
        }, srcFile.getTimeline);

        // Cleanup on unmount
        return () => {
            symbolDetails();
            timelineWidget();
        };
    }, [symbol, isDarkMode]); // Added symbol to the dependency array

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

// Wrap SymbolComponent in Suspense
export default function Symbol() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SymbolComponent />
        </Suspense>
    );
}
