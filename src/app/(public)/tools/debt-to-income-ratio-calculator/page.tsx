// src/app/(public)/tools/debt-to-income-ratio-calculator/page.tsx

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
import type { DebtToIncomeResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface DebtToIncomeForm {
    debtPayments: string;
    monthlyIncome: string;
}

const INITIAL_FORM: DebtToIncomeForm = {
    debtPayments: '',
    monthlyIncome: '',
};

// DTI thresholds — colour-code the ratio for quick visual feedback
function getDtiColor(dtir: number): string {
    if (dtir <= 36) return '#28a745';   // excellent — green
    if (dtir <= 43) return '#fd7e14';   // good      — orange
    if (dtir <= 50) return '#ffc107';   // fair      — yellow
    return 'var(--tg-red)';             // poor      — red
}

export default function DebtToIncomeCalculator() {
    const [form, setForm] = useState<DebtToIncomeForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<DebtToIncomeResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.debtToIncome({
                debtPayments: parseFloat(form.debtPayments),
                monthlyIncome: parseFloat(form.monthlyIncome),
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
                            <Heading textHeading="Debt-to-Income Ratio Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Monthly Debt Payments" placeholder="e.g. 1000"
                                                required id="debtPayments" type="number" step="0.01" min="0"
                                                value={form.debtPayments} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Gross Monthly Income" placeholder="e.g. 5000"
                                                required id="monthlyIncome" type="number" step="0.01" min="0"
                                                value={form.monthlyIncome} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Ratio"
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
                                            inputCols={2}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>

                                            {/* DTI ratio — colour-coded by threshold */}
                                            <div
                                                className="d-flex justify-content-between align-items-center p-3 mb-3"
                                                style={{
                                                    border: `1px solid ${getDtiColor(result.dtir)}`,
                                                    borderRadius: '6px',
                                                    background: `${getDtiColor(result.dtir)}11`,
                                                }}
                                            >
                                                <span style={{ fontWeight: 600 }}>DTI Ratio</span>
                                                <span style={{
                                                    fontSize: '1.5rem',
                                                    fontWeight: 700,
                                                    color: getDtiColor(result.dtir),
                                                }}>
                                                    {result.dtir}%
                                                </span>
                                            </div>

                                            {/* Assessment badge */}
                                            <p
                                                className="mb-4"
                                                style={{
                                                    fontSize: '13px',
                                                    fontWeight: 600,
                                                    color: getDtiColor(result.dtir),
                                                    padding: '8px 12px',
                                                    borderRadius: '4px',
                                                    background: `${getDtiColor(result.dtir)}11`,
                                                    display: 'inline-block',
                                                }}
                                            >
                                                {result.assessment}
                                            </p>

                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Monthly Debt',
                                                        value: `$${result.breakdown.totalMonthlyDebt.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Monthly Income',
                                                        value: `$${result.breakdown.grossMonthlyIncome.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Remaining Income',
                                                        value: `$${result.breakdown.remainingIncome.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Debt Percentage',
                                                        value: `${result.breakdown.debtPercentage}%`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Debt Payments', value: `$${result.inputs.debtPayments}` },
                                                    { label: 'Monthly Income', value: `$${result.inputs.monthlyIncome}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Calculates the percentage of your gross monthly income that goes toward debt payments — a key metric lenders use to evaluate creditworthiness." />
                            <ToolDescription
                                title="Example"
                                details="With $1,000 in monthly debt and $5,000 in gross income, your DTI is 20% — considered excellent by most lenders." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="DTI Ratio is your monthly debt as a percentage of income. Under 36% is excellent, 36–43% is manageable, 43–50% may limit credit access, and above 50% signals financial stress. Remaining Income is what's left after debt obligations each month." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}