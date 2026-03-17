// src/app/components/markets/stocks/StockPriceTable.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { marketService, type Quote } from '@/services/market.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StockPriceTableProps {
    symbols: string[];
    autoRefresh?: boolean;
    refreshInterval?: number;
}

export const StockPriceTable = ({
    symbols,
    autoRefresh = true,
    refreshInterval = 30000,
}: StockPriceTableProps) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const formatPrice = (price: number): string => price.toFixed(2);
    const formatChange = (change: number): string => change.toFixed(2);
    const formatPercent = (percent: number): string => percent.toFixed(2);
    
    const formatVolume = (volume: number): string => {
        if (volume >= 1_000_000_000) return `${(volume / 1_000_000_000).toFixed(2)}B`;
        if (volume >= 1_000_000) return `${(volume / 1_000_000).toFixed(2)}M`;
        if (volume >= 1_000) return `${(volume / 1_000).toFixed(2)}K`;
        return volume.toString();
    };

    const fetchQuotes = useCallback(async () => {
        try {
            setError(null);
            const { data } = await marketService.getQuotes(symbols);
            setQuotes(data.data || []);
            setLastUpdate(new Date());
        } catch (err) {
            console.error('Error fetching quotes:', err);
            setError('Failed to fetch stock data');
        } finally {
            setLoading(false);
        }
    }, [symbols]);

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    useEffect(() => {
        if (!autoRefresh) return;
        const interval = setInterval(fetchQuotes, refreshInterval);
        return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval, fetchQuotes]);

    if (loading) {
        return (
            <div className="stock-table-loading">
                <div className="stock-table-spinner"></div>
                <p>Loading market data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="stock-table-error">
                <FontAwesomeIcon icon="exclamation-triangle" />
                <p>{error}</p>
                <button onClick={fetchQuotes} className="stock-table-retry-btn">
                    <FontAwesomeIcon icon="sync-alt" /> Retry
                </button>
            </div>
        );
    }

    return (
        <div className="tradingview-style-table">
            {/* Header with Last Update */}
            {lastUpdate && (
                <div className="tv-table-header">
                    <span className="tv-last-update">
                        Last updated: {lastUpdate.toLocaleTimeString()}
                    </span>
                    <button onClick={fetchQuotes} className="tv-refresh-btn" title="Refresh">
                        <FontAwesomeIcon icon="sync-alt" />
                    </button>
                </div>
            )}

            {/* Table */}
            <div className="tv-table-wrapper">
                <table className="tv-table">
                    <thead>
                        <tr>
                            <th className="tv-th-symbol">Symbol</th>
                            <th className="tv-th-price">Price</th>
                            <th className="tv-th-change">Change</th>
                            <th className="tv-th-percent">chng%</th>
                            <th className="tv-th-volume">Volume</th>
                            <th className="tv-th-high">High</th>
                            <th className="tv-th-low">Low</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.map((quote) => {
                            const isPositive = quote.change >= 0;
                            return (
                                <tr key={quote.symbol} className="tv-row">
                                    {/* Symbol & Name */}
                                    <td className="tv-td-symbol">
                                        <div className="tv-symbol-wrapper">
                                            <span className="tv-symbol-icon">
                                                {quote.symbol.charAt(0)}
                                            </span>
                                            <div className="tv-symbol-info">
                                                <span className="tv-symbol-name">{quote.symbol}</span>
                                                <span className="tv-symbol-desc">{quote.description}</span>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* Price */}
                                    <td className="tv-td-price">
                                        ${formatPrice(quote.last)}
                                    </td>
                                    
                                    {/* Change */}
                                    <td className={`tv-td-change ${isPositive ? 'tv-positive' : 'tv-negative'}`}>
                                        {isPositive ? '+' : ''}{formatChange(quote.change)}
                                    </td>
                                    
                                    {/* Percent */}
                                    <td className={`tv-td-percent ${isPositive ? 'tv-positive' : 'tv-negative'}`}>
                                        {isPositive ? '+' : ''}{formatPercent(quote.change_percentage)}%
                                    </td>
                                    
                                    {/* Volume */}
                                    <td className="tv-td-volume">
                                        {formatVolume(quote.volume)}
                                    </td>
                                    
                                    {/* High */}
                                    <td className="tv-td-high">
                                        {formatPrice(quote.high)}
                                    </td>
                                    
                                    {/* Low */}
                                    <td className="tv-td-low">
                                        {formatPrice(quote.low)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};