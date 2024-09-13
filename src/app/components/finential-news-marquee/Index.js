'use client'

import { srcFile } from '@/app/utils/tradingViewSrcFiles';
import { addTradingViewWidget } from '@/app/utils/utils';
import React, { useEffect } from 'react';
import { useDarkMode } from '../dark-mode/DarkModeContext';


export const FinentialNewsMarquee = () => {

    const { isDarkMode } = useDarkMode();

    useEffect(() => {

        // Function to initialize a TradingView widget
        const initializeWidget = (containerId, config, callback) => {
            const widgetContainer = document.getElementById(containerId);

            if (widgetContainer) {
                widgetContainer.innerHTML = ''; // Clear the container to remove any duplicate widgets
            }

            return addTradingViewWidget(containerId, config, callback);
        };

        // Initialize widgets
        const tickerTape = initializeWidget('tradingview-widget-container', {
            "largeChartUrl": `${process.env.baseURL}/symbols`,
            "colorTheme": `${isDarkMode ? 'dark' : 'light'}`,
            "symbols": [
                {
                    "proName": "FOREXCOM:SPXUSD",
                    "title": "S&P 500 Index"
                },
                {
                    "proName": "FOREXCOM:NSXUSD",
                    "title": "US 100 Cash CFD"
                },
                {
                    "proName": "FX_IDC:EURUSD",
                    "title": "EUR to USD"
                },
                {
                    "proName": "BITSTAMP:BTCUSD",
                    "title": "Bitcoin"
                },
                {
                    "proName": "BITSTAMP:ETHUSD",
                    "title": "Ethereum"
                }
            ],
            "showSymbolLogo": true,
            "isTransparent": false,
            "displayMode": "adaptive",
            "locale": "en"
        }, srcFile.getTickerTape);

        // Cleanup function to remove all widgets before re-rendering
        return () => {
            tickerTape();
            // Call other cleanup functions if more widgets are added
        };

    }, [isDarkMode]);

    return (
        <>
            <div className="tradingview-widget-container" id="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright">
                </div>
            </div>
            <div className="header-top-wrap-four ">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div class="coin-item-wrap">
                                <div class="row coin-active">

                                    {/* <Marquee>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="col">
                                            <div className="coin-item">
                                                <div className="content !flex !items-center !gap-3">
                                                    <h5 className="title !text-white !mb-0">
                                                        Nifty Bank
                                                    </h5>
                                                    <span className='!text-white'>
                                                        24,931.15
                                                        <span className='!text-green-600'>
                                                            <FontAwesomeIcon className='!mx-3' icon="fa-solid fa-caret-up" />
                                                            0.38%
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>  
                                        </div>
                                    </Marquee> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}