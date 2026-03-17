// 'use client'

// import { useEffect } from "react";
// import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
// import { Heading } from "@/app/components/heading/Heading";
// import { srcFile } from "@/app/utils/tradingViewSrcFiles";
// import { addTradingViewWidget } from "@/app/utils/utils";
// import { Banner } from "@/app/components/ads/Banner";

// type InitWidget = (id: string, config: Record<string, unknown>, src: string) => (() => void) | undefined;

// const SIDEBAR_TABS = [
//     { title: 'Forex', originalTitle: 'Forex', symbols: [
//         { s: 'FX:EURUSD', d: 'EUR to USD' }, { s: 'FX:GBPUSD', d: 'GBP to USD' },
//         { s: 'FX:USDJPY', d: 'USD to JPY' }, { s: 'FX:USDCHF', d: 'USD to CHF' },
//         { s: 'FX:AUDUSD', d: 'AUD to USD' }, { s: 'FX:USDCAD', d: 'USD to CAD' },
//     ] },
//     { title: 'ETFs', symbols: [
//         { s: 'AMEX:SPY' }, { s: 'NASDAQ:QQQ' }, { s: 'AMEX:IWM' },
//         { s: 'NASDAQ:TLT' }, { s: 'AMEX:SOXL' }, { s: 'NASDAQ:TQQQ' },
//     ] },
//     { title: 'Mutual Funds', symbols: [
//         { s: 'AMEX:PHYS' }, { s: 'AMEX:PSLV' }, { s: 'OTC:LTCN' },
//         { s: 'NYSE:PTY' }, { s: 'OTC:SRUUF' }, { s: 'NYSE:DXYZ' },
//     ] },
// ];

// const CHART_COLORS = {
//     plotLineColorGrowing: 'rgb(41,191,240, 1)',
//     plotLineColorFalling: 'rgb(15,96,139, 1)',
//     gridLineColor: 'rgba(240, 243, 250, 0)',
//     scaleFontColor: 'rgba(19, 23, 34, 1)',
//     belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
//     belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
//     belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
//     belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
//     symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
// };

// export default function Stocks() {
//     const { isDarkMode } = useDarkMode();

//     useEffect(() => {
//         const theme = isDarkMode ? 'dark' : 'light';
//         const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//         const init: InitWidget = (containerId, config, callback) => {
//             const el = document.getElementById(containerId);
//             if (el) el.innerHTML = '';
//             return addTradingViewWidget(containerId, config, callback);
//         };

//         const cleanupAllStocks = init('tradingview-widget-markets-stocks', {
//             width: '100%', height: '100%',
//             largeChartUrl: `${baseUrl}/symbols`,
//             colorTheme: theme,
//             symbolsGroups: [{ name: 'Stocks', originalName: 'Indices', symbols: [
//                 { name: 'NYSE:BA' }, { name: 'NYSE:CVX' }, { name: 'NYSE:CAT' },
//                 { name: 'NASDAQ:INTC' }, { name: 'NASDAQ:MSFT' }, { name: 'NYSE:DIS' },
//                 { name: 'NYSE:DOW' }, { name: 'NASDAQ:CSCO' }, { name: 'NYSE:GS' },
//                 { name: 'NYSE:JPM' }, { name: 'NYSE:KO' }, { name: 'NYSE:MCD' },
//                 { name: 'NYSE:MRK' }, { name: 'NYSE:MMM' }, { name: 'NASDAQ:AAPL' },
//                 { name: 'NASDAQ:AMZN' }, { name: 'NASDAQ:AMGN' }, { name: 'NYSE:WMT' },
//                 { name: 'NYSE:HD' }, { name: 'NYSE:IBM' }, { name: 'NYSE:VZ' },
//                 { name: 'NYSE:TRV' }, { name: 'NYSE:JNJ' }, { name: 'NYSE:AXP' },
//                 { name: 'NASDAQ:HON' }, { name: 'NYSE:CRM' }, { name: 'NYSE:V' },
//                 { name: 'NYSE:UNH' }, { name: 'NYSE:NKE' }, { name: 'NYSE:PG' },
//             ] }],
//             showSymbolLogo: true, isTransparent: true, locale: 'en',
//         }, srcFile.getStocks);

//         const cleanupAllStocksNews = init('tradingview-widget-markets-stocks-news', {
//             feedMode: 'market', market: 'stock', isTransparent: true,
//             displayMode: 'regular', width: '100%', height: '100%',
//             colorTheme: theme, locale: 'en',
//         }, srcFile.getTimeline);

//         const cleanupMarketStocksNews = init('tradingview-widget-market-stocks-news', {
//             ...CHART_COLORS,
//             colorTheme: theme, dateRange: 'ALL', exchange: 'US', showChart: true,
//             locale: 'en', width: '100%', height: '100%', isTransparent: true,
//             showSymbolLogo: false, showFloatingTooltip: true,
//             largeChartUrl: `${baseUrl}/symbols`,
//         }, srcFile.getNews);

//         const cleanupMarketStocksOverview = init('tradingview-widget-market-stocks-overview', {
//             ...CHART_COLORS,
//             colorTheme: theme, dateRange: 'ALL', showChart: true, locale: 'en',
//             width: '100%', height: '100%', isTransparent: true,
//             showSymbolLogo: false, showFloatingTooltip: true,
//             largeChartUrl: `${baseUrl}/symbols`,
//             tabs: SIDEBAR_TABS,
//         }, srcFile.getMarketOverview);

//         return () => {
//             if (cleanupAllStocks) cleanupAllStocks();
//             if (cleanupAllStocksNews) cleanupAllStocksNews();
//             if (cleanupMarketStocksNews) cleanupMarketStocksNews();
//             if (cleanupMarketStocksOverview) cleanupMarketStocksOverview();
//         };
//     }, [isDarkMode]);

//     return (
//         <section className="top-news-post-area pt-70 pb-70">
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-xl-9">
//                         <div className="sidebar-wrap">
//                             <Heading textHeading="Stock Market" showBtn={false} />
//                             <div className="!h-[71rem]" id="tradingview-widget-markets-stocks">
//                                 <div className="tradingview-widget-markets-stocks"></div>
//                             </div>
//                             <div className="sidebar-widget sidebar-widget-two">
//                                 <div className="sidebar-img"><Banner /></div>
//                             </div>
//                             <Heading textHeading="News" showBtn={false} />
//                             <div className="!h-[71rem]" id="tradingview-widget-markets-stocks-news">
//                                 <div className="tradingview-widget-markets-stocks-news"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-3 col-lg-8">
//                         <div className="sidebar-wrap-three">
//                             <div className="sidebar-widget sidebar-widget-two">
//                                 <div className="sidebar-img"><Banner /></div>
//                             </div>
//                             <div className="!h-[36rem]" id="tradingview-widget-market-stocks-overview">
//                                 <div className="tradingview-widget-market-stocks-overview"></div>
//                             </div>
//                             <hr className="my-1" />
//                             <div className="sidebar-widget sidebar-widget-two">
//                                 <div className="sidebar-img"><Banner /></div>
//                             </div>
//                             <hr className="my-1" />
//                             <div className="!h-[34rem]" id="tradingview-widget-market-stocks-news">
//                                 <div className="tradingview-widget-market-stocks-news"></div>
//                             </div>
//                             <div className="sidebar-widget sidebar-widget-two">
//                                 <div className="sidebar-img"><Banner /></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// src/app/(public)/markets/stocks/page.tsx

'use client';

import { Heading } from "@/app/components/heading/Heading";
import { Banner } from "@/app/components/ads/Banner";
import { MarketDataTable } from "@/app/components/table/MarketDataTable";
import { MarketMovers } from "@/app/components/markets/shared/MarketMovers";
import { MarketNews } from "@/app/components/markets/shared/MarketNews";
import { newsService } from "@/services/news.service";

export default function Stocks() {
    // Popular stocks to display
    const popularStocks = [
        'AAPL',  // Apple
        'MSFT',  // Microsoft
        'GOOGL', // Google
        'AMZN',  // Amazon
        'NVDA',  // NVIDIA
        'TSLA',  // Tesla
        'META',  // Meta
        'BRK.B', // Berkshire Hathaway
        'JPM',   // JPMorgan Chase
        'V',     // Visa
        'WMT',   // Walmart
        'JNJ',   // Johnson & Johnson
        'PG',    // Procter & Gamble
        'MA',    // Mastercard
        'HD',    // Home Depot
        'BAC',   // Bank of America
        'XOM',   // Exxon Mobil
        'CVX',   // Chevron
        'ABBV',  // AbbVie
        'KO',    // Coca-Cola
        'PEP',   // PepsiCo
        'COST',  // Costco
        'DIS',   // Disney
        'NFLX',  // Netflix
        'CSCO',  // Cisco
    ];

    // Market Movers configuration for stocks
    const stockMoversTabs = [
        {
            id: 'active',
            label: 'Active',
            symbols: ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'META']
        },
        {
            id: 'gainers',
            label: 'Gainers',
            symbols: ['NVDA', 'META', 'GOOGL', 'MSFT', 'AMZN', 'AAPL']
        },
        {
            id: 'losers',
            label: 'Losers',
            symbols: ['TSLA', 'NFLX', 'PYPL', 'SNAP', 'UBER', 'LYFT']
        },
    ];

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    {/* Main Content - Left Side (9 columns) */}
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            {/* Stock Market Table */}
                            <Heading textHeading="Stock Market" showBtn={false} />
                            <div className="markets-widget-card">
                                <MarketDataTable
                                    symbols={popularStocks}
                                    type="stocks"
                                    autoRefresh={true}
                                    refreshInterval={30000}
                                    showHeader={true}
                                />
                            </div>

                            {/* Ad Banner */}
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <Banner />
                                </div>
                            </div>

                            {/* Market News Section */}
                            <Heading textHeading="Market News" showBtn={false} />
                            <MarketNews 
                                fetchNews={newsService.getStocksNews}
                                refreshInterval={300000}
                                itemsPerPage={20}
                            />
                        </div>
                    </div>

                    {/* Sidebar - Right Side (3 columns) */}
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            {/* Ad Banner */}
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <Banner />
                                </div>
                            </div>

                            {/* Market Movers: Active | Gainers | Losers */}
                            <MarketMovers
                                tabs={stockMoversTabs}
                                defaultTab="active"
                                refreshInterval={30000}
                            />

                            <hr className="my-1" />

                            {/* Ad Banner */}
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <Banner />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}