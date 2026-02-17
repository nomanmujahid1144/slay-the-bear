// src/app/hooks/useTradingViewWidgets.js - UPDATE

import { useEffect } from 'react';
import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import { addTradingViewWidget } from '../utils/utils';
import { srcFile } from '../utils/tradingViewSrcFiles';

export const useTradingViewWidgets = () => {
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        const initializeWidget = (containerId, config, callback) => {
            const widgetContainer = document.getElementById(containerId);
            if (widgetContainer) {
                widgetContainer.innerHTML = '';
            }
            return addTradingViewWidget(containerId, config, callback);
        };

        console.log(srcFile.getMarketOverview, 'srcFile.getMarketOverview')
        console.log(srcFile.getMarketStocks, 'srcFile.getMarketStocks')

        const cleanupMarketStocksOverview = initializeWidget(
            'tradingview-widget-market-stocks-overview',
            {
                colorTheme: isDarkMode ? 'dark' : 'light',
                dataRange: "ALL",
                showChart: true,
                showSymbolLogo: false,
                showFloatingTooltip: true,
                plotLineColorGrowing: "rgb(41,191,240, 1)",
                plotLineColorFalling: "rgb(15,96,139, 1)",
                gridLineColor: "rgba(240, 243, 250, 0)",
                scaleFontColor: "rgba(19, 23, 34, 1)",
                belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
                belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
                belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
                belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
                symbolActiveColor: "rgba(41, 98, 255, 0.12)",
                tabs: [
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
                largeChartUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/symbols`,
                width: '100%',
                height: '100%',
                isTransparent: true,
                locale: 'en',

            },
            srcFile.getMarketOverview
        );

        const cleanupMarketStocksNews = initializeWidget(
            'tradingview-widget-market-stocks-news',
            {
                colorTheme: isDarkMode ? 'dark' : 'light',
                dateRange: 'ALL',
                exchange: 'US',
                showChart: true,
                locale: 'en',
                width: '100%',
                height: '100%',
                isTransparent: true,
                showSymbolLogo: false,
                showFloatingTooltip: true,
                plotLineColorGrowing: 'rgb(41,191,240, 1)',
                plotLineColorFalling: 'rgb(15,96,139, 1)',
                gridLineColor: 'rgba(240, 243, 250, 0)',
                scaleFontColor: 'rgba(19, 23, 34, 1)',
                belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
                belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
                belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
                belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
                symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
                largeChartUrl: `${process.env.baseURL}/symbols`,
            },
            srcFile.getNews
        );

        return () => {
            cleanupMarketStocksOverview();
            cleanupMarketStocksNews();
        };
    }, [isDarkMode]);
};