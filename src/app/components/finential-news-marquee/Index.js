'use client'

import React, { useEffect } from 'react';


export const FinentialNewsMarquee = () => {

    useEffect(() => {

        // Dynamically inject custom styles
        const style = document.createElement('style');
        style.innerHTML = `
        .label-dzbd7lyV.snap-dzbd7lyV.end-dzbd7lyV {
            display: none !important;
        }
        `;
        document.head.appendChild(style);

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "largeChartUrl": `${process.env.baseURL}/symbols`,
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
            "colorTheme": "light",
            "locale": "en"
        });
        document.getElementById('tradingview-widget-container').appendChild(script);
    }, []);

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