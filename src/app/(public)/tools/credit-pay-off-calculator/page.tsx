// src/app/(public)/tools/credit-pay-off-calculator/page.tsx

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
import type { CreditPayoffResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface CreditPayoffForm {
    balance: string;
    interestRate: string;
    monthlyPayment: string;
}

const INITIAL_FORM: CreditPayoffForm = {
    balance: '',
    interestRate: '',
    monthlyPayment: '',
};

// Helper: convert months to readable string e.g. 32 → "2 yrs 8 mo"
function formatMonths(months: number): string {
    const yrs = Math.floor(months / 12);
    const mo = months % 12;
    if (yrs === 0) return `${mo} mo`;
    if (mo === 0) return `${yrs} yr${yrs > 1 ? 's' : ''}`;
    return `${yrs} yr${yrs > 1 ? 's' : ''} ${mo} mo`;
}

export default function CreditPayoffCalculator() {
    const [form, setForm] = useState<CreditPayoffForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<CreditPayoffResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.creditPayoff({
                balance: parseFloat(form.balance),
                interestRate: parseFloat(form.interestRate),
                monthlyPayment: parseFloat(form.monthlyPayment),
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
                            <Heading textHeading="Credit Card Payoff Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Current Balance" placeholder="e.g. 5000"
                                                required id="balance" type="number" step="0.01" min="0"
                                                value={form.balance} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Annual Interest Rate (%)" placeholder="e.g. 18"
                                                required id="interestRate" type="number" step="0.01" min="0"
                                                value={form.interestRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Monthly Payment" placeholder="e.g. 200"
                                                required id="monthlyPayment" type="number" step="0.01" min="0"
                                                value={form.monthlyPayment} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Payoff"
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
                                                label="Time to Pay Off"
                                                value={formatMonths(result.monthsToPayoff)}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Total Interest Paid',
                                                        value: `$${result.breakdown.totalInterestPaid.toLocaleString()}`,
                                                        highlight: false,
                                                    },
                                                    {
                                                        label: 'Total Amount Paid',
                                                        value: `$${result.breakdown.totalAmountPaid.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Original Balance',
                                                        value: `$${result.breakdown.originalBalance.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Monthly Interest Rate',
                                                        value: `${result.breakdown.monthlyInterestRate}%`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Balance', value: `$${result.inputs.balance}` },
                                                    { label: 'Interest Rate', value: `${result.inputs.interestRate}%` },
                                                    { label: 'Monthly Payment', value: `$${result.inputs.monthlyPayment}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Estimates how long it will take to pay off your credit card balance and the total interest cost based on your monthly payment." />
                            <ToolDescription
                                title="Example"
                                details="A $5,000 balance at 18% annual interest with $200 monthly payments takes approximately 32 months (2 yrs 8 mo) to clear, costing around $1,400 in interest." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Time to Pay Off is the number of months until the balance reaches zero. Total Interest Paid is the extra cost above your original balance. Total Amount Paid is balance plus all interest. Monthly Interest Rate is the annual rate divided by 12 — the portion applied each month to your remaining balance." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}