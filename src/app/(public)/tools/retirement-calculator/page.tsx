// src/app/(public)/tools/retirement-calculator/page.tsx

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
import type { RetirementResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface RetirementForm {
    currentAge: string;
    retirementAge: string;
    currentSavings: string;
    annualContributions: string;
    expectedRateOfReturn: string;
}

const INITIAL_FORM: RetirementForm = {
    currentAge: '',
    retirementAge: '',
    currentSavings: '',
    annualContributions: '',
    expectedRateOfReturn: '',
};

export default function RetirementCalculator() {
    const [form, setForm] = useState<RetirementForm>(INITIAL_FORM);
    const [ageError, setAgeError] = useState('');
    const { result, loading, calculate, reset } = useCalculator<RetirementResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAgeError('');
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(form.retirementAge) <= parseInt(form.currentAge)) {
            setAgeError('Retirement age must be greater than current age.');
            return;
        }
        await calculate(async () => {
            const { data } = await calculatorService.retirement({
                currentAge: parseInt(form.currentAge),
                retirementAge: parseInt(form.retirementAge),
                currentSavings: parseFloat(form.currentSavings),
                annualContributions: parseFloat(form.annualContributions),
                expectedRateOfReturn: parseFloat(form.expectedRateOfReturn),
            });
            return data.data!;
        });
    };

    const handleReset = () => {
        reset(() => setForm(INITIAL_FORM));
        setAgeError('');
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading textHeading="Retirement Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="user"
                                                label="Current Age" placeholder="e.g. 30"
                                                required id="currentAge" type="number" min="1" max="100"
                                                value={form.currentAge} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Retirement Age" placeholder="e.g. 65"
                                                required id="retirementAge" type="number" min="1" max="100"
                                                value={form.retirementAge} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Current Savings" placeholder="e.g. 20000"
                                                required id="currentSavings" type="number" step="0.01" min="0"
                                                value={form.currentSavings} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Annual Contributions" placeholder="e.g. 6000"
                                                required id="annualContributions" type="number" step="0.01" min="0"
                                                value={form.annualContributions} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Expected Rate of Return (%)" placeholder="e.g. 6"
                                                required id="expectedRateOfReturn" type="number" step="0.01" min="0"
                                                value={form.expectedRateOfReturn} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>

                                    {ageError && (
                                        <p style={{ color: 'var(--tg-red)', fontSize: '13px', marginBottom: '12px' }}>
                                            {ageError}
                                        </p>
                                    )}

                                    <CalcButtons
                                        submitText="Calculate Retirement Savings"
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
                                            inputCols={5}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>
                                            <CalcResultPrimary
                                                label="Estimated Savings at Retirement"
                                                value={`$${result.futureValue.toLocaleString()}`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Years to Retirement',
                                                        value: `${result.breakdown.yearsToRetirement} yrs`,
                                                    },
                                                    {
                                                        label: 'Growth from Contributions',
                                                        value: `$${result.breakdown.futureValueOfContributions.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Growth from Current Savings',
                                                        value: `$${result.breakdown.futureValueOfCurrentSavings.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Total Future Value',
                                                        value: `$${result.breakdown.totalFutureValue.toLocaleString()}`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Current Age', value: `${result.inputs.currentAge} yrs` },
                                                    { label: 'Retirement Age', value: `${result.inputs.retirementAge} yrs` },
                                                    { label: 'Current Savings', value: `$${result.inputs.currentSavings}` },
                                                    { label: 'Annual Contrib.', value: `$${result.inputs.annualContributions}` },
                                                    { label: 'Expected Return', value: `${result.inputs.expectedRateOfReturn}%` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Projects your total retirement savings based on current savings, annual contributions, expected investment return, and years until retirement." />
                            <ToolDescription
                                title="Example"
                                details="Starting at age 30 with $20,000 saved, contributing $6,000 per year at a 6% return, you'll have approximately $1.1M by age 65." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Growth from Contributions is the future value of all annual contributions compounded over time. Growth from Current Savings is how your existing balance compounds until retirement. Total Future Value combines both — the more years you have, the more powerful compounding becomes." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}