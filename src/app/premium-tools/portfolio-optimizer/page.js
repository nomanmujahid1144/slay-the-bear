'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ToolDescription } from "../../tools/tool-description/ToolDescription";
import axios from "axios";
import { mean, multiply, inv } from "mathjs";
import axiosInstance from "@/app/utils/axiosInstance";
import Image from "next/image";
import slideBarImage from '../../../../public/assets/img/images/sidebar_img06.jpg';

export default function PortfolioOptimizerCalculator() {

    const { isDarkMode } = useDarkMode();
    const [investmentAmount, setInvestmentAmount] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSymbols, setSelectedSymbols] = useState([]); // Store added symbols
    const [searchKeyword, setSearchKeyword] = useState(""); // For input field

    const [targetReturn, setTargetReturn] = useState(0.05);
    const [riskFreeRate, setRiskFreeRate] = useState(0.0100);

    const [results, setResults] = useState(null);

    useEffect(() => {
        // Function to initialize a TradingView widget
        const initializeWidget = (containerId, config, callback) => {
            const widgetContainer = document.getElementById(containerId);

            if (widgetContainer) {
                // Clear the existing widget content
                widgetContainer.innerHTML = ''; // Clear the container to remove any duplicate widgets
            }

            // Initialize the TradingView widget
            return addTradingViewWidget(containerId, config, callback);
        };

        const cleanupMarketStocksNews = initializeWidget('tradingview-widget-market-stocks-news', {
            "colorTheme": "light",
            "dateRange": "ALL",
            "exchange": "US",
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": "100%",
            "isTransparent": true,
            "showSymbolLogo": false,
            "showFloatingTooltip": true,
            "plotLineColorGrowing": "rgb(41,191,240, 1)",
            "plotLineColorFalling": "rgb(15,96,139, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(19, 23, 34, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
        }, srcFile.getNews);

        const cleanupMarketStocksOverview = initializeWidget('tradingview-widget-market-stocks-overview', {
            "colorTheme": "light",
            "dateRange": "ALL",
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": "100%",
            "largeChartUrl": "",
            "isTransparent": true,
            "showSymbolLogo": false,
            "showFloatingTooltip": true,
            "plotLineColorGrowing": "rgb(41,191,240, 1)",
            "plotLineColorFalling": "rgb(15,96,139, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(19, 23, 34, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "tabs": [
                {
                    "title": "Forex",
                    "symbols": [
                        { "s": "FX:EURUSD", "d": "EUR to USD" },
                        { "s": "FX:GBPUSD", "d": "GBP to USD" },
                        { "s": "FX:USDJPY", "d": "USD to JPY" },
                        { "s": "FX:USDCHF", "d": "USD to CHF" },
                        { "s": "FX:AUDUSD", "d": "AUD to USD" },
                        { "s": "FX:USDCAD", "d": "USD to CAD" }
                    ],
                    "originalTitle": "Forex"
                },
                {
                    "title": "ETFs",
                    "symbols": [
                        { "s": "AMEX:SPY" },
                        { "s": "NASDAQ:QQQ" },
                        { "s": "AMEX:IWM" },
                        { "s": "NASDAQ:TLT" },
                        { "s": "AMEX:SOXL" },
                        { "s": "NASDAQ:TQQQ" }
                    ]
                },
                {
                    "title": "Mutual Funds",
                    "symbols": [
                        { "s": "AMEX:PHYS" },
                        { "s": "AMEX:PSLV" },
                        { "s": "OTC:LTCN" },
                        { "s": "NYSE:PTY" },
                        { "s": "OTC:SRUUF" },
                        { "s": "NYSE:DXYZ" }
                    ]
                }
            ],
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
        }, srcFile.getMarketOverview);

        // Cleanup function to remove all widgets before re-rendering
        return () => {
            cleanupMarketStocksNews(); // Clean up market stocks news widget
            cleanupMarketStocksOverview(); // Clean up market stocks overview widget
        };
    }, [isDarkMode]); // Re-run the effect when `isDarkMode` changes

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

    // const handleSubmit = async (e) => {
    //     try {
    //         e.preventDefault();
    //         // Fetch stock data for each symbol
    //         const stockData = await Promise.all(
    //             selectedSymbols.map(async (symbol) => {
    //                 console.log(symbol)
    //                 // const data = await alpha.data.monthly_adjusted(symbol?.symbol);
    //                 const response = await fetch(
    //                     `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol.symbol}&apikey=7WF63JCXA8P71C8D`
    //                 );
    //                 const data = await response.json();
    //         // const prices = data["Monthly Adjusted Time Series"];
    //                 const prices = Object.values(data["Monthly Adjusted Time Series"]).map(
    //                     (item) => parseFloat(item["5. adjusted close"])
    //                 );

    //                 console.log(prices, 'prices')
    //                 return prices.reverse(); // Chronological order
    //             })
    //         );

    //         // Calculate returns matrix
    //         const returns = stockData.map((prices) =>
    //             prices.map((price, i, arr) => (i > 0 ? (price - arr[i - 1]) / arr[i - 1] : 0))
    //         );

    //         const returnsMatrix = math.matrix(returns.map((row) => row.slice(1))); // Exclude first row for returns

    //         // Calculate portfolio weights using optimizer
    //         const initialWeights = Array(symbols.length).fill(1 / symbols.length);
    //         const constraints = [
    //             (weights) => math.sum(weights) - 1, // Sum of weights = 1
    //             (weights) => math.multiply(returnsMatrix.mean("column"), weights) - targetReturn, // Target return
    //         ];

    //         const result = optimizer.minimize({
    //             func: (weights) =>
    //                 Math.sqrt(
    //                     math.multiply(math.transpose(weights), math.multiply(returnsMatrix.cov(), weights))
    //                 ), // Minimize volatility
    //             bounds: symbols.map(() => [0, 1]), // Weight bounds
    //             constraints,
    //             initialPoint: initialWeights,
    //         });

    //         const weights = result.solution;

    //         // Calculate final allocation
    //         const allocation = weights.map((weight) => ({
    //             symbol: symbols[weights.indexOf(weight)],
    //             weight: (weight * 100).toFixed(4), // Convert to percentage
    //             amount: `$${(weight * investmentAmount).toFixed(2)}`, // Allocate amount
    //         }));

    //         // Set results
    //         setResults({
    //             investmentAmount,
    //             allocation,
    //         });
    //     } catch (error) {
    //         console.error("Error calculating portfolio:", error);
    //     }
    // };

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

        const payload = {
            investmentAmount: investmentAmount, // Example value
            riskFreeRate: riskFreeRate, // Example value
            targetReturn: targetReturn, // Example value
            symbols: selectedSymbols, // Example values
        };

        try {
            const response = await axiosInstance.post('/api/calculator/portfolio-optimizer', payload);

            console.log(response, 'response')

            if (response.status === 200) {
                console.log('API Response:', response.data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Axios Error:', error.message);
        }

    };


    // Function to fetch stock data from Alpha Vantage
    const fetchStockData = async () => {
        const stockData = {};
        for (const symbol of selectedSymbols) {
            try {
                const response = await fetch(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol.symbol}&apikey=7WF63JCXA8P71C8D`
                );
                const data = await response.json();
                const prices = data["Monthly Adjusted Time Series"];
                const timeSeries = Object.keys(prices).map((date) => ({
                    date,
                    price: parseFloat(prices[date]["5. adjusted close"]),
                }));
                stockData[symbol.symbol] = timeSeries.reverse(); // Ensure chronological order

            } catch (error) {
                console.error(`Failed to fetch data for ${symbol.symbol}:`, error);
            }
        }
        return stockData;
    };

    // Portfolio Optimization Function
    const calculatePortfolioOptimization = (pricesData, riskFreeRate, targetReturn) => {
        const symbols = Object.keys(pricesData);

        // Step 1: Calculate monthly returns for each stock
        const returns = symbols.map((symbol) => {
            const prices = pricesData[symbol].map((d) => d.price);
            console.log(`Prices for ${symbol}:`, prices); // Debug log
            const calculatedReturns = prices.slice(1).map((p, i) => {
                if (prices[i] === 0 || isNaN(prices[i]) || isNaN(p)) {
                    console.warn(`Invalid price data for ${symbol}:`, { previous: prices[i], current: p });
                    return null; // Mark invalid data as null
                }
                return (p - prices[i]) / prices[i];
            });
            console.log(`Returns for ${symbol}:`, calculatedReturns); // Debug log
            return calculatedReturns;
        });

        // Step 2: Clean returns (replace null values with 0 or handle them as needed)
        const cleanedReturns = returns.map((stockReturns) =>
            stockReturns.map((r) => (r === null ? 0 : r)) // Replace null values with 0
        );
        console.log("Cleaned Returns:", cleanedReturns); // Debug log

        // Step 3: Calculate average returns and covariance matrix
        const avgReturns = cleanedReturns.map((r) => mean(r));
        const covMatrix = calculateCovarianceMatrix(cleanedReturns);
        console.log("Covariance Matrix:", covMatrix); // Debug log

        // Step 4: Mean-variance optimization (Markowitz model)
        const ones = Array(symbols.length).fill(1);
        const invCovMatrix = inv(covMatrix);
        const weights = calculateOptimalWeights(avgReturns, invCovMatrix, riskFreeRate, targetReturn, ones);

        // Step 5: Allocate weights to investment amount
        const totalInvestment = investmentAmount;
        const resultTable = weights.map((weight, i) => {
            const amount = weight * totalInvestment;
            return {
                symbol: symbols[i],
                weight: `${(weight * 100).toFixed(4)}%`,
                amount: `$${amount.toFixed(2)}`,
            };
        });

        return {
            totalInvestment: `$${totalInvestment.toLocaleString()}`,
            resultTable,
        };
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

                                <div className="relative overflow-x-auto pt-10">
                                    <ResultsTable results={results} />
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