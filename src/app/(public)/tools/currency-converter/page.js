'use client'

import { useDarkMode } from "@/app/components/dark-mode/DarkModeContext";
import InputField from "@/app/components/fields/Input";
import SelectionBox from "@/app/components/fields/Select";
import { Heading } from "@/app/components/heading/Heading";
import { srcFile } from "@/app/utils/tradingViewSrcFiles";
import { addTradingViewWidget } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import { ToolDescription } from "../tool-description/ToolDescription";
import axios from "axios";
import Image from "next/image";
import slideBarImage from '../../../../../public/assets/img/images/sidebar_img06.jpg';


export default function CurrencyConvertorCalculator() {

    const { isDarkMode } = useDarkMode();

    // State for inputs
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);


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

    // Fetch exchange rate from Alpha Vantage API
    const fetchExchangeRate = async () => {
        setError('');
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${process.env.alphaVantageStockApi}`);

            console.log(response, 'response')

            if (response.data['Error Message']) {
                setError('Error fetching exchange rates.');
            } else {
                const rate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
                setExchangeRate(rate);
                const converted = (parseFloat(amount) * parseFloat(rate)).toFixed(2);
                setConvertedAmount(converted);
            }
        } catch (err) {
            setError(`Something went wrong. Please try again. ${err}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(amount)
        console.log(fromCurrency)
        console.log(toCurrency)
        if (!amount || isNaN(amount)) {
            setError('Please enter a valid amount.');
            return;
        }
        await fetchExchangeRate();
    };

    const handleReset = () => {
        setAmount('');
        setFromCurrency('USD');
        setToCurrency('EUR');
        setConvertedAmount(null);
        setError('');
        setExchangeRate(null);
    };



    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="sidebar-wrap">
                            <Heading
                                textHeading="Currency Converter"
                                showBtn={false}
                            />
                            <div className="contact-form pb-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputField
                                                isFontAwsome={true}
                                                fontAwsomeIcon="fa-dollar-sign"
                                                label="Amount:"
                                                placeholder="Enter amount"
                                                required={true}
                                                id="fixed-costs"
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <SelectionBox
                                                label="From Currency:"
                                                required={true}
                                                id="loan-term-type"
                                                value={fromCurrency}
                                                onChange={(e) => setFromCurrency(e.target.value)}
                                                options={[
                                                    { label: "Afghan Afghani (AFN)", value: "AFN" },
                                                    { label: "Albanian Lek (ALL)", value: "ALL" },
                                                    { label: "Algerian Dinar (DZD)", value: "DZD" },
                                                    { label: "Angolan Kwanza (AOA)", value: "AOA" },
                                                    { label: "Argentine Peso (ARS)", value: "ARS" },
                                                    { label: "Armenian Dram (AMD)", value: "AMD" },
                                                    { label: "Australian Dollar (AUD)", value: "AUD" },
                                                    { label: "Azerbaijani Manat (AZN)", value: "AZN" },
                                                    { label: "Bahraini Dinar (BHD)", value: "BHD" },
                                                    { label: "Bangladeshi Taka (BDT)", value: "BDT" },
                                                    { label: "Barbadian Dollar (BBD)", value: "BBD" },
                                                    { label: "Belarusian Ruble (BYN)", value: "BYN" },
                                                    { label: "Belgian Franc (BEF)", value: "BEF" },
                                                    { label: "Belize Dollar (BZD)", value: "BZD" },
                                                    { label: "Bermudian Dollar (BMD)", value: "BMD" },
                                                    { label: "Bhutanese Ngultrum (BTN)", value: "BTN" },
                                                    { label: "Bolivian Boliviano (BOB)", value: "BOB" },
                                                    { label: "Bosnia-Herzegovina Convertible Mark (BAM)", value: "BAM" },
                                                    { label: "Botswana Pula (BWP)", value: "BWP" },
                                                    { label: "Brazilian Real (BRL)", value: "BRL" },
                                                    { label: "British Pound Sterling (GBP)", value: "GBP" },
                                                    { label: "Brunei Dollar (BND)", value: "BND" },
                                                    { label: "Bulgarian Lev (BGN)", value: "BGN" },
                                                    { label: "Burundian Franc (BIF)", value: "BIF" },
                                                    { label: "Cambodian Riel (KHR)", value: "KHR" },
                                                    { label: "Canadian Dollar (CAD)", value: "CAD" },
                                                    { label: "Cape Verdean Escudo (CVE)", value: "CVE" },
                                                    { label: "Cayman Islands Dollar (KYD)", value: "KYD" },
                                                    { label: "Chilean Peso (CLP)", value: "CLP" },
                                                    { label: "Chinese Yuan (CNY)", value: "CNY" },
                                                    { label: "Colombian Peso (COP)", value: "COP" },
                                                    { label: "Comorian Franc (KMF)", value: "KMF" },
                                                    { label: "Congolese Franc (CDF)", value: "CDF" },
                                                    { label: "Costa Rican Colón (CRC)", value: "CRC" },
                                                    { label: "Croatian Kuna (HRK)", value: "HRK" },
                                                    { label: "Cuban Convertible Peso (CUC)", value: "CUC" },
                                                    { label: "Czech Republic Koruna (CZK)", value: "CZK" },
                                                    { label: "Danish Krone (DKK)", value: "DKK" },
                                                    { label: "Djiboutian Franc (DJF)", value: "DJF" },
                                                    { label: "Dominican Peso (DOP)", value: "DOP" },
                                                    { label: "East Caribbean Dollar (XCD)", value: "XCD" },
                                                    { label: "Egyptian Pound (EGP)", value: "EGP" },
                                                    { label: "Eritrean Nakfa (ERN)", value: "ERN" },
                                                    { label: "Estonian Kroon (EEK)", value: "EEK" },
                                                    { label: "Ethiopian Birr (ETB)", value: "ETB" },
                                                    { label: "Euro (EUR)", value: "EUR" },
                                                    { label: "Fijian Dollar (FJD)", value: "FJD" },
                                                    { label: "Gambian Dalasi (GMD)", value: "GMD" },
                                                    { label: "Georgian Lari (GEL)", value: "GEL" },
                                                    { label: "German Mark (DEM)", value: "DEM" },
                                                    { label: "Ghanaian Cedi (GHS)", value: "GHS" },
                                                    { label: "Greek Drachma (GRD)", value: "GRD" },
                                                    { label: "Guatemalan Quetzal (GTQ)", value: "GTQ" },
                                                    { label: "Guinean Franc (GNF)", value: "GNF" },
                                                    { label: "Guyanaese Dollar (GYD)", value: "GYD" },
                                                    { label: "Haitian Gourde (HTG)", value: "HTG" },
                                                    { label: "Honduran Lempira (HNL)", value: "HNL" },
                                                    { label: "Hong Kong Dollar (HKD)", value: "HKD" },
                                                    { label: "Hungarian Forint (HUF)", value: "HUF" },
                                                    { label: "Icelandic Króna (ISK)", value: "ISK" },
                                                    { label: "Indian Rupee (INR)", value: "INR" },
                                                    { label: "Indonesian Rupiah (IDR)", value: "IDR" },
                                                    { label: "Iranian Rial (IRR)", value: "IRR" },
                                                    { label: "Iraqi Dinar (IQD)", value: "IQD" },
                                                    { label: "Israeli New Sheqel (ILS)", value: "ILS" },
                                                    { label: "Italian Lira (ITL)", value: "ITL" },
                                                    { label: "Jamaican Dollar (JMD)", value: "JMD" },
                                                    { label: "Japanese Yen (JPY)", value: "JPY" },
                                                    { label: "Jordanian Dinar (JOD)", value: "JOD" },
                                                    { label: "Kazakhstani Tenge (KZT)", value: "KZT" },
                                                    { label: "Kenyan Shilling (KES)", value: "KES" },
                                                    { label: "Kuwaiti Dinar (KWD)", value: "KWD" },
                                                    { label: "Kyrgystani Som (KGS)", value: "KGS" },
                                                    { label: "Laotian Kip (LAK)", value: "LAK" },
                                                    { label: "Latvian Lats (LVL)", value: "LVL" },
                                                    { label: "Lebanese Pound (LBP)", value: "LBP" },
                                                    { label: "Lesotho Loti (LSL)", value: "LSL" },
                                                    { label: "Liberian Dollar (LRD)", value: "LRD" },
                                                    { label: "Libyan Dinar (LYD)", value: "LYD" },
                                                    { label: "Lithuanian Litas (LTL)", value: "LTL" },
                                                    { label: "Macanese Pataca (MOP)", value: "MOP" },
                                                    { label: "Macedonian Denar (MKD)", value: "MKD" },
                                                    { label: "Malagasy Ariary (MGA)", value: "MGA" },
                                                    { label: "Malawian Kwacha (MWK)", value: "MWK" },
                                                    { label: "Malaysian Ringgit (MYR)", value: "MYR" },
                                                    { label: "Maldivian Rufiyaa (MVR)", value: "MVR" },
                                                    { label: "Mauritanian Ouguiya (MRU)", value: "MRU" },
                                                    { label: "Mauritian Rupee (MUR)", value: "MUR" },
                                                    { label: "Mexican Peso (MXN)", value: "MXN" },
                                                    { label: "Moldovan Leu (MDL)", value: "MDL" },
                                                    { label: "Mongolian Tugrik (MNT)", value: "MNT" },
                                                    { label: "Moroccan Dirham (MAD)", value: "MAD" },
                                                    { label: "Mozambican Metical (MZN)", value: "MZN" },
                                                    { label: "Myanmar Kyat (MMK)", value: "MMK" },
                                                    { label: "Namibian Dollar (NAD)", value: "NAD" },
                                                    { label: "Nepalese Rupee (NPR)", value: "NPR" },
                                                    { label: "Netherlands Antillean Guilder (ANG)", value: "ANG" },
                                                    { label: "New Taiwan Dollar (TWD)", value: "TWD" },
                                                    { label: "New Zealand Dollar (NZD)", value: "NZD" },
                                                    { label: "Nicaraguan Córdoba (NIO)", value: "NIO" },
                                                    { label: "Nigerian Naira (NGN)", value: "NGN" },
                                                    { label: "North Korean Won (KPW)", value: "KPW" },
                                                    { label: "Norwegian Krone (NOK)", value: "NOK" },
                                                    { label: "Omani Rial (OMR)", value: "OMR" },
                                                    { label: "Pakistani Rupee (PKR)", value: "PKR" },
                                                    { label: "Panamanian Balboa (PAB)", value: "PAB" },
                                                    { label: "Papua New Guinean Kina (PGK)", value: "PGK" },
                                                    { label: "Paraguayan Guarani (PYG)", value: "PYG" },
                                                    { label: "Peruvian Nuevo Sol (PEN)", value: "PEN" },
                                                    { label: "Philippine Peso (PHP)", value: "PHP" },
                                                    { label: "Polish Zloty (PLN)", value: "PLN" },
                                                    { label: "Qatari Rial (QAR)", value: "QAR" },
                                                    { label: "Romanian Leu (RON)", value: "RON" },
                                                    { label: "Russian Ruble (RUB)", value: "RUB" },
                                                    { label: "Rwandan Franc (RWF)", value: "RWF" },
                                                    { label: "Saint Helena Pound (SHP)", value: "SHP" },
                                                    { label: "Samoan Tala (WST)", value: "WST" },
                                                    { label: "Saudi Riyal (SAR)", value: "SAR" },
                                                    { label: "Serbian Dinar (RSD)", value: "RSD" },
                                                    { label: "Seychellois Rupee (SCR)", value: "SCR" },
                                                    { label: "Sierra Leonean Leone (SLL)", value: "SLL" },
                                                    { label: "Singapore Dollar (SGD)", value: "SGD" },
                                                    { label: "Slovak Koruna (SKK)", value: "SKK" },
                                                    { label: "Solomon Islands Dollar (SBD)", value: "SBD" },
                                                    { label: "Somali Shilling (SOS)", value: "SOS" },
                                                    { label: "South African Rand (ZAR)", value: "ZAR" },
                                                    { label: "South Korean Won (KRW)", value: "KRW" },
                                                    { label: "South Sudanese Pound (SSP)", value: "SSP" },
                                                    { label: "Sri Lankan Rupee (LKR)", value: "LKR" },
                                                    { label: "Sudanese Pound (SDG)", value: "SDG" },
                                                    { label: "Surinamese Dollar (SRD)", value: "SRD" },
                                                    { label: "Swazi Lilangeni (SZL)", value: "SZL" },
                                                    { label: "Swedish Krona (SEK)", value: "SEK" },
                                                    { label: "Swiss Franc (CHF)", value: "CHF" },
                                                    { label: "Syrian Pound (SYP)", value: "SYP" },
                                                    { label: "São Tomé and Príncipe Dobra (STN)", value: "STN" },
                                                    { label: "Tajikistani Somoni (TJS)", value: "TJS" },
                                                    { label: "Tanzanian Shilling (TZS)", value: "TZS" },
                                                    { label: "Thai Baht (THB)", value: "THB" },
                                                    { label: "Tongan Paʻanga (TOP)", value: "TOP" },
                                                    { label: "Trinidad and Tobago Dollar (TTD)", value: "TTD" },
                                                    { label: "Tunisian Dinar (TND)", value: "TND" },
                                                    { label: "Turkish Lira (TRY)", value: "TRY" },
                                                    { label: "Turkmenistani Manat (TMT)", value: "TMT" },
                                                    { label: "Ugandan Shilling (UGX)", value: "UGX" },
                                                    { label: "Ukrainian Hryvnia (UAH)", value: "UAH" },
                                                    { label: "United Arab Emirates Dirham (AED)", value: "AED" },
                                                    { label: "Uruguayan Peso (UYU)", value: "UYU" },
                                                    { label: "US Dollar (USD)", value: "USD" },
                                                    { label: "Uzbekistan Som (UZS)", value: "UZS" },
                                                    { label: "Vanuatu Vatu (VUV)", value: "VUV" },
                                                    { label: "Venezuelan Bolívar (VEF)", value: "VEF" },
                                                    { label: "Vietnamese Dong (VND)", value: "VND" },
                                                    { label: "Yemeni Rial (YER)", value: "YER" },
                                                    { label: "Zambian Kwacha (ZMW)", value: "ZMW" },
                                                    { label: "Zimbabwean Dollar (ZWL)", value: "ZWL" },
                                                ]}

                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <SelectionBox
                                            label="To Currency:"
                                            required={true}
                                            id="loan-term-type"
                                            value={toCurrency}
                                            onChange={(e) => setToCurrency(e.target.value)}
                                            options={[
                                                { label: "Afghan Afghani (AFN)", value: "AFN" },
                                                { label: "Albanian Lek (ALL)", value: "ALL" },
                                                { label: "Algerian Dinar (DZD)", value: "DZD" },
                                                { label: "Angolan Kwanza (AOA)", value: "AOA" },
                                                { label: "Argentine Peso (ARS)", value: "ARS" },
                                                { label: "Armenian Dram (AMD)", value: "AMD" },
                                                { label: "Australian Dollar (AUD)", value: "AUD" },
                                                { label: "Azerbaijani Manat (AZN)", value: "AZN" },
                                                { label: "Bahraini Dinar (BHD)", value: "BHD" },
                                                { label: "Bangladeshi Taka (BDT)", value: "BDT" },
                                                { label: "Barbadian Dollar (BBD)", value: "BBD" },
                                                { label: "Belarusian Ruble (BYN)", value: "BYN" },
                                                { label: "Belgian Franc (BEF)", value: "BEF" },
                                                { label: "Belize Dollar (BZD)", value: "BZD" },
                                                { label: "Bermudian Dollar (BMD)", value: "BMD" },
                                                { label: "Bhutanese Ngultrum (BTN)", value: "BTN" },
                                                { label: "Bolivian Boliviano (BOB)", value: "BOB" },
                                                { label: "Bosnia-Herzegovina Convertible Mark (BAM)", value: "BAM" },
                                                { label: "Botswana Pula (BWP)", value: "BWP" },
                                                { label: "Brazilian Real (BRL)", value: "BRL" },
                                                { label: "British Pound Sterling (GBP)", value: "GBP" },
                                                { label: "Brunei Dollar (BND)", value: "BND" },
                                                { label: "Bulgarian Lev (BGN)", value: "BGN" },
                                                { label: "Burundian Franc (BIF)", value: "BIF" },
                                                { label: "Cambodian Riel (KHR)", value: "KHR" },
                                                { label: "Canadian Dollar (CAD)", value: "CAD" },
                                                { label: "Cape Verdean Escudo (CVE)", value: "CVE" },
                                                { label: "Cayman Islands Dollar (KYD)", value: "KYD" },
                                                { label: "Chilean Peso (CLP)", value: "CLP" },
                                                { label: "Chinese Yuan (CNY)", value: "CNY" },
                                                { label: "Colombian Peso (COP)", value: "COP" },
                                                { label: "Comorian Franc (KMF)", value: "KMF" },
                                                { label: "Congolese Franc (CDF)", value: "CDF" },
                                                { label: "Costa Rican Colón (CRC)", value: "CRC" },
                                                { label: "Croatian Kuna (HRK)", value: "HRK" },
                                                { label: "Cuban Convertible Peso (CUC)", value: "CUC" },
                                                { label: "Czech Republic Koruna (CZK)", value: "CZK" },
                                                { label: "Danish Krone (DKK)", value: "DKK" },
                                                { label: "Djiboutian Franc (DJF)", value: "DJF" },
                                                { label: "Dominican Peso (DOP)", value: "DOP" },
                                                { label: "East Caribbean Dollar (XCD)", value: "XCD" },
                                                { label: "Egyptian Pound (EGP)", value: "EGP" },
                                                { label: "Eritrean Nakfa (ERN)", value: "ERN" },
                                                { label: "Estonian Kroon (EEK)", value: "EEK" },
                                                { label: "Ethiopian Birr (ETB)", value: "ETB" },
                                                { label: "Euro (EUR)", value: "EUR" },
                                                { label: "Fijian Dollar (FJD)", value: "FJD" },
                                                { label: "Gambian Dalasi (GMD)", value: "GMD" },
                                                { label: "Georgian Lari (GEL)", value: "GEL" },
                                                { label: "German Mark (DEM)", value: "DEM" },
                                                { label: "Ghanaian Cedi (GHS)", value: "GHS" },
                                                { label: "Greek Drachma (GRD)", value: "GRD" },
                                                { label: "Guatemalan Quetzal (GTQ)", value: "GTQ" },
                                                { label: "Guinean Franc (GNF)", value: "GNF" },
                                                { label: "Guyanaese Dollar (GYD)", value: "GYD" },
                                                { label: "Haitian Gourde (HTG)", value: "HTG" },
                                                { label: "Honduran Lempira (HNL)", value: "HNL" },
                                                { label: "Hong Kong Dollar (HKD)", value: "HKD" },
                                                { label: "Hungarian Forint (HUF)", value: "HUF" },
                                                { label: "Icelandic Króna (ISK)", value: "ISK" },
                                                { label: "Indian Rupee (INR)", value: "INR" },
                                                { label: "Indonesian Rupiah (IDR)", value: "IDR" },
                                                { label: "Iranian Rial (IRR)", value: "IRR" },
                                                { label: "Iraqi Dinar (IQD)", value: "IQD" },
                                                { label: "Israeli New Sheqel (ILS)", value: "ILS" },
                                                { label: "Italian Lira (ITL)", value: "ITL" },
                                                { label: "Jamaican Dollar (JMD)", value: "JMD" },
                                                { label: "Japanese Yen (JPY)", value: "JPY" },
                                                { label: "Jordanian Dinar (JOD)", value: "JOD" },
                                                { label: "Kazakhstani Tenge (KZT)", value: "KZT" },
                                                { label: "Kenyan Shilling (KES)", value: "KES" },
                                                { label: "Kuwaiti Dinar (KWD)", value: "KWD" },
                                                { label: "Kyrgystani Som (KGS)", value: "KGS" },
                                                { label: "Laotian Kip (LAK)", value: "LAK" },
                                                { label: "Latvian Lats (LVL)", value: "LVL" },
                                                { label: "Lebanese Pound (LBP)", value: "LBP" },
                                                { label: "Lesotho Loti (LSL)", value: "LSL" },
                                                { label: "Liberian Dollar (LRD)", value: "LRD" },
                                                { label: "Libyan Dinar (LYD)", value: "LYD" },
                                                { label: "Lithuanian Litas (LTL)", value: "LTL" },
                                                { label: "Macanese Pataca (MOP)", value: "MOP" },
                                                { label: "Macedonian Denar (MKD)", value: "MKD" },
                                                { label: "Malagasy Ariary (MGA)", value: "MGA" },
                                                { label: "Malawian Kwacha (MWK)", value: "MWK" },
                                                { label: "Malaysian Ringgit (MYR)", value: "MYR" },
                                                { label: "Maldivian Rufiyaa (MVR)", value: "MVR" },
                                                { label: "Mauritanian Ouguiya (MRU)", value: "MRU" },
                                                { label: "Mauritian Rupee (MUR)", value: "MUR" },
                                                { label: "Mexican Peso (MXN)", value: "MXN" },
                                                { label: "Moldovan Leu (MDL)", value: "MDL" },
                                                { label: "Mongolian Tugrik (MNT)", value: "MNT" },
                                                { label: "Moroccan Dirham (MAD)", value: "MAD" },
                                                { label: "Mozambican Metical (MZN)", value: "MZN" },
                                                { label: "Myanmar Kyat (MMK)", value: "MMK" },
                                                { label: "Namibian Dollar (NAD)", value: "NAD" },
                                                { label: "Nepalese Rupee (NPR)", value: "NPR" },
                                                { label: "Netherlands Antillean Guilder (ANG)", value: "ANG" },
                                                { label: "New Taiwan Dollar (TWD)", value: "TWD" },
                                                { label: "New Zealand Dollar (NZD)", value: "NZD" },
                                                { label: "Nicaraguan Córdoba (NIO)", value: "NIO" },
                                                { label: "Nigerian Naira (NGN)", value: "NGN" },
                                                { label: "North Korean Won (KPW)", value: "KPW" },
                                                { label: "Norwegian Krone (NOK)", value: "NOK" },
                                                { label: "Omani Rial (OMR)", value: "OMR" },
                                                { label: "Pakistani Rupee (PKR)", value: "PKR" },
                                                { label: "Panamanian Balboa (PAB)", value: "PAB" },
                                                { label: "Papua New Guinean Kina (PGK)", value: "PGK" },
                                                { label: "Paraguayan Guarani (PYG)", value: "PYG" },
                                                { label: "Peruvian Nuevo Sol (PEN)", value: "PEN" },
                                                { label: "Philippine Peso (PHP)", value: "PHP" },
                                                { label: "Polish Zloty (PLN)", value: "PLN" },
                                                { label: "Qatari Rial (QAR)", value: "QAR" },
                                                { label: "Romanian Leu (RON)", value: "RON" },
                                                { label: "Russian Ruble (RUB)", value: "RUB" },
                                                { label: "Rwandan Franc (RWF)", value: "RWF" },
                                                { label: "Saint Helena Pound (SHP)", value: "SHP" },
                                                { label: "Samoan Tala (WST)", value: "WST" },
                                                { label: "Saudi Riyal (SAR)", value: "SAR" },
                                                { label: "Serbian Dinar (RSD)", value: "RSD" },
                                                { label: "Seychellois Rupee (SCR)", value: "SCR" },
                                                { label: "Sierra Leonean Leone (SLL)", value: "SLL" },
                                                { label: "Singapore Dollar (SGD)", value: "SGD" },
                                                { label: "Slovak Koruna (SKK)", value: "SKK" },
                                                { label: "Solomon Islands Dollar (SBD)", value: "SBD" },
                                                { label: "Somali Shilling (SOS)", value: "SOS" },
                                                { label: "South African Rand (ZAR)", value: "ZAR" },
                                                { label: "South Korean Won (KRW)", value: "KRW" },
                                                { label: "South Sudanese Pound (SSP)", value: "SSP" },
                                                { label: "Sri Lankan Rupee (LKR)", value: "LKR" },
                                                { label: "Sudanese Pound (SDG)", value: "SDG" },
                                                { label: "Surinamese Dollar (SRD)", value: "SRD" },
                                                { label: "Swazi Lilangeni (SZL)", value: "SZL" },
                                                { label: "Swedish Krona (SEK)", value: "SEK" },
                                                { label: "Swiss Franc (CHF)", value: "CHF" },
                                                { label: "Syrian Pound (SYP)", value: "SYP" },
                                                { label: "São Tomé and Príncipe Dobra (STN)", value: "STN" },
                                                { label: "Tajikistani Somoni (TJS)", value: "TJS" },
                                                { label: "Tanzanian Shilling (TZS)", value: "TZS" },
                                                { label: "Thai Baht (THB)", value: "THB" },
                                                { label: "Tongan Paʻanga (TOP)", value: "TOP" },
                                                { label: "Trinidad and Tobago Dollar (TTD)", value: "TTD" },
                                                { label: "Tunisian Dinar (TND)", value: "TND" },
                                                { label: "Turkish Lira (TRY)", value: "TRY" },
                                                { label: "Turkmenistani Manat (TMT)", value: "TMT" },
                                                { label: "Ugandan Shilling (UGX)", value: "UGX" },
                                                { label: "Ukrainian Hryvnia (UAH)", value: "UAH" },
                                                { label: "United Arab Emirates Dirham (AED)", value: "AED" },
                                                { label: "Uruguayan Peso (UYU)", value: "UYU" },
                                                { label: "US Dollar (USD)", value: "USD" },
                                                { label: "Uzbekistan Som (UZS)", value: "UZS" },
                                                { label: "Vanuatu Vatu (VUV)", value: "VUV" },
                                                { label: "Venezuelan Bolívar (VEF)", value: "VEF" },
                                                { label: "Vietnamese Dong (VND)", value: "VND" },
                                                { label: "Yemeni Rial (YER)", value: "YER" },
                                                { label: "Zambian Kwacha (ZMW)", value: "ZMW" },
                                                { label: "Zimbabwean Dollar (ZWL)", value: "ZWL" },
                                            ]}

                                        />
                                    </div>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <button onClick={handleReset} type="reset" className="btn btn-two">
                                            Reset
                                        </button>
                                        <button type="submit" className="btn btn-two">
                                            Convert
                                        </button>
                                    </div>
                                </form>
                                <div className="pt-10">
                                    {/* Display the result */}
                                    {error && <p style={{ color: 'red' }}>{error}</p>}

                                    {convertedAmount !== null && !error && (
                                        <div>
                                            <h3>Converted Amount: {convertedAmount} {toCurrency}</h3>
                                            <p>Exchange Rate: {exchangeRate} {fromCurrency} = 1 {toCurrency}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ToolDescription
                                title={'Summary'}
                                details={" Converts currency based on current exchange rates."}
                            />
                            <ToolDescription
                                title={'Example'}
                                details={'$1,000 converts to €850 at a rate of 0.85.'}
                            />
                            <ToolDescription
                                title={'Explanation of Results'}
                                details={' The result shows the value of your money in another currency, helping you plan international transactions or travel by providing the latest exchange rate.'}
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