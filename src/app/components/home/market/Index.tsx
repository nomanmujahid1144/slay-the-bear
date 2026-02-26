'use client'

import { useEffect } from "react"
import { Heading } from "../../heading/Heading"
import { addTradingViewWidget } from "@/app/utils/utils"
import { srcFile } from "@/app/utils/tradingViewSrcFiles"
import { useDarkMode } from "../../dark-mode/DarkModeContext"

interface MarketProps {
    market?: string;
}

export const Market = ({ market }: MarketProps) => {
    const { isDarkMode } = useDarkMode()

    useEffect(() => {
        const initializeWidget = (containerId: string, config: Record<string, unknown>, callback: string) => {
            const widgetContainer = document.getElementById(containerId)
            if (widgetContainer) {
                widgetContainer.innerHTML = ''
            }
            return addTradingViewWidget(containerId, config, callback)
        }

        const baseConfig = {
            width: '100%',
            height: '100%',
            largeChartUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/symbols`,
            colorTheme: (isDarkMode ? 'dark' : 'light') as 'dark' | 'light',
            showSymbolLogo: true,
            isTransparent: true,
            locale: 'en',
        }

        const cleanupStocks = initializeWidget('tradingview-widget-stocks', {
            ...baseConfig,
            symbolsGroups: [{
                name: 'Stocks', originalName: 'Forex',
                symbols: [
                    { name: 'NASDAQ:NVDA' }, { name: 'NASDAQ:TSLA' }, { name: 'NASDAQ:AVGO' },
                    { name: 'NYSE:NIO' }, { name: 'NASDAQ:SMCI' }, { name: 'NASDAQ:AAPL' },
                    { name: 'NASDAQ:AMZN' }, { name: 'NASDAQ:INTC' }, { name: 'NASDAQ:AMD' },
                    { name: 'NASDAQ:MSFT' },
                ],
            }],
        }, srcFile.getStocks)

        const cleanupCrypto = initializeWidget('tradingview-widget-cryptocurrency', {
            ...baseConfig,
            symbolsGroups: [{
                name: 'Cryptocurrency', originalName: 'Forex',
                symbols: [
                    { name: 'CRYPTOCAP:BTC' }, { name: 'CRYPTOCAP:ETH' }, { name: 'CRYPTOCAP:USDT.D' },
                    { name: 'CRYPTOCAP:BNB' }, { name: 'CRYPTO:SOLUSD' }, { name: 'CRYPTOCAP:USDC' },
                    { name: 'CRYPTOCAP:XRP' }, { name: 'CRYPTOCAP:STETH' }, { name: 'CRYPTOCAP:DOGE' },
                ],
            }],
        }, srcFile.getStocks)

        const cleanupForex = initializeWidget('tradingview-widget-forex', {
            ...baseConfig,
            symbolsGroups: [{
                name: 'Forex', originalName: 'Forex',
                symbols: [
                    { name: 'FOREXCOM:EURUSD' }, { name: 'FOREXCOM:GBPUSD' }, { name: 'FOREXCOM:USDJPY' },
                    { name: 'FOREXCOM:AUDUSD' }, { name: 'FOREXCOM:GBPJPY' }, { name: 'FOREXCOM:USDCAD' },
                    { name: 'FOREXCOM:USDCHF' }, { name: 'FOREXCOM:NZDUSD' }, { name: 'FOREXCOM:EURJPY' },
                    { name: 'FOREXCOM:EURGBP' },
                ],
            }],
        }, srcFile.getStocks)

        const cleanupEtfs = initializeWidget('tradingview-widget-etfs', {
            ...baseConfig,
            symbolsGroups: [{
                name: 'ETFs', originalName: 'Forex',
                symbols: [
                    { name: 'AMEX:SPY' }, { name: 'NASDAQ:QQQ' }, { name: 'AMEX:IWM' },
                    { name: 'NASDAQ:TQQQ' }, { name: 'AMEX:SOXL' }, { name: 'AMEX:DIA' },
                    { name: 'NASDAQ:SMH' }, { name: 'NASDAQ:SQQQ' }, { name: 'AMEX:GLD' },
                    { name: 'AMEX:XLF' },
                ],
            }],
        }, srcFile.getStocks)

        const cleanupMutualFunds = initializeWidget('tradingview-widget-mutual-funds', {
            ...baseConfig,
            symbolsGroups: [{
                name: 'Mutual Funds', originalName: 'Forex',
                symbols: [
                    { name: 'AMEX:PHYS' }, { name: 'AMEX:PSLV' }, { name: 'OTC:LTCN' },
                    { name: 'OTC:SRUUF' }, { name: 'NYSE:PTY' }, { name: 'NYSE:DXYZ' },
                    { name: 'OTC:BCHG' }, { name: 'NYSE:PCN' }, { name: 'NYSE:PDI' },
                    { name: 'NASDAQ:OXLC' },
                ],
            }],
        }, srcFile.getStocks)

        return () => {
            if (cleanupStocks) cleanupStocks()
            if (cleanupCrypto) cleanupCrypto()
            if (cleanupForex) cleanupForex()
            if (cleanupEtfs) cleanupEtfs()
            if (cleanupMutualFunds) cleanupMutualFunds()
        }
    }, [isDarkMode])

    return (
        <section className="recent-post-area-two mb-10">
            <div className="container">
                <div className="recent-post-inner-wrap">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 my-3">
                            <Heading textHeading={'Stocks'} showBtn={true} goTo={'/markets/stocks'} />
                            <div className="sidebar-wrap">
                                <div className="!h-[26rem]" id="tradingview-widget-stocks">
                                    <div className="tradingview-widget-stocks"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 my-3">
                            <Heading textHeading={'Cryptocurrency'} showBtn={true} goTo={'/markets/cryptocurrency'} />
                            <div className="sidebar-wrap">
                                <div className="!h-[26rem]" id="tradingview-widget-cryptocurrency">
                                    <div className="tradingview-widget-cryptocurrency"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 my-3">
                            <Heading textHeading={'Forex'} showBtn={true} goTo={'/markets/forex'} />
                            <div className="sidebar-wrap">
                                <div className="!h-[26rem]" id="tradingview-widget-forex">
                                    <div className="tradingview-widget-forex"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 my-3">
                            <Heading textHeading={'ETFs'} showBtn={true} goTo={'/markets/etfs'} />
                            <div className="sidebar-wrap">
                                <div className="!h-[26rem]" id="tradingview-widget-etfs">
                                    <div className="tradingview-widget-etfs"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 my-3">
                            <Heading textHeading={'Mutual Funds'} showBtn={true} goTo={'/markets/mutual-funds'} />
                            <div className="sidebar-wrap">
                                <div className="!h-[26rem]" id="tradingview-widget-mutual-funds">
                                    <div className="tradingview-widget-mutual-funds"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}