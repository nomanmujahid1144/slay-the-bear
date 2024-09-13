'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect } from "react";

export default function MutualFunds() {

    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        // Function to initialize a TradingView widget
        const initializeWidget = (containerId, config, callback) => {
            const widgetContainer = document.getElementById(containerId);
    
            if (widgetContainer) {
                // Clear the existing widget content
                widgetContainer.innerHTML = ''; // Clear the container to remove any duplicate widgets
            }
    
            // Initialize the TradingView widget
            return addTradingViewWidget(containerId, config, callback);
        };
    
        // Initialize all widgets
        const cleanupMutualFunds = initializeWidget('tradingview-widget-mutual-funds', {
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "symbolsGroups": [
                {
                    "name": "Mutual Funds",
                    "originalName": "Forex",
                    "symbols": [
                        { "name": "AMEX:PHYS" },
                        { "name": "AMEX:PSLV" },
                        { "name": "OTC:LTCN" },
                        { "name": "OTC:SRUUF" },
                        { "name": "NYSE:PTY" },
                        { "name": "NYSE:DXYZ" },
                        { "name": "OTC:BCHG" },
                        { "name": "NYSE:PCN" },
                        { "name": "NYSE:PDI" },
                        { "name": "NASDAQ:OXLC" }
                    ]
                }
            ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "locale": "en",
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}` 
        }, srcFile.getStocks);
    
        const cleanupMutualFundsNews = initializeWidget('tradingview-widget-mutual-funds-news', {
            "feedMode": "market",
            "market": "stock",
            "isTransparent": true,
            "displayMode": "regular",
            "width": "100%",
            "height": "100%",
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`, 
            "locale": "en"
        }, srcFile.getTimeline);
    
        const cleanupMarketStocksNews = initializeWidget('tradingview-widget-market-stocks-news', {
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`, 
            "dateRange": "ALL",
            "exchange": "US",
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": "100%",
            "isTransparent": true,
            "showSymbolLogo": false,
            "showFloatingTooltip": true,
            "plotLineColorGrowing": "rgb(41,191,240, 1)",
            "plotLineColorFalling": "rgb(15,96,139, 1)",
            "gridLineColor": `${isDarkMode ? 'rgba(32, 33, 36, 0)' : 'rgba(240, 243, 250, 0)'}`, 
            "scaleFontColor": `${isDarkMode ? 'rgba(220, 220, 220, 1)' : 'rgba(19, 23, 34, 1)'}`, 
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "largeChartUrl": `${process.env.baseURL}/symbols`
        }, srcFile.getNews);
    
        const cleanupMarketStocksOverview = initializeWidget('tradingview-widget-market-stocks-overview', {
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`, 
            "dateRange": "ALL",
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": "100%",
            "largeChartUrl": "",
            "isTransparent": true,
            "showSymbolLogo": false,
            "showFloatingTooltip": true,
            "plotLineColorGrowing": "rgb(41,191,240, 1)",
            "plotLineColorFalling": "rgb(15,96,139, 1)",
            "gridLineColor": `${isDarkMode ? 'rgba(32, 33, 36, 0)' : 'rgba(240, 243, 250, 0)'}`, 
            "scaleFontColor": `${isDarkMode ? 'rgba(220, 220, 220, 1)' : 'rgba(19, 23, 34, 1)'}`, 
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "tabs": [
                {
                    "title": "Forex",
                    "symbols": [
                        { "s": "FX:EURUSD", "d": "EUR to USD" },
                        { "s": "FX:GBPUSD", "d": "GBP to USD" },
                        { "s": "FX:USDJPY", "d": "USD to JPY" },
                        { "s": "FX:USDCHF", "d": "USD to CHF" },
                        { "s": "FX:AUDUSD", "d": "AUD to USD" },
                        { "s": "FX:USDCAD", "d": "USD to CAD" }
                    ],
                    "originalTitle": "Forex"
                },
                {
                    "title": "ETFs",
                    "symbols": [
                        { "s": "AMEX:SPY" },
                        { "s": "NASDAQ:QQQ" },
                        { "s": "AMEX:IWM" },
                        { "s": "NASDAQ:TLT" },
                        { "s": "AMEX:SOXL" },
                        { "s": "NASDAQ:TQQQ" }
                    ]
                },
                {
                    "title": "Mutual Funds",
                    "symbols": [
                        { "s": "AMEX:PHYS" },
                        { "s": "AMEX:PSLV" },
                        { "s": "OTC:LTCN" },
                        { "s": "NYSE:PTY" },
                        { "s": "OTC:SRUUF" },
                        { "s": "NYSE:DXYZ" }
                    ]
                }
            ],
            "largeChartUrl": `${process.env.baseURL}/symbols`
        }, srcFile.getMarketOverview);
    
        // Cleanup function to remove all widgets before re-rendering
        return () => {
            cleanupMutualFunds(); // Clean up mutual funds widget
            cleanupMutualFundsNews(); // Clean up mutual funds news widget
            cleanupMarketStocksNews(); // Clean up market stocks news widget
            cleanupMarketStocksOverview(); // Clean up market stocks overview widget
        };
    }, [isDarkMode]); // Re-run the effect when `isDarkMode` changes
    


    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading={'Mutual Funds'}
                                showBtn={false}
                            />
                            <div className="!h-[26rem]" id="tradingview-widget-mutual-funds">
                                <div className="tradingview-widget-mutual-funds"></div>
                            </div>
                            <Heading
                                textHeading={'Mutual Funds News'}
                                showBtn={false}
                            />
                            <div className="!h-[26rem]" id="tradingview-widget-mutual-funds-news">
                                <div className="tradingview-widget-mutual-funds-news"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            <div className="!h-[36rem]" id="tradingview-widget-market-stocks-overview">
                                <div className="tradingview-widget-market-stocks-overview"></div>
                            </div>
                            <hr className="my-3" />
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <a href="#">
                                        <img src="../assets/img/images/sidebar_img06.jpg" alt="" />
                                    </a>
                                </div>
                            </div>
                            <hr className="my-3" />
                            <div className="!h-[34rem]" id="tradingview-widget-market-stocks-news">
                                <div className="tradingview-widget-market-stocks-news"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}