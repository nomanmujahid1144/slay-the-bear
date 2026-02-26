// src/app/(public)/tools/mortgage-calculator/page.tsx

'use client'

import { useState } from 'react';
import InputField from '@/app/components/fields/Input';
import SelectionBox from '@/app/components/fields/Select';
import { Heading } from '@/app/components/heading/Heading';
import { CalculatorSidebar } from '@/app/components/calculator/CalculatorSidebar';
import { ToolDescription } from '../tool-description/ToolDescription';
import { CalcResultSkeleton } from '@/app/components/skeletons';
import { CalcResult, CalcResultPrimary, CalcResultGrid, CalcResultInputs } from '@/app/components/calculator/result';
import { useCalculator } from '@/app/hooks/useCalculator';
import { calculatorService } from '@/services/calculator.service';
import type { MortgageResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

type PaymentType = 'years' | 'months';

const PAYMENT_TYPE_OPTIONS = [
    { value: 'years', label: 'Years' },
    { value: 'months', label: 'Months' },
];

interface MortgageForm {
    loanAmount: string;
    interestRate: string;
    loanTerm: string;
    paymentType: PaymentType;
}

const INITIAL_FORM: MortgageForm = {
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    paymentType: 'years',
};

export default function MortgageCalculator() {
    const [form, setForm] = useState<MortgageForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<MortgageResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid =
        form.loanAmount !== '' &&
        form.interestRate !== '' &&
        form.loanTerm !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.mortgage({
                loanAmount: parseFloat(form.loanAmount),
                interestRate: parseFloat(form.interestRate),
                loanTerm: parseFloat(form.loanTerm),
                paymentType: form.paymentType,
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
                            <Heading textHeading="Mortgage Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Loan Amount" placeholder="e.g. 200000"
                                                required id="loanAmount" type="number" step="0.01" min="0"
                                                value={form.loanAmount} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Annual Interest Rate (%)" placeholder="e.g. 4"
                                                required id="interestRate" type="number" step="0.01" min="0"
                                                value={form.interestRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Loan Term" placeholder="e.g. 30"
                                                required id="loanTerm" type="number" min="1"
                                                value={form.loanTerm} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <SelectionBox
                                                label="Term Type"
                                                id="paymentType"
                                                value={form.paymentType}
                                                onChange={onChange}
                                                options={PAYMENT_TYPE_OPTIONS}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Payment"
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
                                            inputCols={4}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>
                                            <CalcResultPrimary
                                                label="Monthly Payment"
                                                value={`$${result.monthlyPayment.toLocaleString()}`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Loan Amount',
                                                        value: `$${result.breakdown.loanAmount.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Total Payments',
                                                        value: `${result.breakdown.totalPayments} mo`,
                                                    },
                                                    {
                                                        label: 'Total Interest',
                                                        value: `$${result.breakdown.totalInterest.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Total Amount Paid',
                                                        value: `$${result.breakdown.totalAmountPaid.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Loan Amount', value: `$${result.inputs.loanAmount}` },
                                                    { label: 'Interest Rate', value: `${result.inputs.interestRate}%` },
                                                    { label: 'Loan Term', value: `${result.inputs.loanTerm} ${result.inputs.paymentType}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Calculates your fixed monthly mortgage payment and shows the full cost of the loan including total interest paid over the life of the mortgage." />
                            <ToolDescription
                                title="Example"
                                details="A $200,000 loan at 4% for 30 years results in a monthly payment of $954.83, with $143,739 paid in interest over 360 months." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Monthly Payment is your fixed payment due each month. Total Payments is the number of monthly instalments. Total Interest is the cost of borrowing above the principal — the longer the term, the more interest accrues. Total Amount Paid is principal plus all interest." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}