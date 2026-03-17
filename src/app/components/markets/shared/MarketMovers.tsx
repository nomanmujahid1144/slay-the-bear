// src/app/components/markets/shared/MarketMovers.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { marketService } from '@/services/market.service';
import type { Quote } from '@/types/markets';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Heading } from '../../heading/Heading';

interface Tab {
    id: string;
    label: string;
    symbols: string[];
}

interface MarketMoversProps {
    heading?: string;
    tabs: Tab[];
    defaultTab?: string;
    refreshInterval?: number;
}

const TIMERANGES = ['1D', '1M', '3M', '1Y', '5Y', 'All'];

// Generate realistic chart data
const generateChartData = (currentPrice: number, change: number) => {
    const points = 20;
    const data = [];
    
    for (let i = 0; i < points; i++) {
        const progress = i / (points - 1);
        const trend = currentPrice - change + (change * progress);
        const variance = (Math.random() - 0.5) * (Math.abs(change) * 0.3);
        data.push({ value: trend + variance });
    }
    
    return data;
};

export const MarketMovers = ({ 
    heading = "Market Movers",
    tabs,
    defaultTab,
    refreshInterval = 30000
}: MarketMoversProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
    const [activeTimerange, setActiveTimerange] = useState('1D');
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);

    const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

    const fetchQuotes = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await marketService.getQuotes(currentTab.symbols);
            setQuotes(data.data || []);
        } catch (err) {
            console.error('Error fetching quotes:', err);
        } finally {
            setLoading(false);
        }
    }, [currentTab]);

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    // Auto-refresh
    useEffect(() => {
        const interval = setInterval(fetchQuotes, refreshInterval);
        return () => clearInterval(interval);
    }, [fetchQuotes, refreshInterval]);

    const formatPrice = (price: number) => price.toFixed(2);
    const formatChange = (change: number) => change.toFixed(2);
    const formatPercent = (percent: number) => percent.toFixed(2);

    return (
        <div className="market-movers-widget">
            {/* Optional Heading */}
            {/* {heading && (
                <Heading textHeading={heading} showBtn={false} />
            )} */}

            {/* Tabs */}
            <div className="market-movers-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`market-movers-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Large Chart Area */}
            <div className="market-movers-chart-area">
                <div className="market-movers-chart-placeholder">
                    {/* Timeline buttons */}
                    <div className="market-movers-timeline">
                        {TIMERANGES.map((range) => (
                            <button
                                key={range}
                                className={`market-movers-timeline-btn ${activeTimerange === range ? 'active' : ''}`}
                                onClick={() => setActiveTimerange(range)}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    
                    {/* Main chart placeholder */}
                    <div className="market-movers-main-chart">
                        <p>Aggregate chart coming soon</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="market-movers-list">
                {loading ? (
                    <div className="market-movers-loading">Loading...</div>
                ) : (
                    quotes.map((quote) => {
                        const isPositive = quote.change >= 0;
                        const chartData = generateChartData(quote.last, quote.change);
                        const chartColor = isPositive ? 'var(--tg-green)' : 'var(--tg-red)';

                        return (
                            <div key={quote.symbol} className="market-mover-item">
                                <div className="market-mover-left">
                                    <div className="market-mover-symbol">
                                        {quote.symbol}
                                        <sup className="market-mover-sup">⬥</sup>
                                    </div>
                                    <div className="market-mover-desc">
                                        {quote.description}
                                    </div>
                                </div>

                                {/* Mini Chart */}
                                <div className="market-mover-chart">
                                    <ResponsiveContainer width={80} height={40}>
                                        <LineChart data={chartData}>
                                            <YAxis domain={['dataMin', 'dataMax']} hide />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke={chartColor}
                                                strokeWidth={1.5}
                                                dot={false}
                                                isAnimationActive={true}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="market-mover-right">
                                    <div className="market-mover-price">
                                        {formatPrice(quote.last)}
                                    </div>
                                    <div className={`market-mover-change ${isPositive ? 'positive' : 'negative'}`}>
                                        {isPositive ? '+' : ''}{formatChange(quote.change)} {isPositive ? '+' : ''}{formatPercent(quote.change_percentage)}%
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};