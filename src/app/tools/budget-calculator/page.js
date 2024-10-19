'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import InputField from "@/app/components/fields/Input";
import SelectionBox from "@/app/components/fields/Select";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Finance } from "financejs";
import { useEffect, useState } from "react";


export default function BudgetCalculator() {

    const { isDarkMode } = useDarkMode();
    
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [remaining, setRemaining] = useState(null);

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


    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setNewExpense((prev) => ({ ...prev, [name]: value }));
    };

    const addExpense = (e) => {
        e.preventDefault();
        // Check if category and amount are valid
        if (newExpense.category && !isNaN(newExpense.amount) && newExpense.amount > 0) {
            setExpenses((prev) => [...prev, newExpense]);
            setTotalExpenses((prev) => prev + parseFloat(newExpense.amount));
            setNewExpense({ category: '', amount: '' }); // Reset newExpense state
        } else {
            alert('Please enter a valid category and amount.');
        }
    };

    const calculateRemaining = () => {
        if (!isNaN(income) && income > 0) {
            setRemaining(income - totalExpenses);
        } else {
            alert('Please enter a valid income.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateRemaining();
    };

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Compound Interest Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                            <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Monthly Income ($):"
                                                placeholder="Enter Your Income"
                                                required={true}
                                                id="income"
                                                type="number"
                                                value={income}
                                                onChange={(e) => setIncome(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-tag"
                                                label="Expense Category:"
                                                placeholder="Enter Expense Category"
                                                required={true}
                                                id="expense-category"
                                                type="text"
                                                name="category"
                                                value={newExpense.category}
                                                onChange={handleExpenseChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Expense Amount ($):"
                                                placeholder="Enter Expense Amount"
                                                required={true}
                                                id="expense-amount"
                                                type="number"
                                                name="amount"
                                                value={newExpense.amount}
                                                onChange={handleExpenseChange}
                                            />
                                        </div>
                                        <div className="flex justify-center pt-4">
                                            <button onClick={addExpense} className="btn btn-two">
                                                Add Expense
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <h3>Current Expenses:</h3>
                                        <ul>
                                            {expenses.map((expense, index) => (
                                                <li key={index}>
                                                    {expense.category}: ${expense.amount}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex justify-center pt-4">
                                        <button type="submit" className="btn btn-two">
                                            Calculate Remaining Budget
                                        </button>
                                    </div>
                                </form>
                                <div className=" pt-10">
                                    {/* Display the result */}
                                    {remaining !== null && (
                                        <div>
                                            <h3>Remaining Budget: ${remaining.toFixed(2)}</h3>
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