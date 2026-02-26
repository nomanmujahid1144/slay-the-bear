'use client'

import { srcFile } from '@/app/utils/tradingViewSrcFiles';
import { addTradingViewWidget } from '@/app/utils/utils';
import { useEffect } from 'react';
import { useDarkMode } from '../dark-mode/DarkModeContext';

export const FinentialNewsMarquee = () => {
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        const initializeWidget = (containerId: string, config: Record<string, unknown>, callback: string) => {
            const widgetContainer = document.getElementById(containerId);
            if (widgetContainer) {
                widgetContainer.innerHTML = '';
            }
            return addTradingViewWidget(containerId, config, callback);
        };

        const tickerTape = initializeWidget('tradingview-widget-container', {
            largeChartUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/symbols`,
            colorTheme: isDarkMode ? 'dark' : 'light',
            symbols: [
                { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
                { proName: 'FOREXCOM:NSXUSD', title: 'US 100 Cash CFD' },
                { proName: 'FX_IDC:EURUSD',   title: 'EUR to USD' },
                { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
                { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
            ],
            showSymbolLogo: true,
            isTransparent: false,
            displayMode: 'adaptive',
            locale: 'en',
        }, srcFile.getTickerTape);

        return () => {
            if (tickerTape) tickerTape();
        };
    }, [isDarkMode]);

    return (
        <>
            <div className="tradingview-widget-container" id="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright"></div>
            </div>
            <div className="header-top-wrap-four">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="coin-item-wrap">
                                <div className="row coin-active"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};