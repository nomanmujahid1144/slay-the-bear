'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function BondYTMCalculator() {

    const [bondPrice, setBondPrice] = useState('');
    const [faceValue, setFaceValue] = useState('');
    const [couponRate, setCouponRate] = useState('');
    const [periodsToMaturity, setPeriodsToMaturity] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.bondYTM({
                bondPrice: parseFloat(bondPrice),
                faceValue: parseFloat(faceValue),
                couponRate: parseFloat(couponRate),
                periodsToMaturity: parseInt(periodsToMaturity),
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
        setPeriodsToMaturity('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Bond Yield to Maturity (YTM) Calculator"
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
                                        <div className="col-md-6">
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
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar"
                                                label="Periods to Maturity:"
                                                placeholder="Enter Periods"
                                                required={true}
                                                id="periods"
                                                type="number"
                                                value={periodsToMaturity}
                                                onChange={(e) => setPeriodsToMaturity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate YTM'}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">YTM</p>
                                                    <p className="text-lg font-semibold text-primary">{result.ytm}%</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Coupon Payment</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.couponPayment}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Capital Gain/Period</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.capitalGainPerPeriod}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Price</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.averagePrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Estimates the total return if you hold a bond until maturity."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A bond bought for $950 with a $1,000 face value and 5% coupon yields 5.45%.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows the annualized return you can expect to earn if you hold the bond to maturity, helping you compare bonds and make more informed investment choices.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}