'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function SavingsGoalCalculator() {

    const [savingsGoal, setSavingsGoal] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [timeFrame, setTimeFrame] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.savingsGoal({
                savingsGoal: parseFloat(savingsGoal),
                currentSavings: parseFloat(currentSavings),
                timeFrame: parseFloat(timeFrame),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSavingsGoal('');
        setCurrentSavings('');
        setTimeFrame('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Savings Goal Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Savings Goal:"
                                                placeholder="Enter Savings Goal"
                                                required={true}
                                                id="savings-goal"
                                                type="number"
                                                step="0.01"
                                                value={savingsGoal}
                                                onChange={(e) => setSavingsGoal(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Current Savings:"
                                                placeholder="Enter Current Savings"
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
                                                fontAwsomeIcon="fa-calendar-alt"
                                                label="Time Frame (Years):"
                                                placeholder="Enter Time Frame"
                                                required={true}
                                                id="time-frame"
                                                type="number"
                                                step="0.01"
                                                value={timeFrame}
                                                onChange={(e) => setTimeFrame(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Required Savings'}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Savings Goal</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.savingsGoal}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Savings</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.currentSavings}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Goal</p>
                                                    <p className="text-lg font-semibold text-orange-600">${result.breakdown.remainingGoal}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Time Frame</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.timeFrameYears} years</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={'Helps determine how much you need to save regularly to reach a financial goal.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'To save $10,000 in 3 years, you need to save $277 monthly.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The calculator shows the amount you must save each month, helping you understand the discipline needed to reach your financial goal within your desired timeframe.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}