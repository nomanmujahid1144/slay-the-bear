'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import { ToolDescription } from "../../tools/tool-description/ToolDescription";
import axios from "axios";
import axiosInstance from "@/app/utils/axiosInstance";

export default function PortfolioOptimizerCalculator() {

    const { isDarkMode } = useDarkMode();
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSymbols, setSelectedSymbols] = useState([]); // Store added symbols
    const [searchKeyword, setSearchKeyword] = useState(""); // For input field
    const [loanTermType, setLoanTermType] = useState('Short Term'); // 0 for years, 1 for months
    const [result, setResult] = useState({
        companyName: '',
        symbol: '',
        intrinsicStockValue: '',
        currentStockPrice: '',
        stockTrend: '',
        valuationStatus: '',
        explanation: '',
    });

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
        // setSearchKeyword(""); // Clear input field
        setSuggestions([]); // Clear suggestions
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedSymbols.length > 0) {
            const payload = {
                symbol: selectedSymbols[0].symbol,
                term: loanTermType
            };

            try {
                const response = await axiosInstance.post('/api/calculator/stock-analyzer', payload);

                if (response.status === 200) {
                    console.log('API Response:', response.data);

                    setResult({
                        companyName: response.data.companyName,
                        symbol: response.data.symbol,
                        intrinsicStockValue: response.data.intrinsicStockValue,
                        currentStockPrice: response.data.currentStockPrice,
                        stockTrend: response.data.stockTrend,
                        valuationStatus: response.data.valuationStatus,
                        explanation: response.data.explanation,
                    });

                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Axios Error:', error.message);
            }
        }

    };

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
                                <div className="relative overflow-x-auto pt-10">
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
                                </div>
                            </div>
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
                                        <img src="../assets/img/images/sidebar_img06.jpg" alt="" />
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