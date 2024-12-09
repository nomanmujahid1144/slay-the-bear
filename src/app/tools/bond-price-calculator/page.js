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
import { ToolDescription } from "../tool-description/ToolDescription";


export default function BondPriceCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();

    // State for inputs
    const [couponPayment, setCouponPayment] = useState('');
    const [yieldRate, setYieldRate] = useState('');
    const [yearsToMaturity, setYearsToMaturity] = useState('');
    const [faceValue, setFaceValue] = useState('');
    const [bondPrice, setBondPrice] = useState(null);
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
        e.preventDefault();
        setError('');

        // Validate inputs
        if (
            couponPayment === '' ||
            yieldRate === '' ||
            yearsToMaturity === '' ||
            faceValue === ''
        ) {
            setError('Please fill out all fields.');
            return;
        }

        // Convert inputs to numerical values
        const bondDetails = {
            couponPayment: parseFloat(couponPayment),
            yieldRate: parseFloat(yieldRate) / 100, // Convert to decimal
            yearsToMaturity: parseInt(yearsToMaturity),
            faceValue: parseFloat(faceValue),
        };

        // Calculate the bond price
        const price = calculateBondPrice(bondDetails);
        setBondPrice(price);
    };

    const calculateBondPrice = (bondDetails) => {
        const { couponPayment, yieldRate, yearsToMaturity, faceValue } = bondDetails;

        // Calculate the present value of coupon payments
        let presentValueCoupons = 0;
        for (let t = 1; t <= yearsToMaturity; t++) {
            presentValueCoupons += couponPayment / Math.pow(1 + yieldRate, t);
        }

        // Calculate the present value of the face value (principal)
        const presentValueFaceValue = faceValue / Math.pow(1 + yieldRate, yearsToMaturity);

        // Total bond price is the sum of the present values
        return presentValueCoupons + presentValueFaceValue;
    };

    const handleReset = () => {
        setCouponPayment('');
        setYieldRate('');
        setYearsToMaturity('');
        setFaceValue('');
        setBondPrice(null);
        setError('');
    };


    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Bond Price Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Coupon Payment:"
                                                placeholder="Enter coupon payment"
                                                required={true}
                                                id="coupon-payment"
                                                type="number"
                                                value={couponPayment}
                                                onChange={(e) => setCouponPayment(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percent"
                                                label="Yield Rate (%):"
                                                placeholder="Enter yield rate"
                                                required={true}
                                                id="yield-rate"
                                                type="number"
                                                value={yieldRate}
                                                onChange={(e) => setYieldRate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row pt-4">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-calendar-day"
                                                label="Years to Maturity:"
                                                placeholder="Enter years to maturity"
                                                required={true}
                                                id="years-to-maturity"
                                                type="number"
                                                value={yearsToMaturity}
                                                onChange={(e) => setYearsToMaturity(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Face Value:"
                                                placeholder="Enter face value"
                                                required={true}
                                                id="face-value"
                                                type="number"
                                                value={faceValue}
                                                onChange={(e) => setFaceValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Calculate Bond Price
                                        </button>
                                    </div>
                                </form>
                                <div className="pt-10">
                                    {/* Display the result */}
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    {bondPrice !== null && (
                                        <div>
                                            <h3>Bond Price: ${bondPrice.toFixed(2)}</h3>
                                            <p>
                                                The bond&apos;s price today, based on the present value of its future payments, is <strong>${bondPrice.toFixed(2)}</strong>.
                                            </p>

                                        </div>
                                    )}
                                </div>
                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={"Calculates the current price of a bond based on future cash flows."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A bond with $50 annual coupons and a 4% yield is priced at $1,080.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={"The result shows the bond's price today, considering the present value of its future payments. This helps ensure you're paying a fair price for a bond or selling it at its correct value."}
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