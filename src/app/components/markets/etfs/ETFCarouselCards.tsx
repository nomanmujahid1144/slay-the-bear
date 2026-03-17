// src/app/components/markets/etfs/ETFCarouselCards.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { marketService } from '@/services/market.service';
import type { Quote } from '@/types/markets';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CategoryData {
    id: string;
    title: string;
    icon: string;
    symbols: string[];
    description: string;
}

interface QuoteWithChart extends Quote {
    chartData: Array<{ value: number }>;
}

const CATEGORIES: CategoryData[] = [
    {
        id: 'index',
        title: 'Index ETFs',
        icon: '📊',
        description: 'Track major market indices',
        symbols: ['SPY', 'QQQ', 'IWM', 'DIA', 'VTI', 'VOO']
    },
    {
        id: 'sector',
        title: 'Sector ETFs',
        icon: '🏭',
        description: 'Industry-specific exposure',
        symbols: ['XLK', 'XLF', 'XLE', 'XLV', 'XLI', 'XLP']
    },
    {
        id: 'tech',
        title: 'Technology',
        icon: '💻',
        description: 'Tech & semiconductor focus',
        symbols: ['VGT', 'SOXX', 'SMH', 'IGM', 'XSD', 'QTEC']
    },
    {
        id: 'international',
        title: 'International',
        icon: '🌍',
        description: 'Global market exposure',
        symbols: ['VEA', 'VWO', 'EFA', 'IEFA', 'EEM', 'VGK']
    },
    {
        id: 'bonds',
        title: 'Bonds',
        icon: '🛡️',
        description: 'Fixed income securities',
        symbols: ['AGG', 'TLT', 'BND', 'SHY', 'LQD', 'HYG']
    },
    {
        id: 'commodity',
        title: 'Commodities',
        icon: '🪙',
        description: 'Precious metals & resources',
        symbols: ['GLD', 'SLV', 'USO', 'DBA', 'UNG', 'PDBC']
    },
];

// Generate realistic larger chart data (20 points for main chart)
const generateLargeChartData = (quotes: Quote[]): Array<{ value: number }> => {
    if (quotes.length === 0) return [];

    const avgChange = quotes.reduce((sum, q) => sum + q.change, 0) / quotes.length;
    const avgPrice = quotes.reduce((sum, q) => sum + q.last, 0) / quotes.length;

    const points = 20;
    const data: Array<{ value: number }> = [];
    const startPrice = avgPrice - avgChange;

    // Minimum volatility for visible curves
    const baseVolatility = avgPrice * 0.015; // 1.5% minimum
    const volatility = Math.max(baseVolatility, Math.abs(avgChange) * 0.6);

    let price = startPrice;

    for (let i = 0; i < points; i++) {
        const progress = i / (points - 1);

        if (i === 0) {
            data.push({ value: startPrice });
            price = startPrice;
            continue;
        }

        if (i === points - 1) {
            data.push({ value: avgPrice });
            continue;
        }

        // Multiple sine waves for natural curves
        const wave1 = Math.sin(progress * Math.PI * 2.5) * volatility * 0.5;
        const wave2 = Math.sin(progress * Math.PI * 4.3 + 0.7) * volatility * 0.3;
        const wave3 = Math.cos(progress * Math.PI * 3.1) * volatility * 0.2;

        // Trend
        const trend = avgChange * progress;

        // Random component
        const random = (Math.random() - 0.5) * volatility * 1.2;

        // Momentum
        const momentum = (price - data[i - 1].value) * 0.3;

        price = startPrice + trend + wave1 + wave2 + wave3 + random + momentum;

        // Bounds checking
        const maxDev = Math.abs(avgChange) * 1.5 + baseVolatility * 2;
        const expected = startPrice + (avgChange * progress);
        if (Math.abs(price - expected) > maxDev) {
            price = expected + (Math.random() - 0.5) * maxDev * 0.7;
        }

        data.push({ value: price });
    }

    return data;
};

// Generate mini chart data (7 points)
const generateMiniChartData = (currentPrice: number, change: number): Array<{ value: number }> => {
    const points = 7;
    const data: Array<{ value: number }> = [];
    const startPrice = currentPrice - change;

    // Minimum volatility
    const baseVol = currentPrice * 0.012; // 1.2% minimum
    const volatility = Math.max(baseVol, Math.abs(change) * 0.5);

    let price = startPrice;

    for (let i = 0; i < points; i++) {
        const progress = i / (points - 1);

        if (i === 0) {
            data.push({ value: startPrice });
            price = startPrice;
            continue;
        }

        if (i === points - 1) {
            data.push({ value: currentPrice });
            continue;
        }

        // Wave patterns
        const wave = Math.sin(progress * Math.PI * (2.2 + Math.random() * 0.5)) * volatility;
        
        // Trend
        const trend = change * progress;

        // Zigzag effect
        const zigzag = (i % 2 === 0 ? 1 : -1) * volatility * 0.4;

        // Random
        const random = (Math.random() - 0.5) * volatility * 1.5;

        // Momentum
        const momentum = (price - data[i - 1].value) * 0.35;

        price = startPrice + trend + wave + zigzag + random + momentum;

        // Bounds
        const maxDev = Math.abs(change) * 0.8 + baseVol;
        const expected = startPrice + (change * progress);
        if (Math.abs(price - expected) > maxDev) {
            price = expected + (Math.random() - 0.5) * maxDev;
        }

        data.push({ value: price });
    }

    return data;
};

export const ETFCarouselCards = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [categoryQuotes, setCategoryQuotes] = useState<Record<string, QuoteWithChart[]>>({});
    const [categoryCharts, setCategoryCharts] = useState<Record<string, Array<{ value: number }>>>({});
    const [loading, setLoading] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const allQuotesData: Record<string, QuoteWithChart[]> = {};
            const allChartsData: Record<string, Array<{ value: number }>> = {};

            for (const category of CATEGORIES) {
                const { data } = await marketService.getQuotes(category.symbols);
                const quotes = data.data || [];
                
                // Generate chart data ONCE and attach to each quote
                const quotesWithCharts: QuoteWithChart[] = quotes.map(quote => ({
                    ...quote,
                    chartData: generateMiniChartData(quote.last, quote.change)
                }));

                allQuotesData[category.id] = quotesWithCharts;
                
                // Generate large chart for category
                allChartsData[category.id] = generateLargeChartData(quotes);
            }

            setCategoryQuotes(allQuotesData);
            setCategoryCharts(allChartsData);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [fetchData]);

    // Auto-carousel every 5 seconds
    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % CATEGORIES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoPlay]);

    const handlePrev = () => {
        setAutoPlay(false);
        setActiveIndex(prev => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
    };

    const handleNext = () => {
        setAutoPlay(false);
        setActiveIndex(prev => (prev + 1) % CATEGORIES.length);
    };

    const handleDotClick = (index: number) => {
        setAutoPlay(false);
        setActiveIndex(index);
    };

    if (loading) {
        return (
            <div className="etf-carousel-loading">
                <FontAwesomeIcon icon="spinner" spin />
                <p>Loading ETF carousel...</p>
            </div>
        );
    }

    const activeCategory = CATEGORIES[activeIndex];
    const quotes = categoryQuotes[activeCategory.id] || [];
    const largeChartData = categoryCharts[activeCategory.id] || [];
    
    const avgChange = quotes.length > 0
        ? quotes.reduce((sum, q) => sum + q.change_percentage, 0) / quotes.length
        : 0;
    const isPositive = avgChange >= 0;

    return (
        <div className="etf-carousel-container">
            {/* Card Content */}
            <div className="etf-carousel-card">
                {/* Header with Navigation */}
                <div className="etf-carousel-header">
                    <div className="etf-carousel-title-wrap">
                        <span className="etf-carousel-icon">{activeCategory.icon}</span>
                        <div>
                            <h3 className="etf-carousel-title">{activeCategory.title}</h3>
                            <p className="etf-carousel-desc">{activeCategory.description}</p>
                        </div>
                    </div>
                    
                    {/* Navigation Controls */}
                    <div className="etf-carousel-nav-controls">
                        <button className="etf-carousel-nav-btn" onClick={handlePrev} aria-label="Previous category">
                            <FontAwesomeIcon icon="chevron-left" />
                        </button>
                        <span className="etf-carousel-counter">
                            {activeIndex + 1} / {CATEGORIES.length}
                        </span>
                        <button className="etf-carousel-nav-btn" onClick={handleNext} aria-label="Next category">
                            <FontAwesomeIcon icon="chevron-right" />
                        </button>
                    </div>
                </div>

                {/* Main Chart */}
                <div className="etf-carousel-main-chart">
                    <div className="etf-carousel-chart-stats">
                        <span className="etf-carousel-avg-label">Market Average</span>
                        <span className={`etf-carousel-avg-value ${isPositive ? 'positive' : 'negative'}`}>
                            {isPositive ? '↗' : '↘'} {avgChange.toFixed(2)}%
                        </span>
                    </div>

                    {largeChartData.length > 0 && (() => {
                        const values = largeChartData.map(d => d.value);
                        const min = Math.min(...values);
                        const max = Math.max(...values);
                        const range = max - min;
                        const padding = range * 0.2; // 20% padding
                        
                        return (
                            <ResponsiveContainer width="100%" height={160}>
                                <LineChart data={largeChartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                                    <YAxis hide domain={[min - padding, max + padding]} />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={isPositive ? 'var(--tg-green)' : 'var(--tg-red)'}
                                        strokeWidth={3}
                                        dot={false}
                                        isAnimationActive={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        );
                    })()}
                </div>

                {/* ETF Grid */}
                <div className="etf-carousel-grid">
                    {quotes.map((quote) => {
                        const quotePositive = quote.change >= 0;
                        const chartColor = quotePositive ? 'var(--tg-green)' : 'var(--tg-red)';

                        return (
                            <div key={quote.symbol} className="etf-carousel-item">
                                <div className="etf-carousel-item-header">
                                    <span className="etf-carousel-item-symbol">{quote.symbol}</span>
                                    <span className={`etf-carousel-item-change ${quotePositive ? 'positive' : 'negative'}`}>
                                        {quotePositive ? '+' : ''}{quote.change_percentage.toFixed(2)}%
                                    </span>
                                </div>

                                <div className="etf-carousel-item-chart">
                                    {(() => {
                                        const values = quote.chartData.map(d => d.value);
                                        const min = Math.min(...values);
                                        const max = Math.max(...values);
                                        const range = max - min;
                                        const padding = range * 0.2;
                                        
                                        return (
                                            <ResponsiveContainer width="100%" height={50}>
                                                <LineChart data={quote.chartData} margin={{ top: 5, right: 2, bottom: 5, left: 2 }}>
                                                    <YAxis hide domain={[min - padding, max + padding]} />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke={chartColor}
                                                        strokeWidth={2}
                                                        dot={false}
                                                        isAnimationActive={false}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        );
                                    })()}
                                </div>

                                <span className="etf-carousel-item-price">
                                    ${quote.last.toFixed(2)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="etf-carousel-dots">
                {CATEGORIES.map((_, index) => (
                    <button
                        key={index}
                        className={`etf-carousel-dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};