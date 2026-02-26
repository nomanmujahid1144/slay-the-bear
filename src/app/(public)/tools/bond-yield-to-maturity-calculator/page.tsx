// src/app/(public)/tools/bond-yield-to-maturity-calculator/page.tsx

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
import type { BondYTMResult } from '@/types/calculator';
import { CalcButtons } from '@/app/components/calculator/CalcButtons';

interface BondYTMForm {
    bondPrice: string;
    faceValue: string;
    couponRate: string;
    periodsToMaturity: string;
}

const INITIAL_FORM: BondYTMForm = {
    bondPrice: '',
    faceValue: '',
    couponRate: '',
    periodsToMaturity: '',
};

export default function BondYTMCalculator() {
    const [form, setForm] = useState<BondYTMForm>(INITIAL_FORM);
    const { result, loading, calculate, reset } = useCalculator<BondYTMResult>();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const isFormValid = Object.values(form).every((v) => v !== '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await calculate(async () => {
            const { data } = await calculatorService.bondYTM({
                bondPrice: parseFloat(form.bondPrice),
                faceValue: parseFloat(form.faceValue),
                couponRate: parseFloat(form.couponRate),
                periodsToMaturity: parseInt(form.periodsToMaturity),
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
                            <Heading textHeading="Bond Yield to Maturity (YTM) Calculator" showBtn={false} />

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
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="percentage"
                                                label="Coupon Rate (%)" placeholder="e.g. 5"
                                                required id="couponRate" type="number" step="0.01" min="0"
                                                value={form.couponRate} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome fontAwsomeIcon="calendar"
                                                label="Periods to Maturity" placeholder="e.g. 10"
                                                required id="periodsToMaturity" type="number" min="1"
                                                value={form.periodsToMaturity} onChange={onChange} isVisible={false}
                                            />
                                        </div>
                                    </div>

                                    <CalcButtons
                                        submitText="Calculate YTM"
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
                                                label="Yield to Maturity"
                                                value={`${result.ytm}%`}
                                            />
                                            <CalcResultGrid
                                                cols={2}
                                                items={[
                                                    {
                                                        label: 'Coupon Payment',
                                                        value: `$${result.breakdown.couponPayment.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Capital Gain / Period',
                                                        value: `$${result.breakdown.capitalGainPerPeriod.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'Average Price',
                                                        value: `$${result.breakdown.averagePrice.toLocaleString()}`,
                                                    },
                                                    {
                                                        label: 'YTM Percentage',
                                                        value: `${result.breakdown.ytmPercentage}%`,
                                                        highlight: true,
                                                    },
                                                ]}
                                            />
                                            <CalcResultInputs
                                                items={[
                                                    { label: 'Bond Price', value: `$${result.inputs.bondPrice}` },
                                                    { label: 'Face Value', value: `$${result.inputs.faceValue}` },
                                                    { label: 'Coupon Rate', value: `${result.inputs.couponRate}%` },
                                                    { label: 'Periods', value: `${result.inputs.periodsToMaturity}` },
                                                ]}
                                            />
                                        </CalcResult>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title="Summary"
                                details="Estimates the total annualized return if you hold a bond until maturity, based on its current price, face value, coupon rate, and time remaining." />
                            <ToolDescription
                                title="Example"
                                details="A bond bought at $950 with a $1,000 face value, 5% coupon rate, and 10 periods to maturity has a YTM of approximately 5.54%." />
                            <ToolDescription
                                title="Explanation of Results"
                                details="YTM is the annualized return assuming you hold the bond to maturity and reinvest all coupon payments. Coupon Payment is the periodic interest income. Capital Gain per Period is the portion of the discount or premium amortized each period. Average Price is the midpoint between purchase price and face value used in the approximation formula." />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}