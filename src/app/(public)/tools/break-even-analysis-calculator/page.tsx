// src/app/(public)/tools/break-even-analysis-calculator/page.tsx

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
import type { BreakEvenResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface BreakEvenForm {
    fixedCosts: string;
    variableCostPerUnit: string;
    sellingPricePerUnit: string;
}

const INITIAL_FORM: BreakEvenForm = {
    fixedCosts: '',
    variableCostPerUnit: '',
    sellingPricePerUnit: '',
};

export default function BreakEvenCalculator() {
    const [form, setForm] = useState<BreakEvenForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<BreakEvenResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.breakEven({
                fixedCosts: parseFloat(form.fixedCosts),
                variableCostPerUnit: parseFloat(form.variableCostPerUnit),
                sellingPricePerUnit: parseFloat(form.sellingPricePerUnit),
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
                            <Heading textHeading="Break-Even Analysis Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Fixed Costs" placeholder="e.g. 10000"
                                                required id="fixedCosts" type="number" step="0.01" min="0"
                                                value={form.fixedCosts} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Variable Cost Per Unit" placeholder="e.g. 5"
                                                required id="variableCostPerUnit" type="number" step="0.01" min="0"
                                                value={form.variableCostPerUnit} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Selling Price Per Unit" placeholder="e.g. 20"
                                                required id="sellingPricePerUnit" type="number" step="0.01" min="0"
                                                value={form.sellingPricePerUnit} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Break Even"
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
                                                label="Break-Even Units"
                                                value={result.breakEvenUnits.toLocaleString()}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Contribution Margin / Unit',
                                                        value: `$${result.breakdown.contributionMarginPerUnit.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Break-Even Revenue',
                                                        value: `$${result.breakdown.breakEvenRevenue.toLocaleString()}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Total Variable Costs',
                                                        value: `$${result.breakdown.totalVariableCosts.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Total Costs',
                                                        value: `$${result.breakdown.totalCosts.toLocaleString()}`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Fixed Costs', value: `$${result.inputs.fixedCosts}` },
                                                    { label: 'Variable Cost / Unit', value: `$${result.inputs.variableCostPerUnit}` },
                                                    { label: 'Selling Price / Unit', value: `$${result.inputs.sellingPricePerUnit}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Determines the exact number of units you need to sell to cover all your fixed and variable costs before turning a profit." />
                            <ToolDescription
                                title="Example"
                                details="With $10,000 in fixed costs, $5 variable cost per unit, and a $20 selling price, you need to sell 667 units to break even at $13,340 in revenue." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Break-Even Units is the minimum sales volume needed to cover all costs. Contribution Margin is the profit per unit after variable costs, used to pay off fixed costs. Break-Even Revenue is the total sales amount at the break-even point. Total Costs is the sum of all fixed and variable costs at that sales volume." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}