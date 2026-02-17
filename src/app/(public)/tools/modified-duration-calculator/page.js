'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function ModifiedDurationCalculator() {

    const [bondPrice, setBondPrice] = useState('');
    const [faceValue, setFaceValue] = useState('');
    const [couponRate, setCouponRate] = useState('');
    const [yieldRate, setYieldRate] = useState('');
    const [periodsPerYear, setPeriodsPerYear] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.modifiedDuration({
                bondPrice: parseFloat(bondPrice),
                faceValue: parseFloat(faceValue),
                couponRate: parseFloat(couponRate),
                yieldRate: parseFloat(yieldRate),
                periodsPerYear: parseInt(periodsPerYear),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setBondPrice('');
        setFaceValue('');
        setCouponRate('');
        setYieldRate('');
        setPeriodsPerYear('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Modified Duration Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Bond Price:"
                                                placeholder="Enter Bond Price"
                                                required={true}
                                                id="bond-price"
                                                type="number"
                                                step="0.01"
                                                value={bondPrice}
                                                onChange={(e) => setBondPrice(e.target.value)}
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
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percentage"
                                                label="Coupon Rate (%):"
                                                placeholder="Enter Coupon Rate"
                                                required={true}
                                                id="coupon-rate"
                                                type="number"
                                                step="0.01"
                                                value={couponRate}
                                                onChange={(e) => setCouponRate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
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
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar"
                                                label="Periods Per Year:"
                                                placeholder="Enter Periods"
                                                required={true}
                                                id="periods"
                                                type="number"
                                                value={periodsPerYear}
                                                onChange={(e) => setPeriodsPerYear(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Duration'}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Modified Duration</p>
                                                    <p className="text-lg font-semibold text-primary">{result.modifiedDuration}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Macaulay Duration</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.macaulayDuration}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Bond Price</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.bondPrice}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Face Value</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.faceValue}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Measures a bond’s sensitivity to interest rate changes."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A bond with a duration of 5 will decrease 5% in price for every 1% rise in interest rates.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result helps you assess the interest rate risk of your bond investments, allowing you to make informed decisions about which bonds to hold during periods of changing interest rates.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}