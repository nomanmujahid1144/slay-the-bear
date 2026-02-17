'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function BreakEvenCalculator() {

    const [fixedCosts, setFixedCosts] = useState('');
    const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
    const [sellingPricePerUnit, setSellingPricePerUnit] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.breakEven({
                fixedCosts: parseFloat(fixedCosts),
                variableCostPerUnit: parseFloat(variableCostPerUnit),
                sellingPricePerUnit: parseFloat(sellingPricePerUnit),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFixedCosts('');
        setVariableCostPerUnit('');
        setSellingPricePerUnit('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Break-Even Analysis Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Fixed Costs:"
                                                placeholder="Enter Fixed Costs"
                                                required={true}
                                                id="fixed-costs"
                                                type="number"
                                                step="0.01"
                                                value={fixedCosts}
                                                onChange={(e) => setFixedCosts(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Variable Cost Per Unit:"
                                                placeholder="Enter Variable Cost"
                                                required={true}
                                                id="variable-cost"
                                                type="number"
                                                step="0.01"
                                                value={variableCostPerUnit}
                                                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Selling Price Per Unit:"
                                                placeholder="Enter Selling Price"
                                                required={true}
                                                id="selling-price"
                                                type="number"
                                                step="0.01"
                                                value={sellingPricePerUnit}
                                                onChange={(e) => setSellingPricePerUnit(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Break-Even'}
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
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Break-Even Units</p>
                                                    <p className="text-lg font-semibold text-primary">{result.breakEvenUnits}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Contribution Margin</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.contributionMarginPerUnit}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Break-Even Revenue</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.breakEvenRevenue}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Costs</p>
                                                    <p className="text-lg font-semibold">${result.breakdown.totalCosts}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={"Determines how many units you need to sell to cover costs."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'Selling 667 units at $20 covers $10,000 in fixed costs.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The results show the point at which your business begins to make a profit, helping you set appropriate sales goals and pricing strategies to ensure profitability.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}