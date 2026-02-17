// src/app/(public)/tools/compound-interest-calculator/page.js - FIX

'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { Suspense, useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { calculatorService } from "@/services/calculator.service";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";

export default function CompoundInterestCalculator() {

    // State for inputs
    const [principal, setPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [compoundingFrequency, setCompoundingFrequency] = useState('');
    const [timePeriod, setTimePeriod] = useState('');

    // State for the result
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.compoundInterest({
                principal: parseFloat(principal),
                interestRate: parseFloat(interestRate),
                compoundingFrequency: parseInt(compoundingFrequency),
                timePeriod: parseInt(timePeriod),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setPrincipal('');
        setInterestRate('');
        setCompoundingFrequency('');
        setTimePeriod('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Compound Interest Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Principal Amount:"
                                                placeholder="Enter the Principal Amount"
                                                required={true}
                                                id="principal-amount"
                                                type="number"
                                                step="0.01"
                                                value={principal}
                                                onChange={(e) => setPrincipal(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percent"
                                                label="Interest Rate (%):"
                                                placeholder="Enter Interest Rate"
                                                required={true}
                                                id="interest-rate"
                                                type="number"
                                                step="0.01"
                                                value={interestRate}
                                                onChange={(e) => setInterestRate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-clock"
                                                label="Compounding Frequency:"
                                                placeholder="e.g., 12 for monthly, 4 for quarterly"
                                                required={true}
                                                id="compounding-frequency"
                                                type="number"
                                                value={compoundingFrequency}
                                                onChange={(e) => setCompoundingFrequency(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar"
                                                label="Time Period (Years):"
                                                placeholder="Enter Time Period in Years"
                                                required={true}
                                                id="time-period"
                                                type="number"
                                                value={timePeriod}
                                                onChange={(e) => setTimePeriod(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Return'}
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-10">
                                    {loading && <LoaderCircleIcon />}

                                    {result && !loading && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <h3 className="text-2xl font-bold text-primary">
                                                Future Value: ${result.futureValue}
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Principal Amount</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.principalAmount}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest Earned</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.totalInterestEarned}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Effective Annual Rate</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.effectiveAnnualRate}%</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Periods</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.totalCompoundingPeriods}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title={'Summary'}
                                details={"Shows how savings grow over time due to compounding interest."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A $1,000 investment at 5% for 5 years grows to $1,276.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The results demonstrate how your money grows faster due to compounding, where interest is earned on both the principal and previous interest, significantly increasing your total savings over time.'}
                            />
                        </div>
                    </div>
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}