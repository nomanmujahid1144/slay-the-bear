'use client'

import { useEffect } from "react";
import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { Banner } from "@/app/components/ads/Banner";

type InitWidget = (id: string, config: Record<string, unknown>, src: string) => (() => void) | undefined;

const SIDEBAR_TABS = [
    { title: 'Forex', originalTitle: 'Forex', symbols: [
        { s: 'FX:EURUSD', d: 'EUR to USD' }, { s: 'FX:GBPUSD', d: 'GBP to USD' },
        { s: 'FX:USDJPY', d: 'USD to JPY' }, { s: 'FX:USDCHF', d: 'USD to CHF' },
        { s: 'FX:AUDUSD', d: 'AUD to USD' }, { s: 'FX:USDCAD', d: 'USD to CAD' },
    ] },
    { title: 'ETFs', symbols: [
        { s: 'AMEX:SPY' }, { s: 'NASDAQ:QQQ' }, { s: 'AMEX:IWM' },
        { s: 'NASDAQ:TLT' }, { s: 'AMEX:SOXL' }, { s: 'NASDAQ:TQQQ' },
    ] },
    { title: 'Mutual Funds', symbols: [
        { s: 'AMEX:PHYS' }, { s: 'AMEX:PSLV' }, { s: 'OTC:LTCN' },
        { s: 'NYSE:PTY' }, { s: 'OTC:SRUUF' }, { s: 'NYSE:DXYZ' },
    ] },
];

export default function MutualFunds() {
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const gridLineColor = isDarkMode ? 'rgba(32, 33, 36, 0)' : 'rgba(240, 243, 250, 0)';
        const scaleFontColor = isDarkMode ? 'rgba(220, 220, 220, 1)' : 'rgba(19, 23, 34, 1)';

        const init: InitWidget = (containerId, config, callback) => {
            const el = document.getElementById(containerId);
            if (el) el.innerHTML = '';
            return addTradingViewWidget(containerId, config, callback);
        };

        const chartColors = {
            plotLineColorGrowing: 'rgb(41,191,240, 1)',
            plotLineColorFalling: 'rgb(15,96,139, 1)',
            gridLineColor,
            scaleFontColor,
            belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
            belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
            belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
            belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
            symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
        };

        const cleanupMutualFunds = init('tradingview-widget-mutual-funds', {
            width: '100%', height: '100%',
            largeChartUrl: `${baseUrl}/symbols`,
            colorTheme: theme,
            symbolsGroups: [{ name: 'Mutual Funds', originalName: 'Forex', symbols: [
                { name: 'AMEX:PHYS' }, { name: 'AMEX:PSLV' }, { name: 'OTC:LTCN' },
                { name: 'OTC:SRUUF' }, { name: 'NYSE:PTY' }, { name: 'NYSE:DXYZ' },
                { name: 'OTC:BCHG' }, { name: 'NYSE:PCN' }, { name: 'NYSE:PDI' },
                { name: 'NASDAQ:OXLC' },
            ] }],
            showSymbolLogo: true, isTransparent: true, locale: 'en',
        }, srcFile.getStocks);

        const cleanupMutualFundsNews = init('tradingview-widget-mutual-funds-news', {
            feedMode: 'market', market: 'stock', isTransparent: true,
            displayMode: 'regular', width: '100%', height: '100%',
            colorTheme: theme, locale: 'en',
        }, srcFile.getTimeline);

        const cleanupMarketStocksNews = init('tradingview-widget-market-stocks-news', {
            ...chartColors,
            colorTheme: theme, dateRange: 'ALL', exchange: 'US', showChart: true,
            locale: 'en', width: '100%', height: '100%', isTransparent: true,
            showSymbolLogo: false, showFloatingTooltip: true,
            largeChartUrl: `${baseUrl}/symbols`,
        }, srcFile.getNews);

        const cleanupMarketStocksOverview = init('tradingview-widget-market-stocks-overview', {
            ...chartColors,
            colorTheme: theme, dateRange: 'ALL', showChart: true, locale: 'en',
            width: '100%', height: '100%', isTransparent: true,
            showSymbolLogo: false, showFloatingTooltip: true,
            largeChartUrl: `${baseUrl}/symbols`,
            tabs: SIDEBAR_TABS,
        }, srcFile.getMarketOverview);

        return () => {
            if (cleanupMutualFunds) cleanupMutualFunds();
            if (cleanupMutualFundsNews) cleanupMutualFundsNews();
            if (cleanupMarketStocksNews) cleanupMarketStocksNews();
            if (cleanupMarketStocksOverview) cleanupMarketStocksOverview();
        };
    }, [isDarkMode]);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading textHeading="Mutual Funds" showBtn={false} />
                            <div className="!h-[26rem]" id="tradingview-widget-mutual-funds">
                                <div className="tradingview-widget-mutual-funds"></div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img"><Banner /></div>
                            </div>
                            <Heading textHeading="Mutual Funds News" showBtn={false} />
                            <div className="!h-[26rem]" id="tradingview-widget-mutual-funds-news">
                                <div className="tradingview-widget-mutual-funds-news"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img"><Banner /></div>
                            </div>
                            <div className="!h-[36rem]" id="tradingview-widget-market-stocks-overview">
                                <div className="tradingview-widget-market-stocks-overview"></div>
                            </div>
                            <hr className="my-3" />
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img"><Banner /></div>
                            </div>
                            <hr className="my-3" />
                            <div className="!h-[34rem]" id="tradingview-widget-market-stocks-news">
                                <div className="tradingview-widget-market-stocks-news"></div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img"><Banner /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}