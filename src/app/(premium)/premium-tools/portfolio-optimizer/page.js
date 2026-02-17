'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ToolDescription } from "@/app/(public)/tools/tool-description/ToolDescription";
import axios from "axios";
import { mean, multiply, inv } from "mathjs";
import Image from "next/image";
import slideBarImage from '../../../../../public/assets/img/images/sidebar_img06.jpg';
import { calculatorService } from "@/services/calculator.service";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function PortfolioOptimizerCalculator() {

    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSymbols, setSelectedSymbols] = useState([]); // Store added symbols
    const [searchKeyword, setSearchKeyword] = useState(""); // For input field

    const [targetReturn, setTargetReturn] = useState(0.05);
    const [riskFreeRate, setRiskFreeRate] = useState(0.0100);

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    // For Risk Free Rate
    const handleIncrease = () => {
        setRiskFreeRate((prevRate) => {
            const newRate = Math.min(prevRate + 0.0001, 0.1500); // Increment by 0.0001, max 15%
            return parseFloat(newRate.toFixed(4));
        });
    };

    const handleDecrease = () => {
        setRiskFreeRate((prevRate) => {
            const newRate = Math.max(prevRate - 0.0001, 0.0100); // Decrement by 0.0001, min 1%
            return parseFloat(newRate.toFixed(4));
        });
    };

    const handleInputChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0.0100 && value <= 0.1500) {
            setRiskFreeRate(parseFloat(value.toFixed(4))); // Ensure 4 decimals
        }
    };



    // For Target Return Field
    const handleSliderChange = (event) => {
        const value = (event.target.value / 100).toFixed(2); // Convert to decimal and fix to 2 decimal places
        setTargetReturn(value);
    };

    // For Symbol Search
    const handleSearchKeyword = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);

        // Fetch suggestions if input has more than 1 character
        if (keyword.length > 1) {
            const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.alphaVantageStockApi}`;

            axios
                .get(url, { headers: { "User-Agent": "axios" } })
                .then((response) => {
                    if (response.status === 200) {
                        const data = response.data["bestMatches"];
                        const symbols = data.map((item) => ({
                            symbol: item["1. symbol"],
                            name: item["2. name"],
                        }));
                        setSuggestions(symbols);
                    } else {
                        setSuggestions([]);
                    }
                })
                .catch(() => {
                    setSuggestions([]);
                });
        } else {
            setSuggestions([]);
        }
    };

    // For Adding Symbols to Array
    const handleAddSymbol = (symbolObj) => {
        if (!selectedSymbols.some((item) => item.symbol === symbolObj.symbol)) {
            setSelectedSymbols((prev) => [...prev, symbolObj]);
        }
        setSearchKeyword(""); // Clear input field
        setSuggestions([]); // Clear suggestions
    };

    const handleRemoveSymbol = (symbol) => {
        setSelectedSymbols((prev) => prev.filter((item) => item.symbol !== symbol));
    };

    const handleReset = () => {
        setInvestmentAmount(0);
        setSuggestions([]);
        setSelectedSymbols([]);
        setSearchKeyword("");
        setTargetReturn(0.05);
        setRiskFreeRate(0.0100);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setResults(null);

        if (selectedSymbols.length < 2) {
            setError('Please select at least 2 symbols');
            setLoading(false);
            return;
        }

        try {
            const { data } = await calculatorService.portfolioOptimizer({
                investmentAmount: parseFloat(investmentAmount),
                riskFreeRate: parseFloat(riskFreeRate),
                targetReturn: parseFloat(targetReturn),
                symbols: selectedSymbols
            });

            setResults(data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Optimization failed');
        } finally {
            setLoading(false);
        }
    };


    // Function to calculate covariance matrix
    const calculateCovarianceMatrix = (returns) => {
        const numAssets = returns.length;
        const covMatrix = Array(numAssets)
            .fill(0)
            .map(() => Array(numAssets).fill(0));

        for (let i = 0; i < numAssets; i++) {
            for (let j = 0; j < numAssets; j++) {
                const meanI = mean(returns[i]);
                const meanJ = mean(returns[j]);
                covMatrix[i][j] = returns[i]
                    .map((ret, index) => (ret - meanI) * (returns[j][index] - meanJ))
                    .reduce((sum, value) => sum + value, 0) / (returns[i].length - 1);
            }
        }

        return covMatrix;
    };

    const calculateOptimalWeights = (avgReturns, invCovMatrix, riskFreeRate, targetReturn, ones) => {
        const excessReturns = avgReturns.map((r) => r - riskFreeRate);
        const numerator = multiply(invCovMatrix, excessReturns);
        const denominator = multiply(ones, numerator);
        const weights = numerator.map((w) => w / denominator);
        return weights;
    };

    // Render Results
    const ResultsTable = ({ results }) => {
        if (!results) return null;

        return (
            <div>
                <h2>Total Investment: {results.totalInvestment}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Weight (%)</th>
                            <th>Amount ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.resultTable.map((row, index) => (
                            <tr key={index}>
                                <td>{row.symbol}</td>
                                <td>{row.weight}</td>
                                <td>{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };



    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Portfolio Optimizer"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-dollar-sign"
                                                    label="Investment Amount ($)"
                                                    placeholder="Enter investment amount"
                                                    required={true}
                                                    id="investment-amount"
                                                    type="number"
                                                    value={investmentAmount}
                                                    onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 ">
                                            <label className="py-1 text-sm">Risk Free Rate</label>
                                            <div className="relative flex justify-center items-center gap-2">
                                                <FontAwesomeIcon onClick={handleDecrease} className="bg-white hover:!bg-primary hover:!border-white hover:!text-white border border-primary rounded-full p-1 -ml-1 cursor-pointer" size="xs" icon="fa-solid fa-minus" />
                                                <div className="form-grp mb-0 pb-0 w-full">
                                                    <input
                                                        type="number"
                                                        step="0.001"
                                                        value={riskFreeRate}
                                                        onChange={handleInputChange}
                                                        min="0.0100"
                                                        max="0.1500"
                                                    />
                                                </div>
                                                <FontAwesomeIcon onClick={handleIncrease} className=" bg-white hover:!bg-primary hover:!border-white hover:!text-white border border-primary rounded-full p-1 -mr-1 cursor-pointer" size="xs" icon="fa-solid fa-plus" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 ">
                                            <label className="py-1 text-sm">Target Return</label>
                                            <div className="flex justify-center items-center gap-3">
                                                <input
                                                    type="range"
                                                    min={5}
                                                    max={30}
                                                    value={targetReturn * 100}
                                                    onChange={handleSliderChange}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                                <p className="mb-0">{targetReturn}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="flex flex-col">
                                                <label className="py-1 text-sm">Symbol Search</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={searchKeyword}
                                                        onChange={handleSearchKeyword}
                                                        placeholder="Enter Symbol"
                                                        className="form-grp border p-2 rounded-md w-full"
                                                    />
                                                    {suggestions.length > 0 && (
                                                        <ul className="absolute bg-white z-10 rounded-lg p-3 shadow-md w-full">
                                                            {suggestions.map((suggestion, index) => (
                                                                <li
                                                                    key={index}
                                                                    onClick={() => handleAddSymbol(suggestion)}
                                                                    className="cursor-pointer py-1 hover:bg-gray-100"
                                                                >
                                                                    <strong>{suggestion.symbol}</strong>: {suggestion.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                                <div className="mt-4">
                                                    <h3 className="font-semibold mb-2">Selected Symbols:</h3>
                                                    {selectedSymbols.length > 0 ? (
                                                        <ul>
                                                            {selectedSymbols.map((symbol, index) => (
                                                                <li key={index} className="flex items-center justify-between py-1">
                                                                    <span>
                                                                        <strong>{symbol.symbol}</strong> {symbol.name && `: ${symbol.name}`}
                                                                    </span>
                                                                    <button
                                                                        className="text-red-500 hover:text-red-700"
                                                                        onClick={() => handleRemoveSymbol(symbol.symbol)}
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No symbols added yet.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Calculate
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-10">
                                    {loading && <LoaderCircleIcon />}

                                    {error && (
                                        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                                            <p className="text-red-700 dark:text-red-200">{error}</p>
                                        </div>
                                    )}

                                    {results && !loading && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
                                            {/* Portfolio Allocation */}
                                            <div>
                                                <h3 className="text-xl font-bold mb-4 text-primary">Portfolio Allocation</h3>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="bg-white dark:bg-gray-700">
                                                                <th className="p-3 border">Symbol</th>
                                                                <th className="p-3 border">Weight (%)</th>
                                                                <th className="p-3 border">Amount ($)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {results.portfolio.map((item, index) => (
                                                                <tr key={index} className="bg-white dark:bg-gray-700">
                                                                    <td className="p-3 border font-semibold">{item.symbol}</td>
                                                                    <td className="p-3 border">{item.weight}%</td>
                                                                    <td className="p-3 border text-green-600">${item.allocation.toLocaleString()}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Portfolio Metrics */}
                                            <div>
                                                <h3 className="text-xl font-bold mb-4 text-primary">Portfolio Metrics</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Expected Return</p>
                                                        <p className="text-lg font-semibold text-green-600">{results.metrics.expectedReturn}%</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Volatility</p>
                                                        <p className="text-lg font-semibold">{results.metrics.volatility}%</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Sharpe Ratio</p>
                                                        <p className="text-lg font-semibold text-blue-600">{results.metrics.sharpeRatio}</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Value at Risk (95%)</p>
                                                        <p className="text-lg font-semibold text-orange-600">{results.metrics.valueAtRisk}%</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Potential Loss</p>
                                                        <p className="text-lg font-semibold text-red-600">${results.metrics.potentialLoss.toLocaleString()}</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Investment</p>
                                                        <p className="text-lg font-semibold">${results.inputs.investmentAmount.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={'Breaks down each loan payment over time, showing how much goes to interest vs. principal.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A $50,000 loan at 4% for 5 years shows an amortization schedule.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The results provide a detailed payment schedule, illustrating how early payments are mostly interest, with a gradual shift toward paying off the loan balance (principal) as the loan matures.'}
                            />
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-8">
                        <div className="sidebar-wrap-three">
                            <div className="!h-[36rem]" id="tradingview-widget-market-stocks-overview">
                                <div className="tradingview-widget-market-stocks-overview"></div>
                            </div>
                            <hr className="my-3" />
                            <div className="sidebar-widget sidebar-widget-two">
                                <div className="sidebar-img">
                                    <a href="#">
                                        <Image
                                            src={slideBarImage}
                                            alt="no image found"
                                            className="w-full h-auto"
                                            unoptimized
                                        />
                                    </a>
                                </div>
                            </div>
                            <hr className="my-3" />
                            <div className="!h-[34rem]" id="tradingview-widget-market-stocks-news">
                                <div className="tradingview-widget-market-stocks-news"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}