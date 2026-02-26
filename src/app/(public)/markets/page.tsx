'use client'

import { useEffect } from "react";
import { useDarkMode } from "../../components/dark-mode/DarkModeContext";
import { Heading } from "../../components/heading/Heading";
import { addTradingViewWidget } from "../../utils/utils";
import { srcFile } from "../../utils/tradingViewSrcFiles";
import { Banner } from "../../components/ads/Banner";

type InitWidget = (id: string, config: Record<string, unknown>, src: string) => (() => void) | undefined;

export default function Markets() {
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        const init: InitWidget = (containerId, config, callback) => {
            const el = document.getElementById(containerId);
            if (el) el.innerHTML = '';
            return addTradingViewWidget(containerId, config, callback);
        };

        const common = {
            width: '100%', height: '100%',
            largeChartUrl: `${baseUrl}/symbols`,
            colorTheme: theme,
            showSymbolLogo: true,
            isTransparent: true,
            locale: 'en',
        };

        const cleanupStocks = init('tradingview-widget-stocks', {
            ...common,
            symbolsGroups: [{ name: 'Stocks', originalName: 'Forex', symbols: [
                { name: 'NASDAQ:NVDA' }, { name: 'NASDAQ:TSLA' }, { name: 'NASDAQ:AVGO' },
                { name: 'NYSE:NIO' }, { name: 'NASDAQ:SMCI' }, { name: 'NASDAQ:AAPL' },
                { name: 'NASDAQ:AMZN' }, { name: 'NASDAQ:INTC' }, { name: 'NASDAQ:AMD' },
                { name: 'NASDAQ:MSFT' },
            ] }],
        }, srcFile.getStocks);

        const cleanupCrypto = init('tradingview-widget-cryptocurrency', {
            ...common,
            symbolsGroups: [{ name: 'Cryptocurrency', originalName: 'Forex', symbols: [
                { name: 'CRYPTOCAP:BTC' }, { name: 'CRYPTOCAP:ETH' }, { name: 'CRYPTOCAP:USDT.D' },
                { name: 'CRYPTOCAP:BNB' }, { name: 'CRYPTO:SOLUSD' }, { name: 'CRYPTOCAP:USDC' },
                { name: 'CRYPTOCAP:XRP' }, { name: 'CRYPTOCAP:STETH' }, { name: 'CRYPTOCAP:DOGE' },
            ] }],
        }, srcFile.getStocks);

        const cleanupForex = init('tradingview-widget-forex', {
            ...common,
            symbolsGroups: [{ name: 'Forex', originalName: 'Forex', symbols: [
                { name: 'FOREXCOM:EURUSD' }, { name: 'FOREXCOM:GBPUSD' }, { name: 'FOREXCOM:USDJPY' },
                { name: 'FOREXCOM:AUDUSD' }, { name: 'FOREXCOM:GBPJPY' }, { name: 'FOREXCOM:USDCAD' },
                { name: 'FOREXCOM:USDCHF' }, { name: 'FOREXCOM:NZDUSD' }, { name: 'FOREXCOM:EURJPY' },
                { name: 'FOREXCOM:EURGBP' },
            ] }],
        }, srcFile.getStocks);

        const cleanupEtfs = init('tradingview-widget-etfs', {
            ...common,
            symbolsGroups: [{ name: 'ETFs', originalName: 'Forex', symbols: [
                { name: 'AMEX:SPY' }, { name: 'NASDAQ:QQQ' }, { name: 'AMEX:IWM' },
                { name: 'NASDAQ:TQQQ' }, { name: 'AMEX:SOXL' }, { name: 'AMEX:DIA' },
                { name: 'NASDAQ:SMH' }, { name: 'NASDAQ:SQQQ' }, { name: 'AMEX:GLD' },
                { name: 'AMEX:XLF' },
            ] }],
        }, srcFile.getStocks);

        const cleanupMutualFunds = init('tradingview-widget-mutual-funds', {
            ...common,
            symbolsGroups: [{ name: 'Mutual Funds', originalName: 'Forex', symbols: [
                { name: 'AMEX:PHYS' }, { name: 'AMEX:PSLV' }, { name: 'OTC:LTCN' },
                { name: 'OTC:SRUUF' }, { name: 'NYSE:PTY' }, { name: 'NYSE:DXYZ' },
                { name: 'OTC:BCHG' }, { name: 'NYSE:PCN' }, { name: 'NYSE:PDI' },
                { name: 'NASDAQ:OXLC' },
            ] }],
        }, srcFile.getStocks);

        const cleanupTopNews = init('topnews-widget-container', {
            feedMode: 'all_symbols', isTransparent: true, displayMode: 'compact',
            width: '100%', height: '100%', colorTheme: theme, locale: 'en',
        }, srcFile.getTimeline);

        return () => {
            if (cleanupStocks) cleanupStocks();
            if (cleanupCrypto) cleanupCrypto();
            if (cleanupForex) cleanupForex();
            if (cleanupEtfs) cleanupEtfs();
            if (cleanupMutualFunds) cleanupMutualFunds();
            if (cleanupTopNews) cleanupTopNews();
        };
    }, [isDarkMode]);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="row justify-content-center">
                            <div className="col-lg-12 my-3">
                                <Heading textHeading="Stocks" showBtn={true} goTo="/markets/stocks" />
                                <div className="sidebar-wrap">
                                    <div className="!h-[26rem]" id="tradingview-widget-stocks">
                                        <div className="tradingview-widget-stocks"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 my-3">
                                <Heading textHeading="Cryptocurrency" showBtn={true} goTo="/markets/cryptocurrency" />
                                <div className="sidebar-wrap">
                                    <div className="!h-[26rem]" id="tradingview-widget-cryptocurrency">
                                        <div className="tradingview-widget-cryptocurrency"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img"><Banner /></div>
                            </div>
                            <div className="col-lg-12 my-3">
                                <Heading textHeading="Forex" showBtn={true} goTo="/markets/forex" />
                                <div className="sidebar-wrap">
                                    <div className="!h-[26rem]" id="tradingview-widget-forex">
                                        <div className="tradingview-widget-forex"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 my-3">
                                <Heading textHeading="ETFs" showBtn={true} goTo="/markets/etfs" />
                                <div className="sidebar-wrap">
                                    <div className="!h-[26rem]" id="tradingview-widget-etfs">
                                        <div className="tradingview-widget-etfs"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img"><Banner /></div>
                            </div>
                            <div className="col-lg-12 my-3">
                                <Heading textHeading="Mutual Funds" showBtn={true} goTo="/markets/mutual-funds" />
                                <div className="sidebar-wrap">
                                    <div className="!h-[26rem]" id="tradingview-widget-mutual-funds">
                                        <div className="tradingview-widget-mutual-funds"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img"><Banner /></div>
                            </div>
                            <div className="sidebar-widget-three">
                                <div className="!h-[64rem]" id="topnews-widget-container">
                                    <div className="tradingview-widget-container__widget"></div>
                                </div>
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