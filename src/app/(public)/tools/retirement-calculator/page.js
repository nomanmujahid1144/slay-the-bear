'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function RetirementCalculator() {

    // State for inputs
    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [annualContributions, setAnnualContributions] = useState('');
    const [expectedRateOfReturn, setExpectedRateOfReturn] = useState('');

    // State for the result
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.retirement({
                currentAge: parseInt(currentAge),
                retirementAge: parseInt(retirementAge),
                currentSavings: parseFloat(currentSavings),
                annualContributions: parseFloat(annualContributions),
                expectedRateOfReturn: parseFloat(expectedRateOfReturn),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCurrentAge('');
        setRetirementAge('');
        setCurrentSavings('');
        setAnnualContributions('');
        setExpectedRateOfReturn('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Retirement Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-user"
                                                label="Current Age:"
                                                placeholder="Enter your current age"
                                                required={true}
                                                id="current-age"
                                                type="number"
                                                value={currentAge}
                                                onChange={(e) => setCurrentAge(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar"
                                                label="Retirement Age:"
                                                placeholder="Enter retirement age"
                                                required={true}
                                                id="retirement-age"
                                                type="number"
                                                value={retirementAge}
                                                onChange={(e) => setRetirementAge(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Current Savings:"
                                                placeholder="Enter current savings"
                                                required={true}
                                                id="current-savings"
                                                type="number"
                                                step="0.01"
                                                value={currentSavings}
                                                onChange={(e) => setCurrentSavings(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Annual Contributions:"
                                                placeholder="Enter annual contributions"
                                                required={true}
                                                id="annual-contributions"
                                                type="number"
                                                step="0.01"
                                                value={annualContributions}
                                                onChange={(e) => setAnnualContributions(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percent"
                                                label="Expected Rate of Return (%):"
                                                placeholder="Enter expected rate of return"
                                                required={true}
                                                id="expected-return"
                                                type="number"
                                                step="0.01"
                                                value={expectedRateOfReturn}
                                                onChange={(e) => setExpectedRateOfReturn(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Retirement Savings'}
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-10">
                                    {loading && <LoaderCircleIcon />}
                                    
                                    {result && !loading && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <h3 className="text-2xl font-bold text-primary">
                                                Estimated Savings at Retirement: ${result.futureValue}
                                            </h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Years to Retirement</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.yearsToRetirement} years</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Growth from Current Savings</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.futureValueOfCurrentSavings}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Growth from Contributions</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.futureValueOfContributions}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Future Value</p>
                                                    <p className="text-lg font-semibold text-primary">${result.breakdown.totalFutureValue}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Estimates how much you'll need for retirement based on current savings, contributions, and expected returns."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'Saving $500 per month with a 6% return could give you $500,000 by retirement.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows your total savings at retirement age. Compare this to your expected expenses to see if you need to save more.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}