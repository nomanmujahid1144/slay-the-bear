'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function RuleOf72Calculator() {

    const [annualRate, setAnnualRate] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.ruleOf72({
                annualRate: parseFloat(annualRate),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setAnnualRate('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Rule of 72 Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <InputField
                                        isFontAwsome={true}
                                        fontAwsomeIcon="fa-percentage"
                                        label="Annual Interest Rate (%):"
                                        placeholder="Enter Annual Interest Rate"
                                        required={true}
                                        id="annual-rate"
                                        type="number"
                                        step="0.01"
                                        value={annualRate}
                                        onChange={(e) => setAnnualRate(e.target.value)}
                                    />
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Years to Double'}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Annual Rate</p>
                                                    <p className="text-lg font-semibold">{result.breakdown.annualRate}%</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Years to Double</p>
                                                    <p className="text-lg font-semibold text-green-600">{result.breakdown.yearsToDouble} years</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={'Estimates the time it takes for your investment to double.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'At 6% interest, your money doubles in 12 years.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The Rule of 72 provides a quick way to estimate how long it will take for your investment to double, helping you compare different investment rates to find the best option for growth.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}