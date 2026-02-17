'use client'

import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function NetWorthCalculator() {

    const [assets, setAssets] = useState('');
    const [liabilities, setLiabilities] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await calculatorService.netWorth({
                assets: parseFloat(assets),
                liabilities: parseFloat(liabilities),
            });

            setResult(data.data);
        } catch (error) {
            // Error handled by errorHandler
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setAssets('');
        setLiabilities('');
        setResult(null);
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Net Worth Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Total Assets:"
                                                placeholder="Enter Total Assets"
                                                required={true}
                                                id="assets"
                                                type="number"
                                                step="0.01"
                                                value={assets}
                                                onChange={(e) => setAssets(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Total Liabilities:"
                                                placeholder="Enter Total Liabilities"
                                                required={true}
                                                id="liabilities"
                                                type="number"
                                                step="0.01"
                                                value={liabilities}
                                                onChange={(e) => setLiabilities(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="button" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" disabled={loading} className="btn btn-two">
                                            {loading ? 'Calculating...' : 'Calculate Net Worth'}
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
                                            <p className="text-lg">{result.status}</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Assets</p>
                                                    <p className="text-lg font-semibold text-green-600">${result.breakdown.totalAssets}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Liabilities</p>
                                                    <p className="text-lg font-semibold text-red-600">${result.breakdown.totalLiabilities}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <ToolDescription
                                title={'Summary'}
                                details={'Calculate your net worth by subtracting liabilities from assets.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'With $100,000 in assets and $50,000 in liabilities, your net worth is $50,000.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows a snapshot of your financial health, highlighting areas to improve, such as paying down debt or increasing assets, to boost your net worth over time.'}
                            />
                        </div>
                    </div>
                    
                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    );
}