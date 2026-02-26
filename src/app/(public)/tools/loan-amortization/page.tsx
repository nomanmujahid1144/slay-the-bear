// src/app/(public)/tools/loan-amortization-calculator/page.tsx

'use client'

import { useState } from 'react';
import InputField from '@/app/components/fields/Input';
import SelectionBox from '@/app/components/fields/Select';
import { Heading } from '@/app/components/heading/Heading';
import { CalculatorSidebar } from '@/app/components/calculator/CalculatorSidebar';
import { ToolDescription } from '../tool-description/ToolDescription';
import { CalcResultSkeleton } from '@/app/components/skeletons';
import { TgTable, type TgTableColumn } from '@/app/components/table/TgTable';
import { TgTableSkeleton } from '@/app/components/skeletons/tables/TableSkeleton';
import { CalcResult, CalcResultPrimary, CalcResultGrid, CalcResultInputs } from '@/app/components/calculator/result';
import { useCalculator } from '@/app/hooks/useCalculator';
import { calculatorService } from '@/services/calculator.service';
import type { LoanAmortizationResult, LoanAmortizationScheduleEntry } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

type LoanTermType = 'years' | 'months';

const TERM_TYPE_OPTIONS = [
    { value: 'years', label: 'Years' },
    { value: 'months', label: 'Months' },
];

interface LoanAmortizationForm {
    principal: string;
    annualInterestRate: string;
    loanTerm: string;
    loanTermType: LoanTermType;
    extraPayment: string;
}

const INITIAL_FORM: LoanAmortizationForm = {
    principal: '',
    annualInterestRate: '',
    loanTerm: '',
    loanTermType: 'years',
    extraPayment: '0',
};

const SCHEDULE_COLUMNS: TgTableColumn<LoanAmortizationScheduleEntry>[] = [
    {
        key: 'month',
        label: 'Month',
        render: (row) => <span>{row.month}</span>,
    },
    {
        key: 'principalPayment',
        label: 'Principal',
        align: 'right',
        render: (row) => (
            <span className="tg-cell-primary">${row.principalPayment.toLocaleString()}</span>
        ),
    },
    {
        key: 'interestPayment',
        label: 'Interest',
        align: 'right',
        render: (row) => (
            <span className="tg-cell-danger">${row.interestPayment.toLocaleString()}</span>
        ),
    },
    {
        key: 'balance',
        label: 'Remaining Balance',
        align: 'right',
        render: (row) => (
            <span className="tg-cell-value">${row.balance.toLocaleString()}</span>
        ),
    },
];

export default function LoanAmortizationCalculator() {
    const [form, setForm] = useState<LoanAmortizationForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<LoanAmortizationResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid =
        form.principal !== '' &&
        form.annualInterestRate !== '' &&
        form.loanTerm !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.loanAmortization({
                principal: parseFloat(form.principal),
                annualInterestRate: parseFloat(form.annualInterestRate),
                loanTerm: parseFloat(form.loanTerm),
                loanTermType: form.loanTermType,
                extraPayment: parseFloat(form.extraPayment) || 0,
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
                            <Heading textHeading="Loan Amortization Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Loan Amount" placeholder="e.g. 50000"
                                                required id="principal" type="number" step="0.01" min="0"
                                                value={form.principal} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Annual Interest Rate (%)" placeholder="e.g. 5"
                                                required id="annualInterestRate" type="number" step="0.01" min="0"
                                                value={form.annualInterestRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Loan Term" placeholder="e.g. 10"
                                                required id="loanTerm" type="number" min="1"
                                                value={form.loanTerm} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <SelectionBox
                                                label="Term Type"
                                                id="loanTermType"
                                                value={form.loanTermType}
                                                onChange={onChange}
                                                options={TERM_TYPE_OPTIONS}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Extra Monthly Payment" placeholder="e.g. 100"
                                                id="extraPayment" type="number" step="0.01" min="0"
                                                value={form.extraPayment} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Schedule"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                <div className="pt-4">
                                    {loading && (
                                        <>
                                            <CalcResultSkeleton gridCols={2} gridRows={2} inputCols={4} />
                                            <div className="mt-4">
                                                <TgTableSkeleton rows={6} cols={4} showFooter={false} />
                                            </div>
                                        </>
                                    )}

                                    {result && !loading && (
                                        <>
                                            <CalcResult message={result.message}>
                                                <CalcResultPrimary
                                                    label="Monthly Payment"
                                                    value={`$${result.summary.totalMonthlyPayment.toLocaleString()}`}
                                                />
                                                <CalcResultGrid
                                                    cols={2}
                                                    items={[
                                                        {
                                                            label: 'Base Monthly Payment',
                                                            value: `$${result.summary.baseMonthlyPayment.toLocaleString()}`,
                                                        },
                                                        {
                                                            label: 'Total Interest Paid',
                                                            value: `$${result.summary.totalInterestPaid.toLocaleString()}`,
                                                        },
                                                        {
                                                            label: 'Total Amount Paid',
                                                            value: `$${result.summary.totalAmountPaid.toLocaleString()}`,
                                                            highlight: true,
                                                        },
                                                        {
                                                            label: 'Total Payments',
                                                            value: `${result.summary.totalPayments} mo`,
                                                        },
                                                    ]}
                                                />
                                                <CalcResultInputs
                                                    items={[
                                                        { label: 'Loan Amount', value: `$${result.inputs.principal}` },
                                                        { label: 'Interest Rate', value: `${result.inputs.annualInterestRate}%` },
                                                        { label: 'Loan Term', value: `${result.inputs.loanTerm} ${result.inputs.loanTermType}` },
                                                        { label: 'Extra Payment', value: `$${result.inputs.extraPayment}` },
                                                    ]}
                                                />
                                            </CalcResult>

                                            {/* Amortization schedule table */}
                                            <div className="mt-4">
                                                <p style={{
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em',
                                                    opacity: 0.6,
                                                    marginBottom: '8px',
                                                }}>
                                                    Amortization Schedule
                                                </p>

                                                {/* Scrollable table wrapper */}
                                                <div style={{ maxHeight: '420px', overflowY: 'auto', borderRadius: '6px' }}>
                                                    <TgTable
                                                        columns={SCHEDULE_COLUMNS}
                                                        rows={result.amortizationSchedule}
                                                        keyExtractor={(row) => row.month}
                                                    />
                                                </div>

                                                <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '6px', textAlign: 'right' }}>
                                                    {result.amortizationSchedule.length} payments total
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Generates a full month-by-month amortization schedule showing how each payment is split between principal and interest over the life of the loan." />
                            <ToolDescription
                                title="Example"
                                details="A $50,000 loan at 5% for 10 years results in a $530.33 monthly payment, with total interest paid of $13,639 over 120 months." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Monthly Payment is the fixed amount due each month including any extra payment. Base Monthly Payment is the standard payment without extras. Total Interest Paid is the total cost of borrowing above the principal. The schedule shows how early payments are interest-heavy, gradually shifting toward principal as the balance decreases." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}