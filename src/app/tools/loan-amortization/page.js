'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { Finance } from "financejs";
import { useEffect, useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import Image from "next/image";
import slideBarImage from '../../../../public/assets/img/images/sidebar_img06.jpg';


export default function LoanAmortizationCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();
    const [principal, setPrincipal] = useState(0);
    const [annualInterestRate, setAnnualInterestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [extraPayment, setExtraPayment] = useState(0);
    const [loanTermType, setLoanTermType] = useState(0); // 0 for years, 1 for months
    const [amortizationSchedule, setAmortizationSchedule] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateAmortization();
    };

    const calculateAmortization = () => {
        const totalPayments = loanTermType === 0 ? loanTerm * 12 : loanTerm; // Convert years to months if needed
        const monthlyInterestRate = (annualInterestRate / 100) / 12;

        const baseMonthlyPayment = (principal * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

        let balance = principal;
        let paymentSchedule = [];

        for (let i = 1; i <= totalPayments; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = baseMonthlyPayment + extraPayment - interestPayment;
            balance -= principalPayment;

            paymentSchedule.push({
                month: i,
                principalPayment: principalPayment.toFixed(2),
                interestPayment: interestPayment.toFixed(2),
                balance: Math.max(balance, 0).toFixed(2)
            });

            if (balance <= 0) break;
        }

        setAmortizationSchedule(paymentSchedule);
    };

    const handleReset = () => {
        setPrincipal(0);
        setAnnualInterestRate(0);
        setLoanTerm(0);
        setExtraPayment(0);
        setLoanTermType(0);
        setAmortizationSchedule([]);
    }

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

    // Additional code to calculate the loan amortization schedule


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
                                                    onChange={(e) => setPrincipal(parseFloat(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-percent"
                                                    label="Annual Interest Rate (%):"
                                                    placeholder="Enter interest rate"
                                                    required={true}
                                                    id="interest-rate"
                                                    type="number"
                                                    onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value))}
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
                                                    onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
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
                                                    onChange={(e) => setExtraPayment(parseFloat(e.target.value))}
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
                                    {/* Display the amortization schedule */}
                                    {amortizationSchedule.length > 0 && (
                                        <>
                                            <h3 className="pb-3">Amortization Schedule</h3>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-900">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
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