// src/app/(public)/tools/dividend-calculator/page.tsx

'use client'

import { useState } from 'react';
import InputField from '@/app/components/fields/Input';
import { Heading } from '@/app/components/heading/Heading';
import { CalculatorSidebar } from '@/app/components/calculator/CalculatorSidebar';
import { ToolDescription } from '../tool-description/ToolDescription';
import { CalcResultSkeleton } from '@/app/components/skeletons';
import { CalcResult, CalcResultPrimary, CalcResultGrid, CalcResultInputs } from '@/app/components/calculator/result';
import { useCalculator } from '@/app/hooks/useCalculator';
import { calculatorService } from '@/services/calculator.service';
import type { DividendResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface DividendForm {
    numShares: string;
    annualDividend: string;
    timePeriod: string;
}

const INITIAL_FORM: DividendForm = {
    numShares: '',
    annualDividend: '',
    timePeriod: '',
};

export default function DividendCalculator() {
    const [form, setForm] = useState<DividendForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<DividendResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.dividend({
                numShares: parseFloat(form.numShares),
                annualDividend: parseFloat(form.annualDividend),
                timePeriod: parseFloat(form.timePeriod),
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
                            <Heading textHeading="Dividend Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="share-alt"
                                                label="Number of Shares" placeholder="e.g. 100"
                                                required id="numShares" type="number" min="1"
                                                value={form.numShares} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Annual Dividend Per Share" placeholder="e.g. 3.00"
                                                required id="annualDividend" type="number" step="0.01" min="0"
                                                value={form.annualDividend} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Time Period (Years)" placeholder="e.g. 5"
                                                required id="timePeriod" type="number" min="1"
                                                value={form.timePeriod} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Divident Income"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                <div className="pt-4">
                                    {loading && (
                                        <CalcResultSkeleton
                                            gridCols={2}
                                            gridRows={2}
                                            inputCols={3}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>
                                            <CalcResultPrimary
                                                label="Total Dividend Income"
                                                value={`$${result.totalDividendIncome.toLocaleString()}`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Number of Shares',
                                                        value: result.breakdown.numberOfShares.toLocaleString(),
                                                    },
                                                    {
                                                        label: 'Annual Dividend / Share',
                                                        value: `$${result.breakdown.annualDividendPerShare.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Annual Income',
                                                        value: `$${result.breakdown.annualIncome.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: `Total Income (${result.breakdown.timePeriodYears} yrs)`,
                                                        value: `$${result.breakdown.totalIncome.toLocaleString()}`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Shares', value: result.inputs.numShares.toLocaleString() },
                                                    { label: 'Dividend / Share', value: `$${result.inputs.annualDividend}` },
                                                    { label: 'Time Period', value: `${result.inputs.timePeriod} yrs` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Estimates the total dividend income generated from a stock holding based on the number of shares, annual dividend per share, and investment duration." />
                            <ToolDescription
                                title="Example"
                                details="Owning 100 shares with a $3.00 annual dividend per share generates $300 per year and $1,500 over 5 years." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Total Dividend Income is the cumulative payout over the full period. Annual Income is what you receive every year from your holding. Annual Dividend per Share is the per-unit payout declared by the company. This calculator assumes a fixed dividend rate with no reinvestment." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}