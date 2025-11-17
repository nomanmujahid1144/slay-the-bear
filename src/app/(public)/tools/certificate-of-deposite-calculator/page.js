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


export default function CertificateOfDepositeCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();

    const [principal, setPrincipal] = useState('');
    const [annualInterestRate, setAnnualInterestRate] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [compoundingFrequency, setCompoundingFrequency] = useState('annually');
    const [futureValue, setFutureValue] = useState(null);

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
        e.preventDefault();

        const P = parseFloat(principal);
        const r = parseFloat(annualInterestRate) / 100; // Convert percentage to decimal
        const t = parseFloat(timePeriod);
        let n; // Compounding frequency

        switch (compoundingFrequency) {
            case 'daily':
                n = 365;
                break;
            case 'monthly':
                n = 12;
                break;
            case 'quarterly':
                n = 4;
                break;
            case 'semiannually':
                n = 2;
                break;
            case 'annually':
                n = 1;
                break;
            default:
                n = 1;
        }

        if (!isNaN(P) && !isNaN(r) && !isNaN(t) && !isNaN(n)) {
            // Calculate the future value using the formula: FV = P * (1 + r/n)^(nt)
            const FV = P * Math.pow(1 + r / n, n * t);
            setFutureValue(FV);
        } else {
            setFutureValue(null);
            alert('Please enter valid numbers.');
        }
    };

    const handleReset = () => {
        setPrincipal('');
        setAnnualInterestRate('');
        setTimePeriod('');
        setCompoundingFrequency('annually');
        setFutureValue(null);
    }



    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="CD Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Principal Amount ($):"
                                                placeholder="Enter Initial Deposit"
                                                required={true}
                                                id="principal"
                                                type="number"
                                                onChange={(e) => setPrincipal(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percentage"
                                                label="Annual Interest Rate (%):"
                                                placeholder="Enter Annual Interest Rate"
                                                required={true}
                                                id="annual-interest-rate"
                                                type="number"
                                                onChange={(e) => setAnnualInterestRate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar-alt"
                                                label="Time Period (Years):"
                                                placeholder="Enter Time Period in Years"
                                                required={true}
                                                id="time-period"
                                                type="number"
                                                onChange={(e) => setTimePeriod(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <SelectionBox
                                                label="Compounding Frequency:"
                                                required={true}
                                                id="loan-term-type"
                                                value={compoundingFrequency}
                                                onChange={(e) => setCompoundingFrequency(e.target.value)}
                                                options={[
                                                    { label: "Annually", value: 'annually' },
                                                    { label: "Semiannually", value: 'semiannually' },
                                                    { label: "Quarterly", value: 'quarterly' },
                                                    { label: "Monthly", value: 'monthly' },
                                                    { label: "Daily", value: 'daily' },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Calculate Return
                                        </button>
                                    </div>
                                </form>
                                <div className=" pt-10">
                                    {/* Display the result */}
                                    {futureValue !== null && (
                                        <div>
                                            <h3>Future Value of CD: ${futureValue.toFixed(2)}</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={"Estimates the future value of a Certificate of Deposit."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A $5,000 CD at 3% for 3 years grows to $5,463.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows how much your initial deposit will grow over time, factoring in the interest rate and compounding frequency, helping you choose the best CD to meet your savings goals.'}
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