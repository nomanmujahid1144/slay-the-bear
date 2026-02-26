// src/app/(public)/tools/modified-duration-calculator/page.tsx

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
import type { ModifiedDurationResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

const PERIODS_OPTIONS = [
    { value: '1', label: 'Annually (1×/yr)' },
    { value: '2', label: 'Semiannually (2×/yr)' },
    { value: '4', label: 'Quarterly (4×/yr)' },
    { value: '12', label: 'Monthly (12×/yr)' },
];

interface ModifiedDurationForm {
    bondPrice: string;
    faceValue: string;
    couponRate: string;
    yieldRate: string;
    periodsPerYear: string;
}

const INITIAL_FORM: ModifiedDurationForm = {
    bondPrice: '',
    faceValue: '',
    couponRate: '',
    yieldRate: '',
    periodsPerYear: '2',
};

export default function ModifiedDurationCalculator() {
    const [form, setForm] = useState<ModifiedDurationForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<ModifiedDurationResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.modifiedDuration({
                bondPrice: parseFloat(form.bondPrice),
                faceValue: parseFloat(form.faceValue),
                couponRate: parseFloat(form.couponRate),
                yieldRate: parseFloat(form.yieldRate),
                periodsPerYear: parseInt(form.periodsPerYear),
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
                            <Heading textHeading="Modified Duration Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Bond Price" placeholder="e.g. 950"
                                                required id="bondPrice" type="number" step="0.01" min="0"
                                                value={form.bondPrice} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Face Value" placeholder="e.g. 1000"
                                                required id="faceValue" type="number" step="0.01" min="0"
                                                value={form.faceValue} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Coupon Rate (%)" placeholder="e.g. 5"
                                                required id="couponRate" type="number" step="0.01" min="0"
                                                value={form.couponRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Yield Rate (%)" placeholder="e.g. 6"
                                                required id="yieldRate" type="number" step="0.01" min="0"
                                                value={form.yieldRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <SelectionBox
                                                label="Periods Per Year"
                                                required id="periodsPerYear"
                                                value={form.periodsPerYear}
                                                onChange={onChange}
                                                options={PERIODS_OPTIONS}
                                            />
                                        </div>
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Duration"
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
                                                label="Modified Duration"
                                                value={`${result.modifiedDuration}`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Macaulay Duration',
                                                        value: `${result.breakdown.macaulayDuration}`,
                                                        highlight: true,
                                                    },
                                                    {
                                                        label: 'Periods Per Year',
                                                        value: `${result.breakdown.periodsPerYear}`,
                                                    },
                                                    {
                                                        label: 'Bond Price',
                                                        value: `$${result.breakdown.bondPrice.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Face Value',
                                                        value: `$${result.breakdown.faceValue.toLocaleString()}`,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Bond Price', value: `$${result.inputs.bondPrice}` },
                                                    { label: 'Face Value', value: `$${result.inputs.faceValue}` },
                                                    { label: 'Coupon Rate', value: `${result.inputs.couponRate}%` },
                                                    { label: 'Yield Rate', value: `${result.inputs.yieldRate}%` },
                                                    { label: 'Periods/Year', value: `${result.inputs.periodsPerYear}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Measures a bond's price sensitivity to interest rate changes, expressed as the approximate percentage change in price for a 1% move in yield." />
                            <ToolDescription
                                title="Example"
                                details="A bond with a Modified Duration of 5 will decrease approximately 5% in price for every 1% rise in interest rates — and gain 5% for every 1% fall." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="Modified Duration is derived from Macaulay Duration — the weighted average time to receive the bond's cash flows. Dividing Macaulay Duration by (1 + yield/periods) gives Modified Duration, which directly approximates price sensitivity. Higher duration means greater interest rate risk." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}