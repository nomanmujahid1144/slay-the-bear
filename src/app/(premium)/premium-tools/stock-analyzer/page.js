'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";
import { calculatorService } from "@/services/calculator.service";
import { CalculatorSidebar } from "@/app/components/calculator/CalculatorSidebar";
import { LoaderCircleIcon } from "@/app/components/Loader/LoadingCircle";

export default function PortfolioOptimizerCalculator() {

    const [suggestions, setSuggestions] = useState([]);
    const [selectedSymbols, setSelectedSymbols] = useState([]); // Store added symbols
    const [searchKeyword, setSearchKeyword] = useState(""); // For input field
    const [loanTermType, setLoanTermType] = useState('Short Term'); // 0 for years, 1 for 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState({
        companyName: '',
        symbol: '',
        intrinsicStockValue: '',
        currentStockPrice: '',
        stockTrend: '',
        valuationStatus: '',
        explanation: '',
    });


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
        // if (!selectedSymbols.some((item) => item.symbol === symbolObj.symbol)) {
        //     setSelectedSymbols((prev) => [...prev, symbolObj]);
        // }
        setSelectedSymbols([symbolObj]);
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setResult({
            companyName: '',
            symbol: '',
            intrinsicStockValue: '',
            currentStockPrice: '',
            stockTrend: '',
            valuationStatus: '',
            explanation: '',
        });

        if (selectedSymbols.length === 0) {
            setError('Please select a stock symbol');
            setLoading(false);
            return;
        }

        try {
            const { data } = await calculatorService.stockAnalyzer({
                symbol: selectedSymbols[0].symbol,
                term: loanTermType
            });

            setResult({
                companyName: data.companyName,
                symbol: data.data.symbol,
                intrinsicStockValue: data.data.intrinsicStockValue,
                currentStockPrice: data.data.currentStockPrice,
                stockTrend: data.data.stockTrend,
                valuationStatus: data.data.valuationStatus,
                explanation: data.data.explanation,
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Analysis failed');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSuggestions([]);
        setSelectedSymbols([]);
        setSearchKeyword("");
        setLoanTermType('Short Term');
        setResult({
            companyName: '',
            symbol: '',
            intrinsicStockValue: '',
            currentStockPrice: '',
            stockTrend: '',
            valuationStatus: '',
            explanation: '',
        })
    }



    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Stock Analyzer"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
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
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-grp">
                                                <label className="py-1 text-sm">Loan Term Type:</label>
                                                <select
                                                    className="form-select"
                                                    value={loanTermType}
                                                    onChange={(e) => setLoanTermType(e.target.value)}
                                                >
                                                    <option value={'Short Term'}>Short Term</option>
                                                    <option value={'Long Term'}>Long Term</option>
                                                </select>
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

                                    {console.log(result, 'result')}

                                    {result && !loading && (
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                                            <div className="text-center mb-4">
                                                <h3 className={`text-2xl font-bold ${result.valuationStatus === 'Strong Buy' || result.valuationStatus === 'Buy'
                                                    ? 'text-green-600'
                                                    : result.valuationStatus === 'Sell' || result.valuationStatus === 'Strong Sell'
                                                        ? 'text-red-600'
                                                        : 'text-yellow-600'
                                                    }`}>
                                                    {result.valuationStatus}
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Company Name</p>
                                                    <p className="text-lg font-semibold">{result.companyName} ({result.symbol})</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Intrinsic Value</p>
                                                    <p className="text-lg font-semibold text-blue-600">{result.intrinsicStockValue}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
                                                    <p className="text-lg font-semibold">{result.currentStockPrice}</p>
                                                </div>
                                                <div className="p-4 bg-white dark:bg-gray-700 rounded">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Stock Trend</p>
                                                    <p className="text-lg font-semibold">{result.stockTrend}</p>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-white dark:bg-gray-700 rounded mt-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Analysis</p>
                                                <p className="text-base">{result.explanation}</p>
                                            </div>

                                            <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-4">
                                                Disclaimer: This analysis is for educational purposes only and does not constitute financial advice.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {/* <div className="relative overflow-x-auto pt-10">
                                    <div className="text-center">
                                        <p className="!font-bold title text-green-500">{result.valuationStatus}</p>
                                    </div>
                                    {result && result.companyName && result.intrinsicStockValue && result.currentStockPrice && result.stockTrend && result.explanation && (
                                        <div>
                                            <p className="mb-0"><span className="!font-bold">Company Name:</span> {result.companyName} ({result.symbol})</p>
                                            <p className="mb-0"><span className="!font-bold">Intrinsic Stock Value:</span> {result.intrinsicStockValue}</p>
                                            <p className="mb-0"><span className="!font-bold">Current Stock Price:</span> {result.currentStockPrice}</p>
                                            <p className="mb-0"><span className="!font-bold">Stock Trend:</span> {result.stockTrend}</p>
                                            <p className="mb-0"><span className="!font-bold">Explanation:</span> {result.explanation}</p>
                                            <h2 className="pt-10">Disclaimer: This analysis is for educational purposes only and does not constitute financial advice. Please consult a financial professional before making any investment decisions.</h2>
                                        </div>
                                    )}
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <CalculatorSidebar />
                </div>
            </div>
        </section>
    )
}