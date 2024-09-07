'use client'

import { Heading } from "@/app/components/heading/Heading";
import { useEffect } from "react";

export default function Stocks() {


    const addTradingViewWidget = (widgetId, config) => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
        script.async = true;
        script.innerHTML = JSON.stringify(config);
        document.getElementById(widgetId).appendChild(script);

        // Cleanup function to remove the script
        return () => {
            const widgetElement = document.getElementById(widgetId);
            if (widgetElement) {  // Check if the element exists
                widgetElement.removeChild(script);
            }
        };
    };

    const addTradingViewNewsWidget = (widgetId, config) => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
        script.async = true;
        script.innerHTML = JSON.stringify(config);
        document.getElementById(widgetId).appendChild(script);

        // Cleanup function to remove the script
        return () => {
            const widgetElement = document.getElementById(widgetId);
            if (widgetElement) {  // Check if the element exists
                widgetElement.removeChild(script);
            }
        };
    };

    const addTradingViewOverviewWidget = (widgetId, config) => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify(config);
        document.getElementById(widgetId).appendChild(script);

        // Cleanup function to remove the script
        return () => {
            const widgetElement = document.getElementById(widgetId);
            if (widgetElement) {  // Check if the element exists
                widgetElement.removeChild(script);
            }
        };
    };

    useEffect(() => {
        const cleanupAllStocks = addTradingViewWidget('tradingview-widget-markets-stocks', {
            "width": "100%",
            "height": "100%",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "symbolsGroups": [
                {
                    "name": "Stocks",
                    "originalName": "Indices",
                    "symbols": [
                        {
                            "name": "NYSE:BA"
                        },
                        {
                            "name": "NYSE:CVX"
                        },
                        {
                            "name": "NYSE:CAT"
                        },
                        {
                            "name": "NASDAQ:INTC"
                        },
                        {
                            "name": "NASDAQ:MSFT"
                        },
                        {
                            "name": "NYSE:DIS"
                        },
                        {
                            "name": "NYSE:DOW"
                        },
                        {
                            "name": "NASDAQ:CSCO"
                        },
                        {
                            "name": "NYSE:GS"
                        },
                        {
                            "name": "NYSE:JPM"
                        },
                        {
                            "name": "NYSE:KO"
                        },
                        {
                            "name": "NYSE:MCD"
                        },
                        {
                            "name": "NYSE:MRK"
                        },
                        {
                            "name": "NYSE:MMM"
                        },
                        {
                            "name": "NASDAQ:AAPL"
                        },
                        {
                            "name": "NASDAQ:AMZN"
                        },
                        {
                            "name": "NASDAQ:AMGN"
                        },
                        {
                            "name": "NYSE:WMT"
                        },
                        {
                            "name": "NYSE:HD"
                        },
                        {
                            "name": "NYSE:IBM"
                        },
                        {
                            "name": "NYSE:VZ"
                        },
                        {
                            "name": "NYSE:TRV"
                        },
                        {
                            "name": "NYSE:JNJ"
                        },
                        {
                            "name": "NYSE:AXP"
                        },
                        {
                            "name": "NASDAQ:HON"
                        },
                        {
                            "name": "NYSE:CRM"
                        },
                        {
                            "name": "NYSE:V"
                        },
                        {
                            "name": "NYSE:UNH"
                        },
                        {
                            "name": "NYSE:NKE"
                        },
                        {
                            "name": "NYSE:PG"
                        }
                    ]
                }
            ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "locale": "en"
        });
        const cleanupMarketStocksNews = addTradingViewNewsWidget('tradingview-widget-market-stocks-news', {
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
        });
        const cleanupMarketStocksOverview = addTradingViewOverviewWidget('tradingview-widget-market-stocks-overview', {
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
        });

        return () => {
            cleanupAllStocks();
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
                        <Heading
                            textHeading="Stock Market"
                            showBtn={false}
                        />
                        <div className="sidebar-wrap">
                            <div className="!h-[71rem]" id="tradingview-widget-markets-stocks">
                                <div className="tradingview-widget-markets-stocks"></div>
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