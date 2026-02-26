// src/app/(public)/tools/rule-of-72-calculator/page.tsx

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
import type { RuleOf72Result } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface RuleOf72Form {
    annualRate: string;
}

const INITIAL_FORM: RuleOf72Form = {
    annualRate: '',
};

export default function RuleOf72Calculator() {
    const [form, setForm] = useState<RuleOf72Form>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<RuleOf72Result>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = form.annualRate !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.ruleOf72({
                annualRate: parseFloat(form.annualRate),
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
                            <Heading textHeading="Rule of 72 Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Annual Interest Rate (%)" placeholder="e.g. 6"
                                                required id="annualRate" type="number" step="0.01" min="0.01"
                                                value={form.annualRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Years to Double"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                <div className="pt-4">
                                    {loading && (
                                        <CalcResultSkeleton
                                            gridCols={2}
                                            gridRows={1}
                                            inputCols={1}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>
                                            <CalcResultPrimary
                                                label="Years to Double"
                                                value={`${result.yearsToDouble} yrs`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Annual Rate',
                                                        value: `${result.breakdown.annualRate}%`,
                                                    },
                                                    {
                                                        label: 'Formula Used',
                                                        value: result.breakdown.formula,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Annual Rate', value: `${result.inputs.annualRate}%` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Uses the Rule of 72 — a mental math shortcut — to estimate how many years it takes for an investment to double at a fixed annual rate." />
                            <ToolDescription
                                title="Example"
                                details="At 6% interest, your money doubles in 72 ÷ 6 = 12 years. At 9%, it doubles in just 8 years." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="The Rule of 72 works by dividing 72 by the annual interest rate. It's a quick approximation — the actual doubling time from exact compound interest is very close but slightly different. It's most useful for comparing rates at a glance without a calculator." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}