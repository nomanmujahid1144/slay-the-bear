// src/app/components/table/MarketDataTable.tsx

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { marketService, type Quote } from '@/services/market.service';
import { marketAvService } from '@/services/market-av.service';
import type { CryptoQuote, ForexQuote, MutualFundQuote } from '@/types/markets';
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
    field: string;
    timestamp: number;
    direction: 'up' | 'down' | 'neutral';
}

// ── Normalised row — same shape regardless of data source ─────────────────────
interface NormalisedRow {
    symbol: string;
    description: string;
    last: number;
    change: number;
    change_percentage: number;
    open: number;
    high: number;
    low: number;
    prev: number;
}

// ── Helper: convert AV CryptoQuote → NormalisedRow ────────────────────────────
function normaliseCrypto(q: CryptoQuote): NormalisedRow {
    return {
        symbol: q.symbol,
        description: q.name,
        last: q.price,
        change: q.change,
        change_percentage: q.change_percentage,
        open: q.open,
        high: q.high,
        low: q.low,
        prev: q.open,   // AV doesn't return prevclose; use open
    };
}

// ── Helper: convert AV ForexQuote → NormalisedRow ─────────────────────────────
function normaliseForex(q: ForexQuote): NormalisedRow {
    const change = q.rate - q.bid;
    const change_percentage = q.bid !== 0 ? (change / q.bid) * 100 : 0;
    return {
        symbol: `${q.from_currency}/${q.to_currency}`,
        description: `${q.from_name} to ${q.to_name}`,
        last: q.rate,
        change,
        change_percentage,
        open: q.bid,
        high: q.ask,
        low: q.bid,
        prev: q.bid,
    };
}

// ── Helper: convert AV MutualFundQuote → NormalisedRow ───────────────────────
function normaliseMutualFund(q: MutualFundQuote): NormalisedRow {
    return {
        symbol: q.symbol,
        description: q.name,
        last: q.price,
        change: q.change,
        change_percentage: q.change_percentage,
        open: q.open,
        high: q.high,
        low: q.low,
        prev: q.open,
    };
}

// ── Helper: convert Tradier Quote → NormalisedRow ────────────────────────────
function normaliseQuote(q: Quote): NormalisedRow {
    return {
        symbol: q.symbol,
        description: q.description,
        last: q.last,
        change: q.change,
        change_percentage: q.change_percentage,
        open: q.open,
        high: q.high,
        low: q.low,
        prev: q.prevclose,
    };
}

// ── Determine if this type uses Alpha Vantage ─────────────────────────────────
const isAvType = (type: string) =>
    type === 'crypto' || type === 'forex' || type === 'mutual-funds';

export const MarketDataTable = ({
    symbols,
    type = 'stocks',
    autoRefresh = true,
    refreshInterval = 30000,
    showHeader = true,
}: MarketDataTableProps) => {
    const [rows, setRows] = useState<NormalisedRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [changedFields, setChangedFields] = useState<Map<string, FieldChange>>(new Map());

    const previousRowsRef = useRef<Map<string, NormalisedRow>>(new Map());
    const lastUpdateTimeRef = useRef<Map<string, number>>(new Map());
    const UPDATE_COOLDOWN_MS = 300;

    // ── WebSocket handler (Tradier only — stocks/ETFs) ────────────────────────
    const handleQuoteUpdate = useCallback((updatedQuote: Quote) => {
        if (isAvType(type)) return; // AV types use polling only

        const now = Date.now();
        const lastUpdateTime = lastUpdateTimeRef.current.get(updatedQuote.symbol) || 0;
        if (now - lastUpdateTime < UPDATE_COOLDOWN_MS) return;
        lastUpdateTimeRef.current.set(updatedQuote.symbol, now);

        setRows(prevRows => {
            const index = prevRows.findIndex(r => r.symbol === updatedQuote.symbol);
            if (index === -1) return prevRows;

            const currentRow = prevRows[index];
            const previousRow = previousRowsRef.current.get(updatedQuote.symbol) || currentRow;

            const prevClose = currentRow.prev || currentRow.last;
            const newLast = updatedQuote.last ?? currentRow.last;
            const newChange = newLast - prevClose;
            const newChangePct = prevClose !== 0 ? (newChange / prevClose) * 100 : 0;

            const updatedRow: NormalisedRow = {
                ...currentRow,
                last: newLast,
                change: newChange,
                change_percentage: newChangePct,
                open: updatedQuote.open ?? currentRow.open,
                high: updatedQuote.high ?? currentRow.high,
                low: updatedQuote.low ?? currentRow.low,
            };

            // Detect field changes for animation
            const now2 = Date.now();
            const newChanges = new Map<string, FieldChange>();
            const fields = ['last', 'change', 'change_percentage'] as const;
            fields.forEach(field => {
                const oldValue = previousRow[field] as number;
                const newValue = updatedRow[field] as number;
                if (oldValue !== newValue) {
                    newChanges.set(`${updatedQuote.symbol}-${field}`, {
                        symbol: updatedQuote.symbol,
                        field,
                        timestamp: now2,
                        direction: newValue > oldValue ? 'up' : newValue < oldValue ? 'down' : 'neutral',
                    });
                }
            });

            if (newChanges.size > 0) {
                setChangedFields(prev => {
                    const updated = new Map(prev);
                    newChanges.forEach((v, k) => updated.set(k, v));
                    return updated;
                });
                setTimeout(() => {
                    setChangedFields(prev => {
                        const updated = new Map(prev);
                        newChanges.forEach((_, k) => updated.delete(k));
                        return updated;
                    });
                }, 1500);
            }

            previousRowsRef.current.set(updatedQuote.symbol, updatedRow);

            const newRows = [...prevRows];
            newRows[index] = updatedRow;
            return newRows;
        });

        setLastUpdate(new Date());
    }, [type]);

    // ── Fetch data — routes to correct service based on type ──────────────────
    const fetchData = useCallback(async () => {
        try {
            setError(null);

            if (type === 'crypto') {
                const normalised: NormalisedRow[] = [];
                for (const s of symbols) {
                    try {
                        const res = await marketAvService.getCryptoQuote(s, 'USD');
                        if (res.data?.data) {
                            normalised.push(normaliseCrypto(res.data.data));
                        }
                    } catch (err) {
                        console.warn(`Skipping ${s} — fetch failed`);
                    }
                    // 300ms gap between each AV request — prevents rate limiting
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
                normalised.forEach(r => previousRowsRef.current.set(r.symbol, r));
                setRows(normalised);

            } else if (type === 'forex') {
                // Fetch each forex rate individually and normalise
                const results = await Promise.allSettled(
                    symbols.map(s => marketAvService.getForexRate(s, 'USD'))
                );
                const normalised: NormalisedRow[] = results
                    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
                    .map(r => normaliseForex(r.value.data.data))
                    .filter(Boolean);
                normalised.forEach(r => previousRowsRef.current.set(r.symbol, r));
                setRows(normalised);

            } else if (type === 'mutual-funds') {
                // Fetch each mutual fund quote individually and normalise
                const results = await Promise.allSettled(
                    symbols.map(s => marketAvService.getMutualFundQuote(s))
                );
                const normalised: NormalisedRow[] = results
                    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
                    .map(r => normaliseMutualFund(r.value.data.data))
                    .filter(Boolean);
                normalised.forEach(r => previousRowsRef.current.set(r.symbol, r));
                setRows(normalised);

            } else {
                // Tradier — stocks or ETFs
                const { data } = await marketService.getQuotes(symbols);
                const quotes = data.data || [];
                const normalised = quotes.map(normaliseQuote);
                normalised.forEach(r => previousRowsRef.current.set(r.symbol, r));
                setRows(normalised);
            }

            setLastUpdate(new Date());
        } catch (err) {
            console.error('Error fetching market data:', err);
            setError('Failed to fetch market data');
        } finally {
            setLoading(false);
        }
    }, [symbols, type]);

    // ── WebSocket (Tradier only) ───────────────────────────────────────────────
    const { isConnected, error: wsError } = useMarketWebSocket({
        symbols: isAvType(type) ? [] : symbols,  // Disable WS for AV types
        onQuoteUpdate: handleQuoteUpdate,
        enabled: autoRefresh && !isAvType(type),
    });

    // ── Initial fetch ─────────────────────────────────────────────────────────
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ── Polling fallback (always on for AV, fallback for Tradier when WS off) ─
    useEffect(() => {
        if (!autoRefresh) return;
        if (!isAvType(type) && isConnected) return; // Tradier uses WS if connected
        const interval = setInterval(fetchData, refreshInterval);
        return () => clearInterval(interval);
    }, [autoRefresh, isConnected, refreshInterval, fetchData, type]);

    // ── Field change animation helper ─────────────────────────────────────────
    const getFieldChangeClass = (symbol: string, field: string): string => {
        const key = `${symbol}-${field}`;
        const change = changedFields.get(key);
        if (!change) return '';
        const age = Date.now() - change.timestamp;
        if (age > 1500) return '';
        return `field-changed field-${change.direction}`;
    };

    // ── Render ────────────────────────────────────────────────────────────────
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
                <button onClick={fetchData} className="market-data-retry-btn">
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
                            <span className={`market-data-connection-status ${isAvType(type) ? 'disconnected' : isConnected ? 'connected' : 'disconnected'}`}>
                                <span className="status-dot"></span>
                                {isAvType(type) ? 'Polling' : isConnected ? 'Live' : 'Polling'}
                            </span>
                        )}
                        <span className="market-data-last-update">
                            Last updated: {lastUpdate.toLocaleTimeString()}
                        </span>
                    </div>
                    <button onClick={fetchData} className="market-data-refresh-btn" title="Refresh">
                        <FontAwesomeIcon icon="sync-alt" />
                    </button>
                </div>
            )}

            {wsError && autoRefresh && !isAvType(type) && (
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
                        {rows.map((row) => {
                            const isPositive = row.change != null && row.change >= 0;

                            return (
                                <tr key={row.symbol} className="mdt-row">
                                    <td className="mdt-td-name">
                                        <div className="mdt-symbol-wrapper">
                                            <span className="mdt-symbol-icon">
                                                {row.symbol.charAt(0)}
                                            </span>
                                            <div className="mdt-symbol-info">
                                                <span className="mdt-symbol-name">{row.symbol}</span>
                                                <span className="mdt-symbol-desc">{row.description}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className={`mdt-td-value w-75 ${getFieldChangeClass(row.symbol, 'last')}`}>
                                        {formatPrice(row.last)}
                                        <sup className={!isAvType(type) && isConnected ? 'mdt-live' : 'mdt-delayed'}>
                                            {!isAvType(type) && isConnected ? 'L' : 'D'}
                                        </sup>
                                    </td>

                                    <td className={`mdt-td-change w-75 ${isPositive ? 'mdt-positive' : 'mdt-negative'} ${getFieldChangeClass(row.symbol, 'change')}`}>
                                        {row.change != null && isPositive ? '+' : ''}{formatChange(row.change)}
                                    </td>

                                    <td className={`mdt-td-percent w-75 ${isPositive ? 'mdt-positive' : 'mdt-negative'} ${getFieldChangeClass(row.symbol, 'change_percentage')}`}>
                                        {row.change_percentage != null && isPositive ? '+' : ''}{formatPercent(row.change_percentage)}%
                                    </td>

                                    <td className="mdt-td-open w-75">{formatPrice(row.open)}</td>
                                    <td className="mdt-td-high w-75 mdt-positive">{formatPrice(row.high)}</td>
                                    <td className="mdt-td-low w-75 mdt-negative">{formatPrice(row.low)}</td>
                                    <td className="mdt-td-prev w-75">{formatPrice(row.prev)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};