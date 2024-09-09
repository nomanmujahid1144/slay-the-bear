'use client'

import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect } from "react";

export default function Forex({ isDarkMode }) {
    
    useEffect(() => {
        const cleanupForexCrossRates = addTradingViewWidget('tradingview-widget-forex-cross-rates', {
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "currencies": [
                "EUR",
                "USD",
                "JPY",
                "GBP",
                "CHF",
                "AUD",
                "CAD",
                "NZD",
                "CNY",
                "TRY",
                "COP",
                "PEN",
                "UYU"
              ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "locale": "en"
        }, srcFile.getForexCrossRates);
        const cleanupForexHeatMaps = addTradingViewWidget('tradingview-widget-forex-heatmaps', {
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "currencies": [
                "EUR",
                "USD",
                "JPY",
                "GBP",
                "CHF",
                "AUD",
                "CAD",
                "NZD",
                "CNY",
                "TRY",
                "COP",
                "PEN",
                "UYU"
              ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "locale": "en"
        }, srcFile.getForexHeatMap);
        const cleanupForexScreener = addTradingViewWidget('tradingview-widget-forex-Screener', {
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "defaultColumn": "overview",
            "defaultScreen": "top_gainers",
            "showToolbar": true,
            "locale": "en",
            "market": "forex",
            "colorTheme": "light"
        }, srcFile.getWidgetScanner);
        const cleanupAllMutualFundsNews = addTradingViewWidget('tradingview-widget-forex-news', {
            "feedMode": "market",
            "market": "forex",
            "isTransparent": true,
            "displayMode": "regular",
            "width": "100%",
            "height": "100%",
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
            "locale": "en"
        }, srcFile.getTimeline);
        const cleanupMarketStocksNews = addTradingViewWidget('tradingview-widget-market-stocks-news', {
            "colorTheme": "light",
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
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(19, 23, 34, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
        }, srcFile.getNews);
        const cleanupMarketStocksOverview = addTradingViewWidget('tradingview-widget-market-stocks-overview', {
            "colorTheme": "light",
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
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(19, 23, 34, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "tabs": [
                {
                    "title": "Forex",
                    "symbols": [
                        {
                            "s": "FX:EURUSD",
                            "d": "EUR to USD"
                        },
                        {
                            "s": "FX:GBPUSD",
                            "d": "GBP to USD"
                        },
                        {
                            "s": "FX:USDJPY",
                            "d": "USD to JPY"
                        },
                        {
                            "s": "FX:USDCHF",
                            "d": "USD to CHF"
                        },
                        {
                            "s": "FX:AUDUSD",
                            "d": "AUD to USD"
                        },
                        {
                            "s": "FX:USDCAD",
                            "d": "USD to CAD"
                        }
                    ],
                    "originalTitle": "Forex"
                },
                {
                    "title": "ETFs",
                    "symbols": [
                        {
                            "s": "AMEX:SPY"
                        },
                        {
                            "s": "NASDAQ:QQQ"
                        },
                        {
                            "s": "AMEX:IWM"
                        },
                        {
                            "s": "NASDAQ:TLT"
                        },
                        {
                            "s": "AMEX:SOXL"
                        },
                        {
                            "s": "NASDAQ:TQQQ"
                        }
                    ]
                },
                {
                    "title": "Mutual Funds",
                    "symbols": [
                        {
                            "s": "AMEX:PHYS"
                        },
                        {
                            "s": "AMEX:PSLV"
                        },
                        {
                            "s": "OTC:LTCN"
                        },
                        {
                            "s": "NYSE:PTY"
                        },
                        {
                            "s": "OTC:SRUUF"
                        },
                        {
                            "s": "NYSE:DXYZ"
                        }
                    ]
                }
            ],
            "largeChartUrl": `${process.env.baseURL}/symbols`,
        }, srcFile.getMarketOverview);

        return () => {
            cleanupForexCrossRates();
            cleanupForexHeatMaps();
            cleanupForexScreener();
            cleanupAllMutualFundsNews();
            cleanupMarketStocksNews();
            cleanupMarketStocksOverview();
            // Call other cleanup functions if more widgets are added
        };
    }, []);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Forex Market"
                                showBtn={false}
                            />
                            <div className="!h-[49rem]" id="tradingview-widget-forex-cross-rates">
                                <div className="tradingview-widget-forex-cross-rates"></div>
                            </div>
                            <hr className="my-3" />
                            <Heading
                                textHeading="Forex Heatmap"
                                showBtn={false}
                            />
                            <div className="!h-[49rem]" id="tradingview-widget-forex-heatmaps">
                                <div className="tradingview-widget-forex-heatmaps"></div>
                            </div>
                            <hr className="my-3" />
                            <Heading
                                textHeading="Forex Screener"
                                showBtn={false}
                            />
                            <div className="!h-[49rem]" id="tradingview-widget-forex-Screener">
                                <div className="tradingview-widget-forex-Screener"></div>
                            </div>
                            <hr className="my-3" />
                            <Heading
                                textHeading="Forex News"
                                showBtn={false}
                            />
                            <div className="!h-[49rem]" id="tradingview-widget-forex-news">
                                <div className="tradingview-widget-forex-news"></div>
                            </div>
                        </div>
                        {/*                         
                        <div className="sidebar-wrap">
                        </div> */}
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