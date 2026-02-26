// src/app/(public)/tools/savings-goal-calculator/page.tsx

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
import type { SavingsGoalResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface SavingsGoalForm {
    savingsGoal: string;
    currentSavings: string;
    timeFrame: string;
}

const INITIAL_FORM: SavingsGoalForm = {
    savingsGoal: '',
    currentSavings: '',
    timeFrame: '',
};

export default function SavingsGoalCalculator() {
    const [form, setForm] = useState<SavingsGoalForm>(INITIAL_FORM);
    const [goalError, setGoalError] = useState('');
    const { result, loading, calculate, reset } = useCalculator<SavingsGoalResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setGoalError('');
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (parseFloat(form.currentSavings) >= parseFloat(form.savingsGoal)) {
            setGoalError('Current savings already meet or exceed the goal.');
            return;
        }
        await calculate(async () => {
            const { data } = await calculatorService.savingsGoal({
                savingsGoal: parseFloat(form.savingsGoal),
                currentSavings: parseFloat(form.currentSavings),
                timeFrame: parseFloat(form.timeFrame),
            });
            return data.data!;
        });
    };

    const handleReset = () => {
        reset(() => setForm(INITIAL_FORM));
        setGoalError('');
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading textHeading="Savings Goal Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Savings Goal" placeholder="e.g. 10000"
                                                required id="savingsGoal" type="number" step="0.01" min="0"
                                                value={form.savingsGoal} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Current Savings" placeholder="e.g. 1000"
                                                required id="currentSavings" type="number" step="0.01" min="0"
                                                value={form.currentSavings} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Time Frame (Years)" placeholder="e.g. 3"
                                                required id="timeFrame" type="number" step="0.01" min="0.1"
                                                value={form.timeFrame} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>

                                    {goalError && (
                                        <p style={{ color: 'var(--tg-red)', fontSize: '13px', marginBottom: '12px' }}>
                                            {goalError}
                                        </p>
                                    )}
                                    <CalcButtons
                                        submitText="Calculate Required Savings"
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
                                                label="Required Monthly Savings"
                                                value={`$${result.requiredSavings.toLocaleString()}`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Savings Goal',
                                                        value: `$${result.breakdown.savingsGoal.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Current Savings',
                                                        value: `$${result.breakdown.currentSavings.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Remaining to Save',
                                                        value: `$${result.breakdown.remainingGoal.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Total Months',
                                                        value: `${result.breakdown.totalMonths} mo`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Savings Goal', value: `$${result.inputs.savingsGoal}` },
                                                    { label: 'Current Savings', value: `$${result.inputs.currentSavings}` },
                                                    { label: 'Time Frame', value: `${result.inputs.timeFrame} yrs` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Calculates the monthly savings amount required to reach a specific financial goal within a set timeframe, based on your current savings." />
                            <ToolDescription
                                title="Example"
                                details="To reach a $10,000 goal in 3 years starting with $1,000, you need to save $250 per month over 36 months." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Required Monthly Savings is how much you must set aside each month to hit your goal on time. Remaining to Save is the gap between your current balance and your target. This calculator assumes no interest — adding a high-yield savings account or investment will reduce the required monthly amount." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}