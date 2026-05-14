// src/app/(public)/markets/cryptocurrency/page.tsx

'use client';

import { Heading } from "@/app/components/heading/Heading";
import { Banner } from "@/app/components/ads/Banner";
import { MarketDataTable } from "@/app/components/table/MarketDataTable";
import { MarketMovers } from "@/app/components/markets/shared/MarketMovers";
import { MarketNews } from "@/app/components/markets/shared/MarketNews";
import { newsService } from "@/services/news.service";

export default function Cryptocurrency() {

    // Popular crypto symbols — uses AV CURRENCY_EXCHANGE_RATE via our backend
    const popularCryptos = [
        'BTC',  // Bitcoin
        'ETH',  // Ethereum
        'XRP',  // XRP
        'SOL',  // Solana
        'DOGE', // Dogecoin
        'LTC',  // Litecoin
        'DOT',  // Polkadot
        'XLM',  // Stellar
    ];

    // Market Movers tabs for Crypto
    // These use top-gainers-losers from Alpha Vantage (real data)
    // For now using well-known crypto-related stock tickers that Tradier supports
    // until we build a dedicated AV-powered MarketMovers for crypto
    const cryptoMoversTabs = [
        {
            id: 'active',
            label: 'Active',
            symbols: ['COIN', 'MSTR', 'MARA', 'RIOT', 'HUT', 'CLSK']
        },
        {
            id: 'gainers',
            label: 'Gainers',
            symbols: ['COIN', 'MSTR', 'MARA', 'RIOT', 'CIFR', 'BTBT']
        },
        {
            id: 'losers',
            label: 'Losers',
            symbols: ['MARA', 'RIOT', 'HUT', 'CLSK', 'BTBT', 'CIFR']
        },
    ];

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">

                    {/* Main Content - Left Side (9 columns) */}
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">

                            {/* Crypto Market Table */}
                            <Heading textHeading="Cryptocurrency Market" showBtn={false} />
                            <div className="markets-widget-card">
                                <MarketDataTable
                                    symbols={popularCryptos}
                                    type="crypto"
                                    autoRefresh={true}
                                    refreshInterval={60000}
                                    showHeader={true}
                                />
                            </div>

                            {/* Ad Banner */}
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <Banner />
                                </div>
                            </div>

                            {/* Crypto News Section */}
                            <Heading textHeading="Cryptocurrency News" showBtn={false} />
                            <MarketNews
                                fetchNews={newsService.getCryptoNews}
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

                            {/* Crypto Movers: Active | Gainers | Losers */}
                            <MarketMovers
                                tabs={cryptoMoversTabs}
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