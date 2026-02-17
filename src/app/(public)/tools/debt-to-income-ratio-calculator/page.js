'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function DebtToIncomeCalculator() {

    const [debtPayments, setDebtPayments] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.debtToIncome({
                debtPayments: parseFloat(debtPayments),
                monthlyIncome: parseFloat(monthlyIncome),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setDebtPayments('');
        setMonthlyIncome('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Debt-to-Income Ratio Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Monthly Debt Payments:"
                                                placeholder="Enter Monthly Debt"
                                                required={true}
                                                id="debt-payments"
                                                type="number"
                                                step="0.01"
                                                value={debtPayments}
                                                onChange={(e) => setDebtPayments(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Gross Monthly Income:"
                                                placeholder="Enter Monthly Income"
                                                required={true}
                                                id="monthly-income"
                                                type="number"
                                                step="0.01"
                                                value={monthlyIncome}
                                                onChange={(e) => setMonthlyIncome(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Ratio'}
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
                                            <p className="text-lg">{result.assessment}</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Debt</p>
                                                    <p className="text-lg font-semibold text-red-600">${result.breakdown.totalMonthlyDebt}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Income</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.grossMonthlyIncome}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Income</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.remainingIncome}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">DTI Ratio</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.debtPercentage}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Assesses debt level relative to income, commonly used in loan approvals."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'If your debt is $1,000 and income is $5,000, your ratio is 20%.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result gives you a percentage that helps assess whether your debt load is manageable. Lenders use this ratio to determine your ability to take on more debt, so a lower percentage is better.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}