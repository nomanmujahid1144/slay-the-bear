// src/app/components/table/MarketDataTable.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { marketService, type Quote } from '@/services/market.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMarketWebSocket } from '@/hooks/useMarketWebSocket';

interface MarketDataTableProps {
    symbols: string[];
    type?: 'stocks' | 'etfs' | 'crypto' | 'mutual-funds' | 'forex';
    autoRefresh?: boolean;
    refreshInterval?: number;
    showHeader?: boolean;
}

export const MarketDataTable = ({
    symbols,
    type = 'stocks',
    autoRefresh = true,
    refreshInterval = 30000,
    showHeader = true,
}: MarketDataTableProps) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    /**
     * Handle real-time quote updates from WebSocket
     */
    const handleQuoteUpdate = useCallback((updatedQuote: Quote) => {
        setQuotes(prevQuotes => {
            const index = prevQuotes.findIndex(q => q.symbol === updatedQuote.symbol);
            if (index !== -1) {
                const newQuotes = [...prevQuotes];
                newQuotes[index] = updatedQuote;
                return newQuotes;
            }
            return prevQuotes;
        });
        setLastUpdate(new Date());
    }, []);

    /**
     * Initialize WebSocket connection
     */
    const { isConnected, error: wsError } = useMarketWebSocket({
        symbols,
        onQuoteUpdate: handleQuoteUpdate,
        enabled: autoRefresh // Only use WebSocket if autoRefresh is true
    });

    // Format functions
    const formatPrice = (price: number): string => price.toFixed(2);
    const formatChange = (change: number): string => change.toFixed(2);
    const formatPercent = (percent: number): string => percent.toFixed(2);

    // Fetch quotes from API
    const fetchQuotes = useCallback(async () => {
        try {
            setError(null);
            const { data } = await marketService.getQuotes(symbols);
            setQuotes(data.data || []);
            setLastUpdate(new Date());
        } catch (err) {
            console.error('Error fetching quotes:', err);
            setError('Failed to fetch market data');
        } finally {
            setLoading(false);
        }
    }, [symbols]);

    // Initial fetch
    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    // Auto-refresh (polling fallback when WebSocket is not connected)
    useEffect(() => {
        if (!autoRefresh || isConnected) return;
        const interval = setInterval(fetchQuotes, refreshInterval);
        return () => clearInterval(interval);
    }, [autoRefresh, isConnected, refreshInterval, fetchQuotes]);

    // Loading state
    if (loading) {
        return (
            <div className="market-data-table-loading">
                <div className="market-data-spinner"></div>
                <p>Loading {type} data...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="market-data-table-error">
                <FontAwesomeIcon icon="exclamation-triangle" />
                <p>{error}</p>
                <button onClick={fetchQuotes} className="market-data-retry-btn">
                    <FontAwesomeIcon icon="sync-alt" /> Retry
                </button>
            </div>
        );
    }

    return (
        <div className="market-data-table">
            {/* Header with Last Update and Connection Status */}
            {showHeader && lastUpdate && (
                <div className="market-data-header">
                    <div className="market-data-status">
                        {autoRefresh && (
                            <span className={`market-data-connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                                <span className="status-dot"></span>
                                {isConnected ? 'Live' : 'Polling'}
                            </span>
                        )}
                        <span className="market-data-last-update">
                            Last updated: {lastUpdate.toLocaleTimeString()}
                        </span>
                    </div>
                    <button onClick={fetchQuotes} className="market-data-refresh-btn" title="Refresh">
                        <FontAwesomeIcon icon="sync-alt" />
                    </button>
                </div>
            )}

            {/* WebSocket Error Warning */}
            {wsError && autoRefresh && (
                <div className="market-data-ws-warning">
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    <small>Real-time updates unavailable. Using polling mode.</small>
                </div>
            )}

            {/* Table */}
            <div className="market-data-table-wrapper">
                <table className="market-data-table-inner">
                    <thead>
                        <tr>
                            <th className="mdt-th-name">Name</th>
                            <th className="mdt-th-value">Value</th>
                            <th className="mdt-th-change">Change</th>
                            <th className="mdt-th-percent">Chg%</th>
                            <th className="mdt-th-open">Open</th>
                            <th className="mdt-th-high">High</th>
                            <th className="mdt-th-low">Low</th>
                            <th className="mdt-th-prev">Prev</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.map((quote) => {
                            const isPositive = quote.change >= 0;
                            return (
                                <tr key={quote.symbol} className="mdt-row">
                                    {/* Name - Symbol & Description */}
                                    <td className="mdt-td-name">
                                        <div className="mdt-symbol-wrapper">
                                            <span className="mdt-symbol-icon">
                                                {quote.symbol.charAt(0)}
                                            </span>
                                            <div className="mdt-symbol-info">
                                                <span className="mdt-symbol-name">{quote.symbol}</span>
                                                <span className="mdt-symbol-desc">{quote.description}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Value - Current Price with Live/Delayed Indicator */}
                                    <td className="mdt-td-value w-75">
                                        {formatPrice(quote.last)}
                                        <sup className={isConnected ? 'mdt-live' : 'mdt-delayed'}>
                                            {isConnected ? 'L' : 'D'}
                                        </sup>
                                    </td>

                                    {/* Change - Dollar Amount */}
                                    <td className={`mdt-td-change w-75 ${isPositive ? 'mdt-positive' : 'mdt-negative'}`}>
                                        {isPositive ? '+' : ''}{formatChange(quote.change)}
                                    </td>

                                    {/* Chg% - Percentage */}
                                    <td className={`mdt-td-percent w-75 ${isPositive ? 'mdt-positive' : 'mdt-negative'}`}>
                                        {isPositive ? '+' : ''}{formatPercent(quote.change_percentage)}%
                                    </td>

                                    {/* Open */}
                                    <td className="mdt-td-open w-75">
                                        {formatPrice(quote.open)}
                                    </td>

                                    {/* High */}
                                    <td className="mdt-td-high w-75">
                                        {formatPrice(quote.high)}
                                    </td>

                                    {/* Low */}
                                    <td className="mdt-td-low w-75">
                                        {formatPrice(quote.low)}
                                    </td>

                                    {/* Prev - Previous Close */}
                                    <td className="mdt-td-prev w-75">
                                        {formatPrice(quote.prevclose)}
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