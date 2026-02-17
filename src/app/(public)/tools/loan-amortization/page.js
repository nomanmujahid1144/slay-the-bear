'use client'

import InputField from "@/app/components/fields/Input";
import SelectionBox from "@/app/components/fields/Select";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function LoanAmortizationCalculator() {
    // State for inputs
    const [principal, setPrincipal] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [extraPayment, setExtraPayment] = useState('0');
    const [loanTermType, setLoanTermType] = useState('years');

    // State for the result
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.loanAmortization({
                principal: parseFloat(principal),
                annualInterestRate: parseFloat(annualInterestRate),
                loanTerm: parseFloat(loanTerm),
                extraPayment: parseFloat(extraPayment),
                loanTermType: loanTermType,
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
        setAnnualInterestRate('');
        setLoanTerm('');
        setExtraPayment('0');
        setLoanTermType('years');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Loan Amortization Calculator"
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
                                                placeholder="Enter Loan Amount"
                                                required={true}
                                                id="principal"
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
                                                label="Annual Interest Rate (%):"
                                                placeholder="Enter Interest Rate"
                                                required={true}
                                                id="interest-rate"
                                                type="number"
                                                step="0.01"
                                                value={annualInterestRate}
                                                onChange={(e) => setAnnualInterestRate(e.target.value)}
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
                                                label="Term Type:"
                                                id="loan-term-type"
                                                value={loanTermType}
                                                onChange={(e) => setLoanTermType(e.target.value)}
                                                options={[
                                                    { value: 'years', label: 'Years' },
                                                    { value: 'months', label: 'Months' }
                                                ]}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Extra Monthly Payment (Optional):"
                                                placeholder="Enter Extra Payment"
                                                id="extra-payment"
                                                type="number"
                                                step="0.01"
                                                value={extraPayment}
                                                onChange={(e) => setExtraPayment(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Schedule'}
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-10">
                                    {loading && <LoaderCircleIcon />}
                                    
                                    {result && !loading && (
                                        <div className="space-y-6">
                                            {/* Summary */}
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                                <h3 className="text-2xl font-bold text-primary mb-4">
                                                    Loan Summary
                                                </h3>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</p>
                                                        <p className="text-lg font-semibold">${result.summary.totalMonthlyPayment}</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Payments</p>
                                                        <p className="text-lg font-semibold">{result.summary.totalPayments} months</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest</p>
                                                        <p className="text-lg font-semibold text-red-600">${result.summary.totalInterestPaid}</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount Paid</p>
                                                        <p className="text-lg font-semibold">${result.summary.totalAmountPaid}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Amortization Schedule */}
                                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 overflow-x-auto">
                                                <h3 className="text-xl font-bold mb-4">Amortization Schedule</h3>
                                                <div className="max-h-96 overflow-y-auto">
                                                    <table className="w-full text-sm">
                                                        <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                                                            <tr>
                                                                <th className="p-3 text-left">Month</th>
                                                                <th className="p-3 text-right">Principal</th>
                                                                <th className="p-3 text-right">Interest</th>
                                                                <th className="p-3 text-right">Balance</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {result.amortizationSchedule.map((row, index) => (
                                                                <tr 
                                                                    key={index} 
                                                                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                                                                >
                                                                    <td className="p-3">{row.month}</td>
                                                                    <td className="p-3 text-right">${row.principalPayment}</td>
                                                                    <td className="p-3 text-right">${row.interestPayment}</td>
                                                                    <td className="p-3 text-right font-semibold">${row.balance}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Get a detailed breakdown of loan payments, showing how much goes toward interest and principal over time."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A $50,000 loan at 5% for 10 years will have monthly payments split between principal and interest.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The amortization schedule shows exactly how each payment is divided between principal and interest, helping you understand the true cost of borrowing.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}