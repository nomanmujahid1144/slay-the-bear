'use client'

import InputField from "@/app/components/fields/Input";
import SelectionBox from "@/app/components/fields/Select";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function CDCalculator() {

    const [principal, setPrincipal] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [compoundingFrequency, setCompoundingFrequency] = useState('annually');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.cd({
                principal: parseFloat(principal),
                annualInterestRate: parseFloat(annualInterestRate),
                timePeriod: parseFloat(timePeriod),
                compoundingFrequency: compoundingFrequency,
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
        setTimePeriod('');
        setCompoundingFrequency('annually');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="CD Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Principal Amount ($):"
                                                placeholder="Enter Initial Deposit"
                                                required={true}
                                                id="principal"
                                                type="number"
                                                step="0.01"
                                                value={principal}
                                                onChange={(e) => setPrincipal(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percentage"
                                                label="Annual Interest Rate (%):"
                                                placeholder="Enter Annual Interest Rate"
                                                required={true}
                                                id="annual-interest-rate"
                                                type="number"
                                                step="0.01"
                                                value={annualInterestRate}
                                                onChange={(e) => setAnnualInterestRate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar-alt"
                                                label="Time Period (Years):"
                                                placeholder="Enter Time Period in Years"
                                                required={true}
                                                id="time-period"
                                                type="number"
                                                step="0.01"
                                                value={timePeriod}
                                                onChange={(e) => setTimePeriod(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <SelectionBox
                                                label="Compounding Frequency:"
                                                required={true}
                                                id="compounding-frequency"
                                                value={compoundingFrequency}
                                                onChange={(e) => setCompoundingFrequency(e.target.value)}
                                                options={[
                                                    { label: "Annually", value: 'annually' },
                                                    { label: "Semiannually", value: 'semiannually' },
                                                    { label: "Quarterly", value: 'quarterly' },
                                                    { label: "Monthly", value: 'monthly' },
                                                    { label: "Daily", value: 'daily' },
                                                ]}
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
                                                {result.message}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Effective Rate</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.effectiveRate}%</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Compounding Periods</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.totalCompoundingPeriods}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={'Estimates the future value of a Certificate of Deposit.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A $5,000 CD at 3% for 3 years grows to $5,463.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows how much your initial deposit will grow over time, factoring in the interest rate and compounding frequency, helping you choose the best CD to meet your savings goals.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}