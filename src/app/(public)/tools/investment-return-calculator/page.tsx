// src/app/(public)/tools/investment-return-calculator/page.tsx

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
import type { InvestmentReturnResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface InvestmentReturnForm {
    initialInvestment: string;
    annualReturnRate: string;
    investmentYears: string;
}

const INITIAL_FORM: InvestmentReturnForm = {
    initialInvestment: '',
    annualReturnRate: '',
    investmentYears: '',
};

export default function InvestmentReturnCalculator() {
    const [form, setForm] = useState<InvestmentReturnForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<InvestmentReturnResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.investmentReturn({
                initialInvestment: parseFloat(form.initialInvestment),
                annualReturnRate: parseFloat(form.annualReturnRate),
                investmentYears: parseInt(form.investmentYears),
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
                            <Heading textHeading="Investment Return Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Initial Investment" placeholder="e.g. 10000"
                                                required id="initialInvestment" type="number" step="0.01" min="0"
                                                value={form.initialInvestment} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Annual Return Rate (%)" placeholder="e.g. 8"
                                                required id="annualReturnRate" type="number" step="0.01" min="0"
                                                value={form.annualReturnRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Investment Period (Years)" placeholder="e.g. 10"
                                                required id="investmentYears" type="number" min="1"
                                                value={form.investmentYears} onChange={onChange} isVisible={false}
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
                                            inputCols={3}
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
                                                        label: 'Initial Investment',
                                                        value: `$${result.breakdown.initialInvestment.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Total Return',
                                                        value: `$${result.breakdown.totalReturn.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Return Percentage',
                                                        value: `${result.breakdown.returnPercentage}%`,
                                                    },
                                                    {
                                                        label: 'Investment Period',
                                                        value: `${result.breakdown.investmentPeriod} yrs`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Initial Investment', value: `$${result.inputs.initialInvestment}` },
                                                    { label: 'Annual Return Rate', value: `${result.inputs.annualReturnRate}%` },
                                                    { label: 'Investment Period', value: `${result.inputs.investmentYears} yrs` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Projects the future value of an investment based on a fixed annual return rate, showing total growth and return percentage over the chosen period." />
                            <ToolDescription
                                title="Example"
                                details="Investing $10,000 at an 8% annual return for 10 years grows to $21,589 — a total return of $11,589 or 115.89%." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Future Value is the total worth of your investment at the end of the period. Total Return is the profit above your initial investment. Return Percentage is the total gain expressed as a percentage of the original amount. This calculator uses annual compounding (FV = P × (1 + r)^t)." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}