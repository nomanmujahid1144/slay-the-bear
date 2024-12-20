'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect } from "react";
import Image from "next/image";
import slideBarImage from '../../../../public/assets/img/images/sidebar_img06.jpg';

export default function Cryptocurrency() {

    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        // Function to initialize a TradingView widget
        const initializeWidget = (containerId, config, callback) => {
            const widgetContainer = document.getElementById(containerId);

            if (widgetContainer) {
                widgetContainer.innerHTML = ''; // Clear the container to remove any duplicate widgets
            }

            return addTradingViewWidget(containerId, config, callback);
        };

        // Initialize widgets
        const cleanupCryptocurrency = initializeWidget('tradingview-widget-cryptocurrency', {
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
            "symbolsGroups": [
                {
                    "name": "Cryptocurrency",
                    "originalName": "Indices",
                    "symbols": [
                        { "name": "CRYPTOCAP:BTC" },
                        { "name": "CRYPTOCAP:ETH" },
                        { "name": "CRYPTO:USDTUSD" },
                        { "name": "CRYPTOCAP:BNB" },
                        { "name": "CRYPTO:SOLUSD" },
                        { "name": "CRYPTOCAP:USDC" },
                        { "name": "CRYPTOCAP:XRP" },
                        { "name": "CRYPTO:DOGEUSD" },
                        { "name": "CRYPTO:TONUSD" },
                        { "name": "CRYPTO:TRXUSD" },
                        { "name": "CRYPTO:ADAUSD" },
                        { "name": "CRYPTO:AVAXUSD" },
                        { "name": "CRYPTO:SHIBUSD" },
                        { "name": "CRYPTO:DOTUSD" },
                        { "name": "CRYPTO:LINKUSD" },
                        { "name": "OANDA:BCHUSD" },
                        { "name": "CRYPTOCAP:DAI" },
                        { "name": "CRYPTO:LEOUSD" },
                        { "name": "CRYPTOCAP:LTC" },
                        { "name": "CRYPTOCAP:NEAR" }
                    ]
                }
            ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "locale": "en"
        }, srcFile.getStocks);

        const cleanupCryptocurrencyPairs = initializeWidget('tradingview-widget-cryptocurrency-pairs', {
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
            "symbolsGroups": [
                {
                    "name": "Cryptocurrency",
                    "originalName": "Indices",
                    "symbols": [
                        { "name": "BINANCE:BTCUSD" },
                        { "name": "CRYPTOCAP:BTC" },
                        { "name": "BINANCE:ETHUSD" },
                        { "name": "CRYPTO:SOLUSD" },
                        { "name": "PYTH:TONUSD" },
                        { "name": "CRYPTOCAP:XRP" },
                        { "name": "CRYPTOCAP:ETH" },
                        { "name": "BITMEX:BPEPE" },
                        { "name": "CRYPTOCAP:BNB" },
                        { "name": "BINANCE:DOGEUSD" },
                        { "name": "PYTH:USDMXN" },
                        { "name": "WHITEBIT:FETTRY" },
                        { "name": "BINANCE:LINKUSD" },
                        { "name": "BITAZZA:USDTTHB" },
                        { "name": "BINANCE:NFPUSD" },
                        { "name": "BITKUB:XRPTHB" },
                        { "name": "CRYPTO:ADAUSD" },
                        { "name": "CRYPTO:VELOUSD" },
                        { "name": "COINBASE:BCHUSD" },
                        { "name": "CRYPTO:RDNTUSD" },
                        { "name": "CRYPTO:JASMYUSD" }
                    ]
                }
            ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "locale": "en"
        }, srcFile.getStocks);

        const cleanupAllCryptoNews = initializeWidget('tradingview-widget-crypto-news', {
            "feedMode": "market",
            "market": "crypto",
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
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(19, 23, 34, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "largeChartUrl": `${process.env.baseURL}/symbols`
        }, srcFile.getNews);

        const cleanupMarketStocksOverview = initializeWidget('tradingview-widget-market-stocks-overview', {
            "dateRange": "ALL",
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
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
        }, srcFile.getMarketOverview);

        // Cleanup function to remove all widgets before re-rendering
        return () => {
            cleanupCryptocurrency();
            cleanupCryptocurrencyPairs();
            cleanupAllCryptoNews();
            cleanupMarketStocksNews();
            cleanupMarketStocksOverview();
            // Call other cleanup functions if more widgets are added
        };
    }, [isDarkMode]);


    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Cryptocurrency Market"
                                showBtn={false}
                            />
                            <div className="!h-[49rem]" id="tradingview-widget-cryptocurrency">
                                <div className="tradingview-widget-cryptocurrency"></div>
                            </div>
                            <hr className="my-3" />
                            <Heading
                                textHeading="More Active Cryptocurrency Pairs"
                                showBtn={false}
                            />
                            <div className="!h-[51rem]" id="tradingview-widget-cryptocurrency-pairs">
                                <div className="tradingview-widget-cryptocurrency-pairs"></div>
                            </div>
                            <hr className="my-3" />
                            <Heading
                                textHeading="Cryptocurrency News"
                                showBtn={false}
                            />
                            <div className="!h-[51rem]" id="tradingview-widget-crypto-news">
                                <div className="tradingview-widget-crypto-news"></div>
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
                                        <Image
                                            src={slideBarImage}
                                            alt="no image found"
                                            className="w-full h-auto"
                                            unoptimized
                                        />
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