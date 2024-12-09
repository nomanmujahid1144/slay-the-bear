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


export default function BreakEvenAnalysisCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();

    // State for inputs
    const [bondPrice, setBondPrice] = useState('');
    const [faceValue, setFaceValue] = useState('');
    const [couponRate, setCouponRate] = useState('');
    const [yieldRate, setYieldRate] = useState('');
    const [periodsPerYear, setPeriodsPerYear] = useState(1); // Default is annual bond (1 period per year)
    const [modifiedDuration, setModifiedDuration] = useState(null);
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
            bondPrice === '' ||
            faceValue === '' ||
            couponRate === '' ||
            yieldRate === ''
        ) {
            setError('Please fill out all fields.');
            return;
        }

        // Parse input values
        const bondDetails = {
            price: parseFloat(bondPrice),
            faceValue: parseFloat(faceValue),
            couponRate: parseFloat(couponRate) / 100, // Convert to decimal
            yieldRate: parseFloat(yieldRate) / 100, // Convert to decimal
            periodsPerYear: parseInt(periodsPerYear),
        };

        // Calculate Macaulay Duration
        const macaulayDuration = calculateMacaulayDuration(bondDetails);

        // Calculate Modified Duration
        const modifiedDurationValue =
            macaulayDuration / (1 + bondDetails.yieldRate / bondDetails.periodsPerYear);

        setModifiedDuration(modifiedDurationValue);
    };

    const calculateMacaulayDuration = (bondDetails) => {
        const { price, faceValue, couponRate, yieldRate, periodsPerYear } = bondDetails;
        let macaulayDuration = 0;
        let totalPresentValue = 0;

        for (let t = 1; t <= periodsPerYear; t++) {
            // Coupon payment
            const couponPayment = couponRate * faceValue / periodsPerYear;

            // Present value of coupon payment at time t
            const presentValueOfCoupon = couponPayment / Math.pow(1 + yieldRate / periodsPerYear, t);
            macaulayDuration += t * presentValueOfCoupon;
            totalPresentValue += presentValueOfCoupon;
        }

        // Adding face value at maturity
        const presentValueOfFaceValue = faceValue / Math.pow(1 + yieldRate / periodsPerYear, periodsPerYear);
        macaulayDuration += periodsPerYear * presentValueOfFaceValue;
        totalPresentValue += presentValueOfFaceValue;

        // Final Macaulay Duration
        return macaulayDuration / totalPresentValue;
    };

    const handleReset = () => {
        setBondPrice('');
        setFaceValue('');
        setCouponRate('');
        setYieldRate('');
        setPeriodsPerYear(1);
        setModifiedDuration(null);
        setError('');
    };



    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Modified Duration Calculator"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Bond Price:"
                                                placeholder="Enter bond price"
                                                required={true}
                                                id="bond-price"
                                                type="number"
                                                value={bondPrice}
                                                onChange={(e) => setBondPrice(e.target.value)}
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
                                    <div className="row pt-4">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percent"
                                                label="Coupon Rate (%):"
                                                placeholder="Enter coupon rate"
                                                required={true}
                                                id="coupon-rate"
                                                type="number"
                                                value={couponRate}
                                                onChange={(e) => setCouponRate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-percent"
                                                label="Yield to Maturity (%):"
                                                placeholder="Enter yield to maturity"
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
                                            <div className="form-grp">
                                                <label>Periods per Year:</label>
                                                <select
                                                    className="form-select"
                                                    value={periodsPerYear}
                                                    onChange={(e) => setPeriodsPerYear(Number(e.target.value))}
                                                >
                                                    <option value={1}>Annual</option>
                                                    <option value={2}>Semi-Annual</option>
                                                    <option value={4}>Quarterly</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Calculate Modified Duration
                                        </button>
                                    </div>
                                </form>
                                <div className="pt-10">
                                    {error && <div className="error">{error}</div>}

                                    {modifiedDuration !== null && (
                                        <div className="result">
                                            <h3>Modified Duration: {modifiedDuration.toFixed(2)}</h3>
                                            <p>
                                                This means that for every 1% change in interest rates, the bond's price will change by approximately {modifiedDuration.toFixed(2)}%.
                                            </p>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={"Measures a bond’s sensitivity to interest rate changes."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A bond with a duration of 5 will decrease 5% in price for every 1% rise in interest rates.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result helps you assess the interest rate risk of your bond investments, allowing you to make informed decisions about which bonds to hold during periods of changing interest rates.'}
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