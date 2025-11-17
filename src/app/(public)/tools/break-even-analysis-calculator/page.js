'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import InputField from "@/app/components/fields/Input";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import Image from "next/image";
import slideBarImage from '../../../../../public/assets/img/images/sidebar_img06.jpg';


export default function ModifiedDurationCalculator() {

    const { isDarkMode } = useDarkMode();

    // State for inputs
    const [fixedCosts, setFixedCosts] = useState('');
    const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
    const [sellingPricePerUnit, setSellingPricePerUnit] = useState('');
    const [breakEvenUnits, setBreakEvenUnits] = useState(null);
    const [error, setError] = useState('');


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
        setError('');

        // Validate inputs
        if (fixedCosts === '' || variableCostPerUnit === '' || sellingPricePerUnit === '') {
            setError('Please fill out all fields.');
            return;
        }

        const fixedCostsNum = parseFloat(fixedCosts);
        const variableCostNum = parseFloat(variableCostPerUnit);
        const sellingPriceNum = parseFloat(sellingPricePerUnit);

        // Ensure the selling price is greater than the variable cost
        if (sellingPriceNum <= variableCostNum) {
            setError(
                'Selling price must be greater than the variable cost per unit to calculate break-even.'
            );
            return;
        }

        // Calculate break-even point
        const breakEven = fixedCostsNum / (sellingPriceNum - variableCostNum);

        // If the break-even point is valid, calculate; otherwise, return error
        if (breakEven > 0) {
            setBreakEvenUnits(Math.ceil(breakEven)); // Rounded up to the next whole unit
        } else {
            setError('No feasible break-even point with the given costs and price.');
        }
    };

    const handleReset = () => {
        setFixedCosts('');
        setVariableCostPerUnit('');
        setSellingPricePerUnit('');
        setBreakEvenUnits(null);
        setError('');
    };



    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Break-Even Analysis Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Fixed Costs ($):"
                                                placeholder="Enter total fixed costs"
                                                required={true}
                                                id="fixed-costs"
                                                type="number"
                                                value={fixedCosts}
                                                onChange={(e) => setFixedCosts(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Variable Cost per Unit ($):"
                                                placeholder="Enter variable cost per unit"
                                                required={true}
                                                id="variable-cost"
                                                type="number"
                                                value={variableCostPerUnit}
                                                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row pt-4">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Selling Price per Unit ($):"
                                                placeholder="Enter selling price per unit"
                                                required={true}
                                                id="selling-price"
                                                type="number"
                                                value={sellingPricePerUnit}
                                                onChange={(e) => setSellingPricePerUnit(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Calculate Break-Even
                                        </button>
                                    </div>
                                </form>
                                <div className="pt-10">
                                    {/* Display the result */}
                                    {error && <p className="text-red-600 pt-3">{error}</p>}
                                    {breakEvenUnits !== null && !error && (
                                        <div className="result pt-4">
                                            <h3>Break-Even Point</h3>
                                            <p>
                                                You need to sell approximately <strong>{breakEvenUnits}</strong> units
                                                to cover your costs.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={"Determines how many units you need to sell to cover costs."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'Selling 667 units at $20 covers $10,000 in fixed costs.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The results show the point at which your business begins to make a profit, helping you set appropriate sales goals and pricing strategies to ensure profitability.'}
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