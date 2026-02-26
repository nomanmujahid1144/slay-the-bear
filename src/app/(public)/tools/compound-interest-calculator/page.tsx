// src/app/(public)/tools/compound-interest-calculator/page.tsx

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
import type { CompoundInterestResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

// Frequency as a friendly select — maps label → numeric value the backend expects
const FREQUENCY_OPTIONS = [
    { label: 'Annually (1×/yr)', value: '1' },
    { label: 'Semiannually (2×/yr)', value: '2' },
    { label: 'Quarterly (4×/yr)', value: '4' },
    { label: 'Monthly (12×/yr)', value: '12' },
    { label: 'Daily (365×/yr)', value: '365' },
];

const FREQUENCY_LABELS: Record<string, string> = {
    '1': 'Annually',
    '2': 'Semiannually',
    '4': 'Quarterly',
    '12': 'Monthly',
    '365': 'Daily',
};

interface CompoundInterestForm {
    principal: string;
    interestRate: string;
    compoundingFrequency: string;
    timePeriod: string;
}

const INITIAL_FORM: CompoundInterestForm = {
    principal: '',
    interestRate: '',
    compoundingFrequency: '12',
    timePeriod: '',
};

export default function CompoundInterestCalculator() {
    const [form, setForm] = useState<CompoundInterestForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<CompoundInterestResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid =
        form.principal !== '' &&
        form.interestRate !== '' &&
        form.timePeriod !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.compoundInterest({
                principal: parseFloat(form.principal),
                interestRate: parseFloat(form.interestRate),
                compoundingFrequency: parseInt(form.compoundingFrequency),
                timePeriod: parseInt(form.timePeriod),
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
                            <Heading textHeading="Compound Interest Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Principal Amount" placeholder="e.g. 1000"
                                                required id="principal" type="number" step="0.01" min="0"
                                                value={form.principal} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Interest Rate (%)" placeholder="e.g. 5"
                                                required id="interestRate" type="number" step="0.01" min="0"
                                                value={form.interestRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <SelectionBox
                                                label="Compounding Frequency"
                                                required id="compoundingFrequency"
                                                value={form.compoundingFrequency}
                                                onChange={onChange}
                                                options={FREQUENCY_OPTIONS}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Time Period (Years)" placeholder="e.g. 5"
                                                required id="timePeriod" type="number" min="1"
                                                value={form.timePeriod} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Return"
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
                                                label="Future Value"
                                                value={`$${result.futureValue.toLocaleString()}`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Principal Amount',
                                                        value: `$${result.breakdown.principalAmount.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Total Interest Earned',
                                                        value: `$${result.breakdown.totalInterestEarned.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Effective Annual Rate',
                                                        value: `${result.breakdown.effectiveAnnualRate}%`,
                                                    },
                                                    {
                                                        label: 'Total Compounding Periods',
                                                        value: `${result.breakdown.totalCompoundingPeriods}`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Principal', value: `$${result.inputs.principal}` },
                                                    { label: 'Rate', value: `${result.inputs.interestRate}%` },
                                                    { label: 'Compounding', value: FREQUENCY_LABELS[result.inputs.compoundingFrequency] ?? `${result.inputs.compoundingFrequency}×/yr` },
                                                    { label: 'Time Period', value: `${result.inputs.timePeriod} yrs` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Shows how an investment grows over time when interest is earned on both the principal and previously accumulated interest." />
                            <ToolDescription
                                title="Example"
                                details="A $1,000 investment at 5% interest compounded monthly for 5 years grows to $1,283.36 — earning $283.36 in interest." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Future Value is the total amount at the end of the period. Total Interest Earned is your profit above the original deposit. Effective Annual Rate is the real yearly return after accounting for compounding — it is always slightly higher than the stated rate when compounding is more frequent than annually. Total Compounding Periods is the number of times interest was applied." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}