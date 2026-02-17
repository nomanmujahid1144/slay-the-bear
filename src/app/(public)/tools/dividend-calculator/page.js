'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function DividendCalculator() {

    const [numShares, setNumShares] = useState('');
    const [annualDividend, setAnnualDividend] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.dividend({
                numShares: parseFloat(numShares),
                annualDividend: parseFloat(annualDividend),
                timePeriod: parseFloat(timePeriod),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setNumShares('');
        setAnnualDividend('');
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
                                textHeading="Dividend Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-share-alt"
                                                label="Number of Shares Owned:"
                                                placeholder="Enter Number of Shares"
                                                required={true}
                                                id="num-shares"
                                                type="number"
                                                value={numShares}
                                                onChange={(e) => setNumShares(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Annual Dividend per Share ($):"
                                                placeholder="Enter Annual Dividend per Share"
                                                required={true}
                                                id="annual-dividend"
                                                type="number"
                                                step="0.01"
                                                value={annualDividend}
                                                onChange={(e) => setAnnualDividend(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar-alt"
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
                                            {loading ? 'Calculating...' : 'Calculate Dividend Income'}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Number of Shares</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.numberOfShares}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Annual Dividend/Share</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.annualDividendPerShare}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Annual Income</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.annualIncome}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Income ({result.breakdown.timePeriodYears} years)</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.totalIncome}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={'Estimates income from dividend-paying stocks.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'Owning 100 shares with a $3 dividend generates $300 annually.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows how much income you can expect from dividends, helping you gauge the cash flow your investments generate and its role in your overall financial plan.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}