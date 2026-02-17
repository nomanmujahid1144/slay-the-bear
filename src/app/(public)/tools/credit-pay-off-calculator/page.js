'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function CreditPayoffCalculator() {

    const [balance, setBalance] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.creditPayoff({
                balance: parseFloat(balance),
                interestRate: parseFloat(interestRate),
                monthlyPayment: parseFloat(monthlyPayment),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setBalance('');
        setInterestRate('');
        setMonthlyPayment('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Credit Card Payoff Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Current Balance:"
                                                placeholder="Enter Balance"
                                                required={true}
                                                id="balance"
                                                type="number"
                                                step="0.01"
                                                value={balance}
                                                onChange={(e) => setBalance(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percentage"
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
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Monthly Payment:"
                                                placeholder="Enter Monthly Payment"
                                                required={true}
                                                id="monthly-payment"
                                                type="number"
                                                step="0.01"
                                                value={monthlyPayment}
                                                onChange={(e) => setMonthlyPayment(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Payoff'}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Months to Payoff</p>
                                                    <p className="text-lg font-semibold">{result.monthsToPayoff}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest Paid</p>
                                                    <p className="text-lg font-semibold text-red-600">${result.breakdown.totalInterestPaid}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount Paid</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.totalAmountPaid}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Original Balance</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.originalBalance}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <ToolDescription
                                title={'Summary'}
                                details={"Estimates time and interest needed to pay off credit card debt based on your payments."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={' A $5,000 balance at 18% interest with $200 monthly payments will take around 32 months to pay off.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The results show how long it will take to pay off your debt and how much interest you’ll pay over time. It helps you develop a repayment strategy to minimize interest costs and pay down debt faster.'}
                            />
                        </div>
                    </div>

                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}