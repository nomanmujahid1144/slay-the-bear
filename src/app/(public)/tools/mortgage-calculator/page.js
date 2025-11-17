'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import InputField from "@/app/components/fields/Input";
import SelectionBox from "@/app/components/fields/Select";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { Finance } from "financejs";
import { useEffect, useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import Image from "next/image";
import slideBarImage from '../../../../../public/assets/img/images/sidebar_img06.jpg';


export default function MortgageCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();

    // State for inputs
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [paymentType, setPaymentType] = useState(0); // 0 = years, 1 = months

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
            "largeChartUrl": `${process.env.NEXT_PUBLIC_BASE_URL}/symbols`,
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
            "largeChartUrl": `${process.env.NEXT_PUBLIC_BASE_URL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
        }, srcFile.getMarketOverview);

        // Cleanup function to remove all widgets before re-rendering
        return () => {
            cleanupMarketStocksNews(); // Clean up market stocks news widget
            cleanupMarketStocksOverview(); // Clean up market stocks overview widget
        };
    }, [isDarkMode]); // Re-run the effect when `isDarkMode` changes

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh on submit

        // Validate inputs
        if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
            alert("Please enter valid positive values for all fields.");
            return;
        }

        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate); // FinanceJS expects rate as percentage
        const term = parseFloat(loanTerm); // Total number of payments based on term
        const paymentMode = parseInt(paymentType, 10); // Payment type (0 = years, 1 = months)

        // Using FinanceJS to calculate the mortgage payment
        const payment = finance.AM(principal, rate, term, paymentMode);

        if (isNaN(payment)) {
            alert("Something went wrong with the calculation.");
            return;
        }

        setMonthlyPayment(payment.toFixed(2)); // Set the monthly payment result
    };

    const handleReset = () => {
        setLoanAmount(0);
        setInterestRate(0);
        setLoanTerm(0);
        setPaymentType(0);
        setMonthlyPayment(null)
    }


    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Mortgage Calculator"
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
                                                    placeholder="Enter the Loan Amount"
                                                    required={true}
                                                    id="loan-amount"
                                                    type="number"
                                                    // value={loanAmount}
                                                    onChange={(e) => setLoanAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-dollar-sign"
                                                    label="Interest Rate (%):"
                                                    placeholder="Enter Interest Rate"
                                                    required={true}
                                                    id="interest-rate"
                                                    type="number"
                                                    step="0.01"
                                                    // value={interestRate}
                                                    onChange={(e) => setInterestRate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-dollar-sign"
                                                    label="Loan Term (Years):"
                                                    placeholder="Enter Loan Term"
                                                    required={true}
                                                    id="loan-terms"
                                                    type="number"
                                                    // value={loanTerm}
                                                    onChange={(e) => setLoanTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <SelectionBox
                                                    label="Payment Type:"
                                                    required={true}
                                                    id="loan-term-type"
                                                    value={paymentType}
                                                    onChange={(e) => setPaymentType(e.target.value)}
                                                    options={[
                                                        { label: "Years", value: 0 },
                                                        { label: "Months", value: 1 },
                                                    ]}
                                                />
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
                                <div className=" pt-10">
                                    {/* Display the result */}
                                    {monthlyPayment !== null && (
                                        <div className="">
                                            <h3>Monthly Payment: ${monthlyPayment}</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={'Calculates monthly mortgage payments based on loan amount, interest rate, and term.'}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A $200,000 loan at 5% for 30 years shows monthly payments of $1,073.64.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result is broken into two parts—principal (the amount reducing your loan balance) and interest (what you pay for borrowing). Over time, more of your payment will go toward the principal as the loan matures.'}
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