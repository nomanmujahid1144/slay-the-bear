'use client'

import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect } from "react";

export default function ETFs({ isDarkMode }) {

    useEffect(() => {
        const cleanupEtfsHeatMaps = addTradingViewWidget('tradingview-widget-etfs-heatmaps', {
            "width": "100%",
            "height": "100%",
            "dataSource": "AllUSEtf",
            "blockSize": "aum",
            "blockColor": "change",
            "grouping": "asset_class",
            "locale": "en",
            "symbolUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": "light",
            "hasTopBar": true,
            "isDataSetEnabled": true,
            "isZoomEnabled": true,
            "hasSymbolTooltip": true,
            "isMonoSize": false,
        }, srcFile.getETFsHeatMap);
        const cleanupAllMutualFundsNews = addTradingViewWidget('tradingview-widget-etfs-news', {
            "feedMode": "market",
            "market": "stock",
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
            cleanupEtfsHeatMaps();
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
                                textHeading="ETFs Heatmap"
                                showBtn={false}
                            />
                            <div className="!h-[49rem]" id="tradingview-widget-etfs-heatmaps">
                                <div className="tradingview-widget-etfs-heatmaps"></div>
                            </div>
                            <hr className="my-3" />
                            <Heading
                                textHeading="ETFs News"
                                showBtn={false}
                            />
                            <div className="!h-[49rem]" id="tradingview-widget-etfs-news">
                                <div className="tradingview-widget-etfs-news"></div>
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