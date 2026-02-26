// src/app/(public)/tools/net-worth-calculator/page.tsx

'use client'

import { useState } from 'react';
import InputField from '@/app/components/fields/Input';
import { Heading } from '@/app/components/heading/Heading';
import { CalculatorSidebar } from '@/app/components/calculator/CalculatorSidebar';
import { ToolDescription } from '../tool-description/ToolDescription';
import { CalcResultSkeleton } from '@/app/components/skeletons';
import { CalcResult, CalcResultGrid, CalcResultInputs } from '@/app/components/calculator/result';
import { useCalculator } from '@/app/hooks/useCalculator';
import { calculatorService } from '@/services/calculator.service';
import type { NetWorthResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface NetWorthForm {
    assets: string;
    liabilities: string;
}

const INITIAL_FORM: NetWorthForm = {
    assets: '',
    liabilities: '',
};

function getNetWorthColor(netWorth: number): string {
    if (netWorth > 0) return '#28a745';          // positive — green
    if (netWorth === 0) return 'var(--tg-primary-color)'; // neutral — blue
    return 'var(--tg-red)';                        // negative — red
}

export default function NetWorthCalculator() {
    const [form, setForm] = useState<NetWorthForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<NetWorthResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.netWorth({
                assets: parseFloat(form.assets),
                liabilities: parseFloat(form.liabilities),
            });
            return data.data!;
        });
    };

    const handleReset = () => reset(() => setForm(INITIAL_FORM));

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading textHeading="Net Worth Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Total Assets" placeholder="e.g. 100000"
                                                required id="assets" type="number" step="0.01" min="0"
                                                value={form.assets} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Total Liabilities" placeholder="e.g. 50000"
                                                required id="liabilities" type="number" step="0.01" min="0"
                                                value={form.liabilities} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Net Worth"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                <div className="pt-4">
                                    {loading && (
                                        <CalcResultSkeleton
                                            gridCols={2}
                                            gridRows={1}
                                            inputCols={2}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>

                                            {/* Net worth — colour-coded by positive/neutral/negative */}
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 mb-3"
                                                style={{
                                                    border: `1px solid ${getNetWorthColor(result.netWorth)}`,
                                                    borderRadius: '6px',
                                                    background: `${getNetWorthColor(result.netWorth)}11`,
                                                }}
                                            >
                                                <span style={{ fontWeight: 600 }}>Net Worth</span>
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 700,
                                                    color: getNetWorthColor(result.netWorth),
                                                }}>
                                                    ${result.netWorth.toLocaleString()}
                                                </span>
                                            </div>

                                            {/* Status badge */}
                                            <p
                                                className="mb-4"
                                                style={{
                                                    fontSize: '13px',
                                                    fontWeight: 600,
                                                    color: getNetWorthColor(result.netWorth),
                                                    padding: '8px 12px',
                                                    borderRadius: '4px',
                                                    background: `${getNetWorthColor(result.netWorth)}11`,
                                                    display: 'inline-block',
                                                }}
                                            >
                                                {result.status}
                                            </p>

                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Total Assets',
                                                        value: `$${result.breakdown.totalAssets.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Total Liabilities',
                                                        value: `$${result.breakdown.totalLiabilities.toLocaleString()}`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Assets', value: `$${result.inputs.assets}` },
                                                    { label: 'Liabilities', value: `$${result.inputs.liabilities}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Calculates your net worth by subtracting total liabilities from total assets, giving you a clear snapshot of your current financial position." />
                            <ToolDescription
                                title="Example"
                                details="With $100,000 in assets and $50,000 in liabilities, your net worth is $50,000 — a positive financial position." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="A positive net worth means your assets outweigh your debts. Neutral means they are equal. Negative means you owe more than you own — common early in life with student loans or mortgages, but worth tracking over time to ensure it trends upward." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}