'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function BondPriceCalculator() {

    const [couponPayment, setCouponPayment] = useState('');
    const [yieldRate, setYieldRate] = useState('');
    const [yearsToMaturity, setYearsToMaturity] = useState('');
    const [faceValue, setFaceValue] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.bondPrice({
                couponPayment: parseFloat(couponPayment),
                yieldRate: parseFloat(yieldRate),
                yearsToMaturity: parseInt(yearsToMaturity),
                faceValue: parseFloat(faceValue),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCouponPayment('');
        setYieldRate('');
        setYearsToMaturity('');
        setFaceValue('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Bond Price Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Coupon Payment:"
                                                placeholder="Enter Coupon Payment"
                                                required={true}
                                                id="coupon-payment"
                                                type="number"
                                                step="0.01"
                                                value={couponPayment}
                                                onChange={(e) => setCouponPayment(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percentage"
                                                label="Yield Rate (%):"
                                                placeholder="Enter Yield Rate"
                                                required={true}
                                                id="yield-rate"
                                                type="number"
                                                step="0.01"
                                                value={yieldRate}
                                                onChange={(e) => setYieldRate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar"
                                                label="Years to Maturity:"
                                                placeholder="Enter Years"
                                                required={true}
                                                id="years-to-maturity"
                                                type="number"
                                                value={yearsToMaturity}
                                                onChange={(e) => setYearsToMaturity(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Face Value:"
                                                placeholder="Enter Face Value"
                                                required={true}
                                                id="face-value"
                                                type="number"
                                                step="0.01"
                                                value={faceValue}
                                                onChange={(e) => setFaceValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Bond Price'}
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-10">
                                    {loading && <LoaderCircleIcon />}
                                    
                                    {result && !loading && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <h3 className="text-2xl font-bold text-primary">
                                                {result.message}
                                            </h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Bond Price</p>
                                                    <p className="text-lg font-semibold text-primary">${result.bondPrice}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">PV of Coupons</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.presentValueOfCoupons}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">PV of Face Value</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.presentValueOfFaceValue}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Bond Price</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.totalBondPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Calculates the current price of a bond based on future cash flows."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A bond with $50 annual coupons and a 4% yield is priced at $1,080.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={"The result shows the bond's price today, considering the present value of its future payments. This helps ensure you're paying a fair price for a bond or selling it at its correct value."}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}