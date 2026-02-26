// src/app/(premium)/premium-tools/portfolio-optimizer/page.tsx

'use client'

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputField from '@/app/components/fields/Input';
import { Heading } from '@/app/components/heading/Heading';
import { ToolDescription } from '@/app/(public)/tools/tool-description/ToolDescription';
import { TgTable, type TgTableColumn } from '@/app/components/table/TgTable';
import { TgTableSkeleton } from '@/app/components/skeletons/tables/TableSkeleton';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';
import { useSymbolSearch, type SymbolSuggestion } from '@/app/hooks/useSymbolSearch';
import { calculatorService } from '@/services/calculator.service';
import { toast } from '@/utils/toast';
import type { PortfolioOptimizerResult, CalculatorHistory } from '@/types/calculator';

// ── Local types ───────────────────────────────────────────────────────────────

interface PortfolioAllocationRow {
    symbol: string;
    weight: number;
    allocation: number;
}

interface MetricRow {
    label: string;
    value: string;
    color: string;
}

type HistoryRow = CalculatorHistory & { index: number };

type PortfolioInputData = { symbols?: { symbol: string }[]; investmentAmount?: number };
type PortfolioResultData = { metrics?: { expectedReturn?: number; sharpeRatio?: number; volatility?: number } };

// ── Component ─────────────────────────────────────────────────────────────────

export default function PortfolioOptimizerCalculator() {

    // Form state
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [selectedSymbols, setSelectedSymbols] = useState<SymbolSuggestion[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [targetReturn, setTargetReturn] = useState(0.05);
    const [riskFreeRate, setRiskFreeRate] = useState(0.0100);

    // Result / UI state
    const [result, setResult] = useState<PortfolioOptimizerResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // History state
    const [history, setHistory] = useState<CalculatorHistory[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Symbol search hook
    const { suggestions, isSearching, handleSearch, clearSuggestions } = useSymbolSearch();

    useEffect(() => { fetchHistory(); }, []);

    // ── History ───────────────────────────────────────────────────────────────

    const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
            const { data } = await calculatorService.getHistory('portfolio-optimizer');
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

    // ── Risk free rate stepper ────────────────────────────────────────────────

    const handleIncrease = () =>
        setRiskFreeRate((prev) => parseFloat(Math.min(prev + 0.0001, 0.15).toFixed(4)));

    const handleDecrease = () =>
        setRiskFreeRate((prev) => parseFloat(Math.max(prev - 0.0001, 0.01).toFixed(4)));

    const handleRiskFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0.01 && value <= 0.15) {
            setRiskFreeRate(parseFloat(value.toFixed(4)));
        }
    };

    // ── Symbol handling ───────────────────────────────────────────────────────

    const handleSymbolInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
        handleSearch(e);
    };

    const handleAddSymbol = (sym: SymbolSuggestion) => {
        if (!selectedSymbols.some((s) => s.symbol === sym.symbol)) {
            setSelectedSymbols((prev) => [...prev, sym]);
        }
        setSearchKeyword('');
        clearSuggestions();
    };

    const handleRemoveSymbol = (symbol: string) =>
        setSelectedSymbols((prev) => prev.filter((s) => s.symbol !== symbol));

    // ── Form submit / reset ───────────────────────────────────────────────────

    const isFormValid = investmentAmount !== '' && selectedSymbols.length >= 2;

    const handleReset = () => {
        setInvestmentAmount('');
        setSelectedSymbols([]);
        setSearchKeyword('');
        setTargetReturn(0.05);
        setRiskFreeRate(0.0100);
        setResult(null);
        setError('');
        clearSuggestions();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (selectedSymbols.length < 2) {
            setError('Please select at least 2 symbols.');
            return;
        }
        if (!investmentAmount) {
            setError('Please enter an investment amount.');
            return;
        }

        setLoading(true);
        setResult(null);
        try {
            const { data } = await calculatorService.portfolioOptimizer({
                investmentAmount: parseFloat(investmentAmount),
                riskFreeRate,
                targetReturn,
                symbols: selectedSymbols,
            });
            setResult(data.data ?? null);
            fetchHistory();
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                (err instanceof Error ? err.message : 'Optimization failed');
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    // ── Table column definitions ──────────────────────────────────────────────

    const allocationColumns: TgTableColumn<PortfolioAllocationRow>[] = [
        {
            key: 'symbol',
            label: 'Symbol',
            render: (row) => <span className="tg-cell-value">{row.symbol}</span>,
        },
        {
            key: 'weight',
            label: 'Weight (%)',
            align: 'right',
            render: (row) => <span className="tg-cell-primary">{row.weight}%</span>,
        },
        {
            key: 'allocation',
            label: 'Amount ($)',
            align: 'right',
            render: (row) => <span className="tg-cell-success">${row.allocation.toLocaleString()}</span>,
        },
    ];

    const metricsColumns: TgTableColumn<MetricRow>[] = [
        { key: 'label', label: 'Metric' },
        {
            key: 'value',
            label: 'Value',
            align: 'right',
            render: (row) => (
                <span style={{ fontWeight: 700, color: row.color }}>{row.value}</span>
            ),
        },
    ];

    const metricRows: MetricRow[] = result ? [
        { label: 'Expected Return', value: `${result.metrics.expectedReturn}%`, color: '#28a745' },
        { label: 'Volatility', value: `${result.metrics.volatility}%`, color: 'var(--tg-orange)' },
        { label: 'Sharpe Ratio', value: `${result.metrics.sharpeRatio}`, color: 'var(--tg-primary-color)' },
        { label: 'Value at Risk (95%)', value: `${result.metrics.valueAtRisk}%`, color: '#ffc107' },
        { label: 'Potential Loss', value: `$${result.metrics.potentialLoss.toLocaleString()}`, color: 'var(--tg-red)' },
        { label: 'Total Investment', value: `$${result.inputs.investmentAmount.toLocaleString()}`, color: 'var(--tg-secondary-color)' },
    ] : [];

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
            key: 'symbols',
            label: 'Symbols',
            render: (row) => (
                <div className="d-flex flex-wrap gap-1">
                    {(row.inputData as PortfolioInputData)?.symbols?.map((s, i) => (
                        <span key={i} className="tg-symbol-badge">{s.symbol}</span>
                    ))}
                </div>
            ),
        },
        {
            key: 'investment',
            label: 'Investment',
            align: 'right',
            render: (row) => (
                <span className="tg-cell-value">
                    ${(row.inputData as PortfolioInputData)?.investmentAmount?.toLocaleString()}
                </span>
            ),
        },
        {
            key: 'expectedReturn',
            label: 'Exp. Return',
            align: 'right',
            render: (row) => (
                <span className="tg-cell-success">
                    {(row.resultData as PortfolioResultData)?.metrics?.expectedReturn}%
                </span>
            ),
        },
        {
            key: 'sharpeRatio',
            label: 'Sharpe Ratio',
            align: 'right',
            render: (row) => (
                <span className="tg-cell-primary">
                    {(row.resultData as PortfolioResultData)?.metrics?.sharpeRatio}
                </span>
            ),
        },
        {
            key: 'volatility',
            label: 'Volatility',
            align: 'right',
            render: (row) => (
                <span style={{ fontWeight: 700, color: 'var(--tg-orange)' }}>
                    {(row.resultData as PortfolioResultData)?.metrics?.volatility}%
                </span>
            ),
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
                            <Heading textHeading="Portfolio Optimizer" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        {/* Investment Amount */}
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Investment Amount" placeholder="e.g. 100000"
                                                required id="investmentAmount" type="number" step="0.01" min="0"
                                                value={investmentAmount}
                                                onChange={(e) => setInvestmentAmount(e.target.value)}
                                                isVisible={false}
                                            />
                                        </div>

                                        {/* Risk Free Rate stepper */}
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <label
                                                    htmlFor="riskFreeRate"
                                                    style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}
                                                >
                                                    Risk Free Rate
                                                    <span style={{ color: 'var(--tg-primary-color)', marginLeft: '8px' }}>
                                                        = {(riskFreeRate * 100).toFixed(2)}%
                                                    </span>
                                                </label>
                                                <div className="d-flex align-items-center gap-2">
                                                    <button type="button" onClick={handleDecrease} className="tg-stepper-btn">
                                                        <FontAwesomeIcon icon={['fas', 'minus']} />
                                                    </button>
                                                    <input
                                                        id="riskFreeRate"
                                                        type="number"
                                                        step="0.0001"
                                                        value={riskFreeRate}
                                                        onChange={handleRiskFreeChange}
                                                        min="0.01"
                                                        max="0.15"
                                                        style={{ textAlign: 'center', flex: 1 }}
                                                    />
                                                    <button type="button" onClick={handleIncrease} className="tg-stepper-btn">
                                                        <FontAwesomeIcon icon={['fas', 'plus']} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Target Return slider */}
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                                                    Target Return
                                                    <span style={{ marginLeft: '8px', color: 'var(--tg-primary-color)', fontWeight: 700 }}>
                                                        {(targetReturn * 100).toFixed(0)}%
                                                    </span>
                                                </label>
                                                <input
                                                    type="range"
                                                    min={5}
                                                    max={30}
                                                    value={targetReturn * 100}
                                                    onChange={(e) => setTargetReturn(parseInt(e.target.value) / 100)}
                                                    style={{ width: '100%', accentColor: 'var(--tg-primary-color)' }}
                                                />
                                                <div className="d-flex justify-content-between" style={{ fontSize: '11px', opacity: 0.5 }}>
                                                    <span>5%</span><span>30%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Symbol search */}
                                        <div className="col-12">
                                            <div className="form-grp">
                                                <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'block' }}>
                                                    Symbol Search
                                                    <span style={{ fontSize: '0.75rem', opacity: 0.5, marginLeft: '6px' }}>
                                                        (min. 2 required)
                                                    </span>
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
                                                                    onClick={() => handleAddSymbol(s)}
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

                                                {/* Selected symbol tags */}
                                                {selectedSymbols.length > 0 ? (
                                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                                        {selectedSymbols.map((s) => (
                                                            <span key={s.symbol} className="tg-symbol-tag">
                                                                <strong>{s.symbol}</strong>
                                                                {s.name && (
                                                                    <span style={{ opacity: 0.6, marginLeft: '4px', fontSize: '0.8rem' }}>
                                                                        {s.name}
                                                                    </span>
                                                                )}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveSymbol(s.symbol)}
                                                                    className="tg-symbol-tag-remove"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '8px', marginBottom: 0 }}>
                                                        No symbols added yet.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <p style={{ color: 'var(--tg-red)', fontSize: '13px', margin: '8px 0 0' }}>
                                            {error}
                                        </p>
                                    )}

                                    <CalcButtons
                                        submitText="Optimize Portfolio"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                {/* Results */}
                                <div className="pt-4">
                                    {loading && (
                                        <TgTableSkeleton rows={4} cols={3} showFooter={false} />
                                    )}

                                    {result && !loading && (
                                        <>
                                            <p className="tg-section-label">Portfolio Allocation</p>
                                            <TgTable
                                                columns={allocationColumns}
                                                rows={result.portfolio}
                                                keyExtractor={(row) => row.symbol}
                                            />

                                            <p className="tg-section-label" style={{ marginTop: '20px' }}>
                                                Portfolio Metrics
                                            </p>
                                            <TgTable
                                                columns={metricsColumns}
                                                rows={metricRows}
                                                keyExtractor={(row) => row.label}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* History */}
                            <div className="mt-5">
                                <Heading textHeading="Calculation History" showBtn={false} />
                                <div className="contact-form p-0">
                                    {historyLoading ? (
                                        <TgTableSkeleton rows={3} cols={8} showFooter={false} />
                                    ) : history.length === 0 ? (
                                        <div className="text-center py-4">
                                            <FontAwesomeIcon
                                                icon={['fas', 'clock-rotate-left']}
                                                size="2x"
                                                style={{ color: 'var(--tg-primary-color)', marginBottom: '12px', display: 'block' }}
                                            />
                                            <p style={{ opacity: 0.6, marginBottom: 0 }}>
                                                No history yet. Run an optimization to see it here.
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
                                details="Optimizes portfolio allocation across multiple assets using the Sharpe Ratio to maximize returns per unit of risk." />
                            <ToolDescription
                                title="Example"
                                details="A $100,000 portfolio across AAPL, MSFT, and TSLA shows optimal weights and expected performance metrics." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Expected Return is the weighted average return. Volatility measures risk. Sharpe Ratio shows return per unit of risk — higher is better. Value at Risk estimates maximum expected loss at 95% confidence." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}