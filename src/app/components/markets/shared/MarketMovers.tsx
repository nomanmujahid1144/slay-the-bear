// src/app/components/markets/shared/MarketMovers.tsx

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { marketService } from '@/services/market.service';
import type { Quote } from '@/types/markets';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { Heading } from '../../heading/Heading';
import { useMarketWebSocket } from '@/hooks/useMarketWebSocket';
import { formatPrice, formatChange, formatPercent } from '@/utils/format';

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

interface FieldChange {
    symbol: string;
    field: keyof Quote;
    timestamp: number;
    direction: 'up' | 'down' | 'neutral';
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
    const [changedFields, setChangedFields] = useState<Map<string, FieldChange>>(new Map());

    const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];
    const previousQuotesRef = useRef<Map<string, Quote>>(new Map());
    const lastUpdateTimeRef = useRef<Map<string, number>>(new Map());
    const UPDATE_COOLDOWN_MS = 300;

    /**
     * Handle WebSocket quote updates
     */
    const handleQuoteUpdate = useCallback((updatedQuote: Quote) => {
        const now = Date.now();
        const lastUpdateTime = lastUpdateTimeRef.current.get(updatedQuote.symbol) || 0;
        
        // Cooldown check
        if (now - lastUpdateTime < UPDATE_COOLDOWN_MS) {
            return;
        }

        lastUpdateTimeRef.current.set(updatedQuote.symbol, now);

        setQuotes(prevQuotes => {
            const index = prevQuotes.findIndex(q => q.symbol === updatedQuote.symbol);
            if (index === -1) return prevQuotes;

            const currentQuote = prevQuotes[index];
            const previousQuote = previousQuotesRef.current.get(updatedQuote.symbol) || currentQuote;

            // Calculate change and change_percentage
            let calculatedChange = currentQuote.change;
            let calculatedChangePercent = currentQuote.change_percentage;

            if (updatedQuote.last !== undefined && updatedQuote.last !== null) {
                const prevClose = currentQuote.prevclose || currentQuote.last;
                calculatedChange = updatedQuote.last - prevClose;
                calculatedChangePercent = prevClose !== 0 
                    ? (calculatedChange / prevClose) * 100 
                    : 0;
            }

            // Merge quote data
            const mergedQuote: Quote = {
                ...currentQuote,
                ...(updatedQuote.last !== undefined && updatedQuote.last !== null ? { 
                    last: updatedQuote.last,
                    change: calculatedChange,
                    change_percentage: calculatedChangePercent
                } : {}),
                ...(updatedQuote.volume !== undefined && updatedQuote.volume !== null ? { volume: updatedQuote.volume } : {}),
                ...(updatedQuote.bid !== undefined && updatedQuote.bid !== null ? { bid: updatedQuote.bid } : {}),
                ...(updatedQuote.ask !== undefined && updatedQuote.ask !== null ? { ask: updatedQuote.ask } : {}),
            };

            // Track changed fields for animation
            const newChanges = new Map<string, FieldChange>();
            const fieldsToCheck: (keyof Quote)[] = ['last', 'change', 'change_percentage'];
            
            fieldsToCheck.forEach(field => {
                const oldValue = previousQuote[field];
                const newValue = mergedQuote[field];
                
                if (oldValue !== newValue && newValue !== undefined && newValue !== null) {
                    let direction: 'up' | 'down' | 'neutral' = 'neutral';
                    
                    if (typeof oldValue === 'number' && typeof newValue === 'number') {
                        direction = newValue > oldValue ? 'up' : newValue < oldValue ? 'down' : 'neutral';
                    }
                    
                    const key = `${updatedQuote.symbol}-${field}`;
                    newChanges.set(key, {
                        symbol: updatedQuote.symbol,
                        field,
                        timestamp: now,
                        direction
                    });
                }
            });

            // Update animations
            if (newChanges.size > 0) {
                setChangedFields(prev => {
                    const updated = new Map(prev);
                    newChanges.forEach((value, key) => updated.set(key, value));
                    return updated;
                });

                // Clear animations after 1.5 seconds
                setTimeout(() => {
                    setChangedFields(prev => {
                        const updated = new Map(prev);
                        newChanges.forEach((_, key) => updated.delete(key));
                        return updated;
                    });
                }, 1500);
            }

            // Store as previous
            previousQuotesRef.current.set(updatedQuote.symbol, mergedQuote);

            const newQuotes = [...prevQuotes];
            newQuotes[index] = mergedQuote;
            return newQuotes;
        });
    }, []);

    /**
     * Initialize WebSocket
     */
    const { isConnected } = useMarketWebSocket({
        symbols: currentTab.symbols,
        onQuoteUpdate: handleQuoteUpdate,
        enabled: true
    });

    /**
     * Get animation class for a field
     */
    const getFieldChangeClass = (symbol: string, field: keyof Quote): string => {
        const key = `${symbol}-${field}`;
        const change = changedFields.get(key);
        
        if (!change) return '';
        
        const age = Date.now() - change.timestamp;
        if (age > 1500) return '';
        
        return `field-changed field-${change.direction}`;
    };

    const fetchQuotes = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await marketService.getQuotes(currentTab.symbols);
            const newQuotes = data.data || [];
            
            // Initialize previous quotes ref
            newQuotes.forEach(quote => {
                previousQuotesRef.current.set(quote.symbol, quote);
            });
            
            setQuotes(newQuotes);
        } catch (err) {
            console.error('Error fetching quotes:', err);
        } finally {
            setLoading(false);
        }
    }, [currentTab.symbols]); // FIXED: Use currentTab.symbols directly

    // FIXED: Re-fetch when tab changes
    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    // Auto-refresh (polling fallback when WebSocket is not connected)
    useEffect(() => {
        if (isConnected) return; // Skip polling if WebSocket is active
        const interval = setInterval(fetchQuotes, refreshInterval);
        return () => clearInterval(interval);
    }, [fetchQuotes, refreshInterval, isConnected]);

    return (
        <div className="market-movers-widget">
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
                        const isPositive = quote.change != null && quote.change >= 0;
                        const chartData = generateChartData(quote.last || 0, quote.change || 0);
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
                                                isAnimationActive={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="market-mover-right">
                                    <div className={`market-mover-price ${getFieldChangeClass(quote.symbol, 'last')}`}>
                                        {formatPrice(quote.last)}
                                    </div>
                                    <div className={`market-mover-change ${isPositive ? 'positive' : 'negative'} ${getFieldChangeClass(quote.symbol, 'change')}`}>
                                        {quote.change != null && isPositive ? '+' : ''}{formatChange(quote.change)} {quote.change_percentage != null && isPositive ? '+' : ''}{formatPercent(quote.change_percentage)}%
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