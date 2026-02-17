// src/app/(public)/tools/mortgage-calculator/page.js - REPLACE

'use client'

import InputField from "@/app/components/fields/Input";
import SelectionBox from "@/app/components/fields/Select";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function MortgageCalculator() {

    // State for inputs
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [paymentType, setPaymentType] = useState('years');

    // State for the result
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.mortgage({
                loanAmount: parseFloat(loanAmount),
                interestRate: parseFloat(interestRate),
                loanTerm: parseFloat(loanTerm),
                paymentType: paymentType,
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setLoanAmount('');
        setInterestRate('');
        setLoanTerm('');
        setPaymentType('years');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Mortgage Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Loan Amount:"
                                                placeholder="Enter the Loan Amount"
                                                required={true}
                                                id="loan-amount"
                                                type="number"
                                                step="0.01"
                                                value={loanAmount}
                                                onChange={(e) => setLoanAmount(e.target.value)}
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
                                                fontAwsomeIcon="fa-calendar"
                                                label="Loan Term:"
                                                placeholder="Enter Loan Term"
                                                required={true}
                                                id="loan-term"
                                                type="number"
                                                value={loanTerm}
                                                onChange={(e) => setLoanTerm(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <SelectionBox
                                                label="Payment Type:"
                                                id="payment-type"
                                                value={paymentType}
                                                onChange={(e) => setPaymentType(e.target.value)}
                                                options={[
                                                    { value: 'years', label: 'Years' },
                                                    { value: 'months', label: 'Months' }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Payment'}
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-10">
                                    {loading && <LoaderCircleIcon />}
                                    
                                    {result && !loading && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <h3 className="text-2xl font-bold text-primary">
                                                Monthly Payment: ${result.monthlyPayment}
                                            </h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Loan Amount</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.loanAmount}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Payments</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.totalPayments} months</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount Paid</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.totalAmountPaid}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest</p>
                                                    <p className="text-lg font-semibold text-red-600">${result.breakdown.totalInterest}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Calculate monthly mortgage payments by inputting loan amount, interest rate, and loan term."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A $200,000 loan at 4% interest for 30 years results in a monthly payment of $954.83.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The calculator shows your monthly payment and breaks down the total cost over the life of the loan, including how much you will pay in interest.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}