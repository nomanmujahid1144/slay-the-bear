// src/app/components/table/MarketDataTable.tsx
// FIXED VERSION - Simplified throttling

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { marketService, type Quote } from '@/services/market.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMarketWebSocket } from '@/hooks/useMarketWebSocket';
import { formatPrice, formatChange, formatPercent } from '@/utils/format';

interface MarketDataTableProps {
    symbols: string[];
    type?: 'stocks' | 'etfs' | 'crypto' | 'mutual-funds' | 'forex';
    autoRefresh?: boolean;
    refreshInterval?: number;
    showHeader?: boolean;
}

interface FieldChange {
    symbol: string;
    field: keyof Quote;
    timestamp: number;
    direction: 'up' | 'down' | 'neutral';
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
    const [changedFields, setChangedFields] = useState<Map<string, FieldChange>>(new Map());
    
    const previousQuotesRef = useRef<Map<string, Quote>>(new Map());
    const lastUpdateTimeRef = useRef<Map<string, number>>(new Map());
    const UPDATE_COOLDOWN_MS = 300; // Minimum 300ms between updates per symbol

    /**
     * Smart quote update with cooldown per symbol
     */
    const handleQuoteUpdate = useCallback((updatedQuote: Quote) => {
        const now = Date.now();
        const lastUpdateTime = lastUpdateTimeRef.current.get(updatedQuote.symbol) || 0;
        
        // Skip if updated too recently (cooldown period)
        if (now - lastUpdateTime < UPDATE_COOLDOWN_MS) {
            return;
        }

        lastUpdateTimeRef.current.set(updatedQuote.symbol, now);

        setQuotes(prevQuotes => {
            const index = prevQuotes.findIndex(q => q.symbol === updatedQuote.symbol);
            if (index === -1) return prevQuotes;

            const currentQuote = prevQuotes[index];
            const previousQuote = previousQuotesRef.current.get(updatedQuote.symbol) || currentQuote;

            // Calculate change and change_percentage from last price
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
                ...(updatedQuote.open !== undefined && updatedQuote.open !== null ? { open: updatedQuote.open } : {}),
                ...(updatedQuote.high !== undefined && updatedQuote.high !== null ? { high: updatedQuote.high } : {}),
                ...(updatedQuote.low !== undefined && updatedQuote.low !== null ? { low: updatedQuote.low } : {}),
            };

            // Track changed fields
            const newChanges = new Map<string, FieldChange>();
            const fieldsToCheck: (keyof Quote)[] = ['last', 'change', 'change_percentage', 'volume', 'bid', 'ask', 'open', 'high', 'low'];
            
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

        setLastUpdate(new Date());
    }, []);

    const { isConnected, error: wsError } = useMarketWebSocket({
        symbols,
        onQuoteUpdate: handleQuoteUpdate,
        enabled: autoRefresh
    });

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
            setError(null);
            const { data } = await marketService.getQuotes(symbols);
            const newQuotes = data.data || [];
            
            newQuotes.forEach(quote => {
                previousQuotesRef.current.set(quote.symbol, quote);
            });
            
            setQuotes(newQuotes);
            setLastUpdate(new Date());
        } catch (err) {
            console.error('Error fetching quotes:', err);
            setError('Failed to fetch market data');
        } finally {
            setLoading(false);
        }
    }, [symbols]);

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]);

    useEffect(() => {
        if (!autoRefresh || isConnected) return;
        const interval = setInterval(fetchQuotes, refreshInterval);
        return () => clearInterval(interval);
    }, [autoRefresh, isConnected, refreshInterval, fetchQuotes]);

    if (loading) {
        return (
            <div className="market-data-table-loading">
                <div className="market-data-spinner"></div>
                <p>Loading {type} data...</p>
            </div>
        );
    }

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

            {wsError && autoRefresh && (
                <div className="market-data-ws-warning">
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    <small>Real-time updates unavailable. Using polling mode.</small>
                </div>
            )}

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
                            const isPositive = quote.change != null && quote.change >= 0;
                            
                            return (
                                <tr key={quote.symbol} className="mdt-row">
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

                                    <td className={`mdt-td-value w-75 ${getFieldChangeClass(quote.symbol, 'last')}`}>
                                        {formatPrice(quote.last)}
                                        <sup className={isConnected ? 'mdt-live' : 'mdt-delayed'}>
                                            {isConnected ? 'L' : 'D'}
                                        </sup>
                                    </td>

                                    <td className={`mdt-td-change w-75 ${isPositive ? 'mdt-positive' : 'mdt-negative'} ${getFieldChangeClass(quote.symbol, 'change')}`}>
                                        {quote.change != null && isPositive ? '+' : ''}{formatChange(quote.change)}
                                    </td>

                                    <td className={`mdt-td-percent w-75 ${isPositive ? 'mdt-positive' : 'mdt-negative'} ${getFieldChangeClass(quote.symbol, 'change_percentage')}`}>
                                        {quote.change_percentage != null && isPositive ? '+' : ''}{formatPercent(quote.change_percentage)}%
                                    </td>

                                    <td className={`mdt-td-open w-75 ${getFieldChangeClass(quote.symbol, 'open')}`}>
                                        {formatPrice(quote.open)}
                                    </td>

                                    <td className={`mdt-td-high w-75 ${getFieldChangeClass(quote.symbol, 'high')}`}>
                                        {formatPrice(quote.high)}
                                    </td>

                                    <td className={`mdt-td-low w-75 ${getFieldChangeClass(quote.symbol, 'low')}`}>
                                        {formatPrice(quote.low)}
                                    </td>

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