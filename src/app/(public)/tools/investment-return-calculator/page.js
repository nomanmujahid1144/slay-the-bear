'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function InvestmentReturnCalculator() {
    // State for inputs
    const [initialInvestment, setInitialInvestment] = useState('');
    const [annualReturnRate, setAnnualReturnRate] = useState('');
    const [investmentYears, setInvestmentYears] = useState('');

    // State for the result
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.investmentReturn({
                initialInvestment: parseFloat(initialInvestment),
                annualReturnRate: parseFloat(annualReturnRate),
                investmentYears: parseInt(investmentYears),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setInitialInvestment('');
        setAnnualReturnRate('');
        setInvestmentYears('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Investment Return Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Initial Investment:"
                                                placeholder="Enter Initial Investment"
                                                required={true}
                                                id="initial-investment"
                                                type="number"
                                                step="0.01"
                                                value={initialInvestment}
                                                onChange={(e) => setInitialInvestment(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percentage"
                                                label="Annual Return Rate (%):"
                                                placeholder="Enter Annual Return Rate"
                                                required={true}
                                                id="annual-return-rate"
                                                type="number"
                                                step="0.01"
                                                value={annualReturnRate}
                                                onChange={(e) => setAnnualReturnRate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar"
                                                label="Investment Period (Years):"
                                                placeholder="Enter Investment Period"
                                                required={true}
                                                id="investment-years"
                                                type="number"
                                                value={investmentYears}
                                                onChange={(e) => setInvestmentYears(e.target.value)}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Initial Investment</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.initialInvestment}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Return</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.totalReturn}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Return Percentage</p>
                                                    <p className="text-lg font-semibold text-green-600">{result.breakdown.returnPercentage}%</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Investment Period</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.investmentPeriod} years</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title={'Summary'}
                                details={'Projects potential growth on an investment over time.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'Investing $10,000 at 8% for 10 years results in $21,589.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The results illustrate how your initial investment will grow over time based on the given return rate, showing the effect of compounding interest on your future wealth.'}
                            />
                        </div>
                    </div>

                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}