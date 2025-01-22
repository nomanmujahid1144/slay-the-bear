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


export default function BondYieldToMaturityCalculator() {

    const { isDarkMode } = useDarkMode();
    const finance = new Finance();

    // State for inputs
    const [bondPrice, setBondPrice] = useState('');
    const [faceValue, setFaceValue] = useState('');
    const [couponRate, setCouponRate] = useState('');
    const [periodsToMaturity, setPeriodsToMaturity] = useState('');
    const [ytm, setYtm] = useState(null);
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
        if (
            bondPrice === '' ||
            faceValue === '' ||
            couponRate === '' ||
            periodsToMaturity === ''
        ) {
            setError('Please fill out all fields.');
            return;
        }

        // Convert inputs to numerical values
        const bondDetails = {
            price: parseFloat(bondPrice),
            faceValue: parseFloat(faceValue),
            couponRate: parseFloat(couponRate) / 100, // Convert to decimal
            periodsToMaturity: parseInt(periodsToMaturity),
        };

        // Check for negative or zero values
        if (
            bondDetails.price <= 0 ||
            bondDetails.faceValue <= 0 ||
            bondDetails.couponRate < 0 ||
            bondDetails.periodsToMaturity <= 0
        ) {
            setError('All inputs must be positive values.');
            return;
        }

        // Calculate YTM
        const ytmValue = calculateYTM(bondDetails);
        setYtm(ytmValue);
    };

    const calculateYTM = (bondDetails) => {
        const { price, faceValue, couponRate, periodsToMaturity } = bondDetails;

        // Coupon Payment
        const couponPayment = couponRate * faceValue;

        // Approximation Formula for YTM
        const annualYield =
            (couponPayment + (faceValue - price) / periodsToMaturity) /
            ((price + faceValue) / 2);

        return annualYield * 100; // Convert to percentage
    };

    const handleReset = () => {
        setBondPrice('');
        setFaceValue('');
        setCouponRate('');
        setPeriodsToMaturity('');
        setYtm(null);
        setError('');
    };


    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Bond Yield to Maturity (YTM) Calculator"
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
                                                fontAwsomeIcon="fa-calendar-day"
                                                label="Periods to Maturity:"
                                                placeholder="Enter periods to maturity"
                                                required={true}
                                                id="periods-to-maturity"
                                                type="number"
                                                value={periodsToMaturity}
                                                onChange={(e) => setPeriodsToMaturity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Calculate YTM
                                        </button>
                                    </div>
                                </form>
                                <div className="pt-10">
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    {ytm !== null && (
                                        <div>
                                            <h3>Yield to Maturity (YTM): {ytm.toFixed(2)}%</h3>
                                            <p>
                                                The YTM represents the annualized return you can expect to earn if you hold the bond to maturity. In this case, it is {ytm.toFixed(2)}%.
                                            </p>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={"Estimates the total return if you hold a bond until maturity."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'A bond bought for $950 with a $1,000 face value and 5% coupon yields 5.45%.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={'The result shows the annualized return you can expect to earn if you hold the bond to maturity, helping you compare bonds and make more informed investment choices.'}
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