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


export default function LoanAmortizationCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();

    // State for inputs
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [extraPayment, setExtraPayment] = useState(0);
    const [loanTermType, setLoanTermType] = useState(0); // 0 for Years, 1 for Months
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);

    // State for the result
    const [monthlyPayment, setMonthlyPayment] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const principal = parseFloat(currentSavings); // Current savings as principal
        const rate = parseFloat(expectedRateOfReturn); // Expected annual rate of return
        const term = retirementAge - currentAge; // Total years until retirement
        const annualContribution = parseFloat(annualContributions); // Annual contributions

        // Future Value of Current Savings
        const futureValueOfSavings = principal * Math.pow(1 + (rate / 100), term);

        // Future Value of Annual Contributions
        const futureValueOfContributions = annualContribution * ((Math.pow(1 + (rate / 100), term) - 1) / (rate / 100));

        // Total future value
        const totalFutureValue = futureValueOfSavings + futureValueOfContributions;

        // Update the state with the calculated total future value
        setRetirementAmount(totalFutureValue.toFixed(2));
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
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-dollar-sign"
                                                    label="Loan Amount:"
                                                    placeholder="Enter loan amount"
                                                    required={true}
                                                    id="loan-amount"
                                                    type="number"
                                                    value={loanAmount}
                                                    onChange={(e) => setLoanAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-percentage"
                                                    label="Interest Rate (%):"
                                                    placeholder="Enter interest rate"
                                                    required={true}
                                                    id="interest-rate"
                                                    type="number"
                                                    step="0.01"
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-clock"
                                                    label="Loan Term (Years):"
                                                    placeholder="Enter loan term"
                                                    required={true}
                                                    id="loan-terms"
                                                    type="number"
                                                    value={loanTerm}
                                                    onChange={(e) => setLoanTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-dollar-sign"
                                                    label="Extra Monthly Payment:"
                                                    placeholder="Enter extra payment"
                                                    id="extra-payment"
                                                    type="number"
                                                    value={extraPayment}
                                                    onChange={(e) => setExtraPayment(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <label>Loan Term Type:</label>
                                                <select
                                                    className="form-select"
                                                    value={loanTermType}
                                                    onChange={(e) => setLoanTermType(Number(e.target.value))}
                                                >
                                                    <option value={0}>Years</option>
                                                    <option value={1}>Months</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center pt-4">
                                        <button type="submit" className="btn btn-two">
                                            Calculate
                                        </button>
                                    </div>
                                </form>
                                <div className="relative overflow-x-auto pt-10">
                                    {/* Display the result */}
                                    {amortizationSchedule.length > 0 && (
                                        <>
                                            <h3 className="pb-3">Amortization Schedule</h3>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-900">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">Month</th>
                                                        <th scope="col" className="px-6 py-3">Principal Payment</th>
                                                        <th scope="col" className="px-6 py-3">Interest Payment</th>
                                                        <th scope="col" className="px-6 py-3">Remaining Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {amortizationSchedule.map((payment) => (
                                                        <tr key={payment.month} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td scope="row" className="px-6 py-2 whitespace-nowrap">{payment.month}</td>
                                                            <td scope="row" className="px-6 py-2 whitespace-nowrap">${payment.principalPayment}</td>
                                                            <td scope="row" className="px-6 py-2 whitespace-nowrap">${payment.interestPayment}</td>
                                                            <td scope="row" className="px-6 py-2 whitespace-nowrap">${payment.balance}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
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