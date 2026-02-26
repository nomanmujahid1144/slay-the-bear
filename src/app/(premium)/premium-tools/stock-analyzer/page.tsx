// src/app/(premium)/premium-tools/stock-analyzer/page.tsx

'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Heading } from '@/app/components/heading/Heading';
import { ToolDescription } from '@/app/(public)/tools/tool-description/ToolDescription';
import { TgTable, type TgTableColumn } from '@/app/components/table/TgTable';
import { TgTableSkeleton } from '@/app/components/skeletons/tables/TableSkeleton';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';
import { CalcResultSkeleton } from '@/app/components/skeletons';
import { useSymbolSearch, type SymbolSuggestion } from '@/app/hooks/useSymbolSearch';
import { calculatorService } from '@/services/calculator.service';
import { toast } from '@/utils/toast';
import type { StockAnalyzerResult, CalculatorHistory } from '@/types/calculator';

// ── Types ─────────────────────────────────────────────────────────────────────

type AnalysisTerm = 'Short Term' | 'Long Term';

type HistoryInputData  = { symbol?: string; term?: string };
type HistoryResultData = { valuationStatus?: string; currentStockPrice?: string; intrinsicStockValue?: string };
type HistoryRow        = CalculatorHistory & { index: number };

// ── Valuation colour helper ───────────────────────────────────────────────────

function getValuationColor(status: string): string {
    if (status === 'Strong Buy' || status === 'Buy') return '#28a745';
    if (status === 'Strong Sell' || status === 'Sell') return 'var(--tg-red)';
    return '#ffc107'; // Hold
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function StockAnalyzerCalculator() {

    // Form state
    const [selectedSymbol, setSelectedSymbol] = useState<SymbolSuggestion | null>(null);
    const [searchKeyword, setSearchKeyword]   = useState('');
    const [term, setTerm]                     = useState<AnalysisTerm>('Short Term');

    // Result / UI state
    const [result, setResult]   = useState<StockAnalyzerResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState('');

    // History state
    const [history, setHistory]               = useState<CalculatorHistory[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [deletingId, setDeletingId]         = useState<string | null>(null);

    // Symbol search hook
    const { suggestions, isSearching, handleSearch, clearSuggestions } = useSymbolSearch();

    useEffect(() => { fetchHistory(); }, []);

    // ── History ───────────────────────────────────────────────────────────────

    const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
            const { data } = await calculatorService.getHistory('stock-analyzer');
            setHistory((data.data ?? []) as CalculatorHistory[]);
        } catch {
            // handled by errorHandler
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleDeleteHistory = async (historyId: string) => {
        setDeletingId(historyId);
        try {
            await calculatorService.deleteHistory(historyId);
            toast.success('History deleted successfully');
            setHistory((prev) => prev.filter((item) => item.id !== historyId));
        } catch {
            // handled by errorHandler
        } finally {
            setDeletingId(null);
        }
    };

    // ── Symbol handling ───────────────────────────────────────────────────────

    const handleSymbolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
        handleSearch(e);
    };

    const handleSelectSymbol = (sym: SymbolSuggestion) => {
        setSelectedSymbol(sym);
        setSearchKeyword(`${sym.symbol} - ${sym.name}`);
        clearSuggestions();
    };

    // ── Form ──────────────────────────────────────────────────────────────────

    const isFormValid = selectedSymbol !== null;

    const handleReset = () => {
        setSelectedSymbol(null);
        setSearchKeyword('');
        setTerm('Short Term');
        setResult(null);
        setError('');
        clearSuggestions();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!selectedSymbol) {
            setError('Please select a stock symbol.');
            return;
        }

        setLoading(true);
        setResult(null);
        try {
            const { data } = await calculatorService.stockAnalyzer({
                symbol: selectedSymbol.symbol,
                term,
            });
            setResult(data.data ?? null);
            fetchHistory();
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                (err instanceof Error ? err.message : 'Analysis failed');
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    // ── History table columns ─────────────────────────────────────────────────

    const historyColumns: TgTableColumn<HistoryRow>[] = [
        {
            key: 'index',
            label: '#',
            render: (row) => <span>{row.index}</span>,
        },
        {
            key: 'createdAt',
            label: 'Date',
            render: (row) => (
                <span style={{ whiteSpace: 'nowrap' }}>
                    {new Date(row.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                    })}
                </span>
            ),
        },
        {
            key: 'symbol',
            label: 'Symbol',
            render: (row) => (
                <span className="tg-cell-value" style={{ fontWeight: 700 }}>
                    {(row.inputData as HistoryInputData)?.symbol}
                </span>
            ),
        },
        {
            key: 'term',
            label: 'Term',
            render: (row) => (
                <span style={{ fontSize: '0.82rem' }}>
                    {(row.inputData as HistoryInputData)?.term}
                </span>
            ),
        },
        {
            key: 'currentPrice',
            label: 'Current Price',
            align: 'right',
            render: (row) => (
                <span className="tg-cell-value">
                    {(row.resultData as HistoryResultData)?.currentStockPrice}
                </span>
            ),
        },
        {
            key: 'intrinsicValue',
            label: 'Intrinsic Value',
            align: 'right',
            render: (row) => (
                <span className="tg-cell-primary">
                    {(row.resultData as HistoryResultData)?.intrinsicStockValue}
                </span>
            ),
        },
        {
            key: 'valuation',
            label: 'Verdict',
            align: 'right',
            render: (row) => {
                const status = (row.resultData as HistoryResultData)?.valuationStatus ?? '';
                return (
                    <span style={{
                        fontWeight: 700,
                        color: getValuationColor(status),
                        fontSize: '0.82rem',
                    }}>
                        {status}
                    </span>
                );
            },
        },
        {
            key: 'action',
            label: '',
            align: 'right',
            render: (row) => (
                <button
                    type="button"
                    onClick={() => handleDeleteHistory(row.id)}
                    disabled={deletingId === row.id}
                    className="tg-table-delete-btn"
                >
                    {deletingId === row.id
                        ? <FontAwesomeIcon icon={['fas', 'spinner']} spin />
                        : <FontAwesomeIcon icon={['fas', 'trash']} />
                    }
                </button>
            ),
        },
    ];

    const historyRows: HistoryRow[] = history.map((item, i) => ({ ...item, index: i + 1 }));

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading textHeading="Stock Analyzer" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        {/* Symbol search */}
                                        <div className="col-md-8">
                                            <div className="form-grp">
                                                <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                                                    Symbol Search
                                                </label>
                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        type="text"
                                                        value={searchKeyword}
                                                        onChange={handleSymbolInput}
                                                        placeholder="Search by company name or ticker (e.g. Apple, AAPL)"
                                                    />
                                                    {isSearching && (
                                                        <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '4px', marginBottom: 0 }}>
                                                            Searching...
                                                        </p>
                                                    )}
                                                    {suggestions.length > 0 && (
                                                        <ul className="tg-symbol-dropdown">
                                                            {suggestions.map((s, i) => (
                                                                <li
                                                                    key={i}
                                                                    onClick={() => handleSelectSymbol(s)}
                                                                    className="tg-symbol-option"
                                                                >
                                                                    <strong>{s.symbol}</strong>
                                                                    <span style={{ opacity: 0.6, marginLeft: '6px', fontSize: '0.85rem' }}>
                                                                        {s.name}
                                                                    </span>
                                                                    {s.region && (
                                                                        <span style={{ opacity: 0.4, marginLeft: '4px', fontSize: '0.75rem' }}>
                                                                            · {s.region}
                                                                        </span>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                                {selectedSymbol && (
                                                    <div className="d-flex align-items-center gap-2 mt-2">
                                                        <span className="tg-symbol-tag">
                                                            <strong>{selectedSymbol.symbol}</strong>
                                                            {selectedSymbol.name && (
                                                                <span style={{ opacity: 0.6, marginLeft: '4px', fontSize: '0.8rem' }}>
                                                                    {selectedSymbol.name}
                                                                </span>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedSymbol(null);
                                                                    setSearchKeyword('');
                                                                }}
                                                                className="tg-symbol-tag-remove"
                                                            >
                                                                ✕
                                                            </button>
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Analysis Term */}
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                                                    Analysis Term
                                                </label>
                                                <select
                                                    value={term}
                                                    onChange={(e) => setTerm(e.target.value as AnalysisTerm)}
                                                    style={{ width: '100%' }}
                                                >
                                                    <option value="Short Term">Short Term</option>
                                                    <option value="Long Term">Long Term</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <p style={{ color: 'var(--tg-red)', fontSize: '13px', margin: '8px 0 0' }}>
                                            {error}
                                        </p>
                                    )}

                                    <CalcButtons
                                        submitText="Analyze Stock"
                                        loadingText="Analyzing..."
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                {/* Result */}
                                <div className="pt-4">
                                    {loading && (
                                        <CalcResultSkeleton gridCols={2} gridRows={2} inputCols={2} />
                                    )}

                                    {result && !loading && (
                                        <>
                                            {/* Verdict banner */}
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 mb-3"
                                                style={{
                                                    border: `1px solid ${getValuationColor(result.valuationStatus)}`,
                                                    borderRadius: '6px',
                                                    background: `${getValuationColor(result.valuationStatus)}11`,
                                                }}
                                            >
                                                <span style={{ fontWeight: 600 }}>
                                                    {result.companyName}
                                                    <span style={{ opacity: 0.5, marginLeft: '6px', fontSize: '0.85rem' }}>
                                                        ({result.symbol})
                                                    </span>
                                                </span>
                                                <span style={{
                                                    fontSize: '1.3rem',
                                                    fontWeight: 700,
                                                    color: getValuationColor(result.valuationStatus),
                                                }}>
                                                    {result.valuationStatus}
                                                </span>
                                            </div>

                                            {/* Metrics grid */}
                                            <div className="row g-2 mb-3">
                                                <div className="col-6">
                                                    <div className="contact-info-item flex-column gap-1 h-100" style={{ padding: '12px 14px' }}>
                                                        <span style={{ fontSize: '0.78rem', opacity: 0.6 }}>Current Price</span>
                                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--tg-primary-color)' }}>
                                                            {result.currentStockPrice}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="contact-info-item flex-column gap-1 h-100" style={{ padding: '12px 14px', borderColor: '#28a745' }}>
                                                        <span style={{ fontSize: '0.78rem', opacity: 0.6 }}>Intrinsic Value</span>
                                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#28a745' }}>
                                                            {result.intrinsicStockValue}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="contact-info-item flex-column gap-1 h-100" style={{ padding: '12px 14px' }}>
                                                        <span style={{ fontSize: '0.78rem', opacity: 0.6 }}>Stock Trend</span>
                                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--tg-primary-color)' }}>
                                                            {result.stockTrend}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="contact-info-item flex-column gap-1 h-100" style={{ padding: '12px 14px' }}>
                                                        <span style={{ fontSize: '0.78rem', opacity: 0.6 }}>Analysis Term</span>
                                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--tg-primary-color)' }}>
                                                            {term}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Explanation */}
                                            <div
                                                className="contact-info-item flex-column gap-1"
                                                style={{ padding: '14px 16px' }}
                                            >
                                                <span style={{ fontSize: '0.78rem', opacity: 0.6, marginBottom: '4px' }}>
                                                    Analysis
                                                </span>
                                                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 0 }}>
                                                    {result.explanation}
                                                </p>
                                            </div>

                                            {/* Disclaimer */}
                                            <p style={{ fontSize: '0.75rem', opacity: 0.45, marginTop: '12px', fontStyle: 'italic' }}>
                                                {result.disclaimer}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* History */}
                            <div className="mt-5">
                                <Heading textHeading="Analysis History" showBtn={false} />
                                <div className="contact-form p-0">
                                    {historyLoading ? (
                                        <TgTableSkeleton rows={3} cols={7} showFooter={false} />
                                    ) : history.length === 0 ? (
                                        <div className="text-center py-4">
                                            <FontAwesomeIcon
                                                icon={['fas', 'clock-rotate-left']}
                                                size="2x"
                                                style={{ color: 'var(--tg-primary-color)', marginBottom: '12px', display: 'block' }}
                                            />
                                            <p style={{ opacity: 0.6, marginBottom: 0 }}>
                                                No history yet. Analyze a stock to see it here.
                                            </p>
                                        </div>
                                    ) : (
                                        <div style={{ overflowX: 'auto' }}>
                                            <TgTable
                                                columns={historyColumns}
                                                rows={historyRows}
                                                keyExtractor={(row) => row.id}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Analyzes a stock's intrinsic value vs current price using historical price data, P/E ratio, P/B ratio, and RSI trend indicators to generate a Buy, Hold, or Sell recommendation." />
                            <ToolDescription
                                title="Short Term vs Long Term"
                                details="Short Term uses P/E and P/B ratios to assess current valuation. Long Term compares the stock's historical average price (intrinsic value) against its current price to identify undervalued opportunities." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Intrinsic Value is the stock's historical average price. Stock Trend is derived from RSI — Bullish (RSI ≥ 70), Uptrend (50–70), Downtrend (30–50), or Bearish (RSI ≤ 30). The verdict (Buy/Hold/Sell) combines these signals into a single actionable recommendation." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}