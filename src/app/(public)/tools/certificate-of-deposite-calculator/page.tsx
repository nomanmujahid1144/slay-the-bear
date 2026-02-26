// src/app/(public)/tools/certificate-of-deposite-calculator/page.tsx

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
import type { CDResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

type CDFrequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'daily';

const CD_FREQUENCY_OPTIONS = [
    { label: 'Annually', value: 'annually' },
    { label: 'Semiannually', value: 'semiannually' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Daily', value: 'daily' },
];

interface CDForm {
    principal: string;
    annualInterestRate: string;
    timePeriod: string;
    compoundingFrequency: CDFrequency;
}

const INITIAL_FORM: CDForm = {
    principal: '',
    annualInterestRate: '',
    timePeriod: '',
    compoundingFrequency: 'annually',
};

export default function CDCalculator() {
    const [form, setForm] = useState<CDForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<CDResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid =
        form.principal !== '' &&
        form.annualInterestRate !== '' &&
        form.timePeriod !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.cd({
                principal: parseFloat(form.principal),
                annualInterestRate: parseFloat(form.annualInterestRate),
                timePeriod: parseFloat(form.timePeriod),
                compoundingFrequency: form.compoundingFrequency,
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
                            <Heading textHeading="CD Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Principal Amount" placeholder="e.g. 5000"
                                                required id="principal" type="number" step="0.01" min="0"
                                                value={form.principal} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Annual Interest Rate (%)" placeholder="e.g. 3"
                                                required id="annualInterestRate" type="number" step="0.01" min="0"
                                                value={form.annualInterestRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Time Period (Years)" placeholder="e.g. 3"
                                                required id="timePeriod" type="number" step="0.01" min="0"
                                                value={form.timePeriod} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <SelectionBox
                                                label="Compounding Frequency"
                                                required id="compoundingFrequency"
                                                value={form.compoundingFrequency}
                                                onChange={onChange}
                                                options={CD_FREQUENCY_OPTIONS}
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
                                                label="Future Value of CD"
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
                                                        value: `${result.breakdown.effectiveRate}%`,
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
                                                    { label: 'Rate', value: `${result.inputs.annualInterestRate}%` },
                                                    { label: 'Time Period', value: `${result.inputs.timePeriod} yrs` },
                                                    { label: 'Compounding', value: result.inputs.compoundingFrequency },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Estimates the future value of a Certificate of Deposit based on your initial deposit, interest rate, time period, and compounding frequency." />
                            <ToolDescription
                                title="Example"
                                details="A $5,000 CD at 3% annual interest compounded monthly for 3 years grows to approximately $5,463, earning $463 in interest." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Future Value is the total amount including principal and interest at maturity. Total Interest Earned is the profit above your initial deposit. Effective Annual Rate accounts for compounding — it's always slightly higher than the nominal rate when compounding is more frequent than annually. Total Compounding Periods is how many times interest was applied." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}