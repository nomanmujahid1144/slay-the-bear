'use client'

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { srcFile } from '../../utils/tradingViewSrcFiles';
import { useDarkMode } from '../../components/dark-mode/DarkModeContext';
import { addTradingViewWidget } from '../../utils/utils';

function SymbolComponent() {
    const searchParams = useSearchParams();
    const { isDarkMode } = useDarkMode();
    const [symbol, setSymbol] = useState('');

    useEffect(() => {
        const symbolParam = searchParams.get('tvwidgetsymbol');
        if (symbolParam) setSymbol(symbolParam);
    }, [searchParams]);

    useEffect(() => {
        if (!symbol) return;

        const initializeWidget = (containerId: string, config: Record<string, unknown>, callback: string) => {
            const widgetContainer = document.getElementById(containerId);
            if (widgetContainer) widgetContainer.innerHTML = '';
            return addTradingViewWidget(containerId, config, callback);
        };

        const theme = isDarkMode ? 'dark' : 'light';

        const cleanupSymbolDetails = initializeWidget(
            'tradingSymbol-widget-container',
            {
                largeChartUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/symbols`,
                colorTheme: theme,
                symbol,
                width: '100%',
                locale: 'en',
                isTransparent: false,
            },
            srcFile.getWidgetSymbolInfo
        );

        const cleanupTimeline = initializeWidget(
            'topnews-widget-container',
            {
                feedMode: 'symbol',
                symbol,
                isTransparent: true,
                displayMode: 'compact',
                width: '100%',
                height: '100%',
                colorTheme: theme,
                locale: 'en',
            },
            srcFile.getTimeline
        );

        return () => {
            if (cleanupSymbolDetails) cleanupSymbolDetails();
            if (cleanupTimeline) cleanupTimeline();
        };
    }, [symbol, isDarkMode]);

    return (
        <section className="top-news-post-area pt-70 pb-70">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="tradingview-widget-container" id="tradingSymbol-widget-container">
                                    <div className="tradingview-widget-container__widget"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12">
                        <div className="sidebar-wrap-three">
                            <div className="!h-[64rem]" id="topnews-widget-container">
                                <div className="tradingview-widget-container__widget"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Symbol() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SymbolComponent />
        </Suspense>
    );
}