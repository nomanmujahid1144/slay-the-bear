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
import slideBarImage from '../../../../../public/assets/img/images/sidebar_img06.jpg';


export default function RetirementCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();

    // State for inputs
    const [currentAge, setCurrentAge] = useState(0);
    const [retirementAge, setRetirementAge] = useState(0);
    const [currentSavings, setCurrentSavings] = useState(0);
    const [annualContributions, setAnnualContributions] = useState(0);
    const [expectedRateOfReturn, setExpectedRateOfReturn] = useState(0);
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

        const yearsToRetirement = retirementAge - currentAge;
        const rate = expectedRateOfReturn / 100;

        // Future value formula for a series of cash flows (annual contributions)
        const futureValueContributions = annualContributions * (((1 + rate) ** yearsToRetirement - 1) / rate);

        // Future value of current savings
        const futureValueSavings = currentSavings * (1 + rate) ** yearsToRetirement;

        // Total future value
        const totalFutureValue = futureValueContributions + futureValueSavings;

        setFutureValue(totalFutureValue.toFixed(2));
    };

    const handleReset = () => {
        setCurrentAge(0);
        setRetirementAge(0);
        setCurrentSavings(0);
        setAnnualContributions(0);
        setExpectedRateOfReturn(0);
        setFutureValue(null);
    }


    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Retirement Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={false}
                                                    label="Current Age:"
                                                    placeholder="Enter your current age"
                                                    required={true}
                                                    id="current-age"
                                                    type="number"
                                                    onChange={(e) => setCurrentAge(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={false}
                                                    label="Retirement Age:"
                                                    placeholder="Enter your expected retirement age"
                                                    required={true}
                                                    id="retirement-age"
                                                    type="number"
                                                    onChange={(e) => setRetirementAge(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-dollar-sign"
                                                    label="Current Savings:"
                                                    placeholder="Enter your current savings"
                                                    required={true}
                                                    id="current-savings"
                                                    type="number"
                                                    onChange={(e) => setCurrentSavings(e.target.value)}
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
                                                    label="Annual Contributions:"
                                                    placeholder="Enter annual contributions"
                                                    required={true}
                                                    id="annual-contributions"
                                                    type="number"
                                                    onChange={(e) => setAnnualContributions(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-grp">
                                                <InputField
                                                    isFontAwsome={true}
                                                    fontAwsomeIcon="fa-percentage"
                                                    label="Expected Rate of Return (%):"
                                                    placeholder="Enter expected rate of return"
                                                    required={true}
                                                    id="expected-return"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={(e) => setExpectedRateOfReturn(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Calculate Retirement Savings
                                        </button>
                                    </div>
                                </form>
                                <div className=" pt-10">
                                    {/* Display the result */}
                                    {futureValue !== null && (
                                        <div className="pt-4">
                                            <h3>Estimated Savings at Retirement:</h3>
                                            <p>${futureValue}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={"Estimates how much you'll need for retirement based on current savings, contributions, and expenses."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'Saving $500 per month with a 6% return could give you $500,000 by retirement.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows your total savings at retirement age and compares it to your expected expenses. If there’s a gap, you’ll know you need to save more or adjust your retirement expectations.'}
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