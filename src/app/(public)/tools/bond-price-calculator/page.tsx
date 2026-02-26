// src/app/(public)/tools/bond-price-calculator/page.tsx

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
import type { BondPriceResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface BondPriceForm {
    couponPayment: string;
    yieldRate: string;
    yearsToMaturity: string;
    faceValue: string;
}

const INITIAL_FORM: BondPriceForm = {
    couponPayment: '',
    yieldRate: '',
    yearsToMaturity: '',
    faceValue: '',
};

export default function BondPriceCalculator() {
    const [form, setForm] = useState<BondPriceForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<BondPriceResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.bondPrice({
                couponPayment: parseFloat(form.couponPayment),
                yieldRate: parseFloat(form.yieldRate),
                yearsToMaturity: parseInt(form.yearsToMaturity),
                faceValue: parseFloat(form.faceValue),
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
                            <Heading textHeading="Bond Price Calculator" showBtn={false} />

                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="dollar-sign"
                                                label="Coupon Payment" placeholder="e.g. 50"
                                                required id="couponPayment" type="number" step="0.01" min="0"
                                                value={form.couponPayment} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Yield Rate (%)" placeholder="e.g. 4"
                                                required id="yieldRate" type="number" step="0.01" min="0"
                                                value={form.yieldRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Years to Maturity" placeholder="e.g. 10"
                                                required id="yearsToMaturity" type="number" min="1"
                                                value={form.yearsToMaturity} onChange={onChange} isVisible={false}
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
                                    </div>
                                    <CalcButtons
                                        submitText="Calculate Bond Price"
                                        loading={loading}
                                        disabled={!isFormValid}
                                        onReset={handleReset}
                                    />
                                </form>

                                <div className="pt-4">
                                    {/* Skeleton — matches result layout exactly */}
                                    {loading && (
                                        <CalcResultSkeleton
                                            gridCols={3}
                                            gridRows={1}
                                            inputCols={4}
                                        />
                                    )}

                                    {result && !loading && (
                                        <CalcResult message={result.message}>
                                            <CalcResultPrimary
                                                label="Bond Price"
                                                value={`$${result.bondPrice.toLocaleString()}`}
                                            />
                                            <CalcResultGrid
                                                cols={3}
                                                items={[
                                                    { label: 'PV of Coupons', value: `$${result.breakdown.presentValueOfCoupons.toLocaleString()}` },
                                                    { label: 'PV of Face Value', value: `$${result.breakdown.presentValueOfFaceValue.toLocaleString()}` },
                                                    { label: 'Total Bond Price', value: `$${result.breakdown.totalBondPrice.toLocaleString()}`, highlight: true },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Coupon Payment', value: `$${result.inputs.couponPayment}` },
                                                    { label: 'Yield Rate', value: `${result.inputs.yieldRate}%` },
                                                    { label: 'Years', value: `${result.inputs.yearsToMaturity} yrs` },
                                                    { label: 'Face Value', value: `$${result.inputs.faceValue}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription title="Summary"
                                details="Calculates the current price of a bond based on its future cash flows discounted to present value." />
                            <ToolDescription title="Example"
                                details="A bond with $50 annual coupons, 4% yield, 10 years to maturity, and $1,000 face value is priced at $1,081.11." />
                            <ToolDescription title="Explanation of Results"
                                details="Bond Price is the fair value today of all future payments. PV of Coupons is the present value of all periodic interest payments. PV of Face Value is what the principal repayment is worth in today's dollars." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}