'use client';

import { useEffect, useState } from "react";
import { Heading } from "../../heading/Heading";
import { Banner } from '../../ads/Banner'

export const Market = ({market, showBtn}) => {

    // const [activeTab, setActiveTab] = useState('indices');

    // const tabs = [
    //     { id: 'indices', label: 'Indices', target: '#indices-tab-pane' },
    //     { id: 'stocks', label: 'Stocks', target: '#stocks-tab-pane' },
    //     { id: 'commodities', label: 'Commodities', target: '#commodities-tab-pane' },
    //     { id: 'currencies', label: 'Currencies', target: '#currencies-tab-pane' },
    //     { id: 'etfs', label: 'ETFs', target: '#etfs-tab-pane' },
    //     { id: 'bonds', label: 'Bonds', target: '#bonds-tab-pane' },
    //     { id: 'funds', label: 'Funds', target: '#funds-tab-pane' },
    //     { id: 'cryptocurrency', label: 'Cryptocurrency', target: '#cryptocurrency-tab-pane' },
    // ];

    // const handleTabClick = (tabId) => {
    //     setActiveTab(tabId);
    // };



    useEffect(() => {
        // Dynamically add the TradingView script
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
          "width": "100%",
          "height": "100%",
          "largeChartUrl": `${process.env.baseURL}/symbols`,
          "symbolsGroups": [
            {
              "name": "Indices",
              "originalName": "Indices",
              "symbols": [
                { "name": "FOREXCOM:SPXUSD", "displayName": "S&P 500 Index" },
                { "name": "FOREXCOM:NSXUSD", "displayName": "US 100 Cash CFD" },
                { "name": "FOREXCOM:DJI", "displayName": "Dow Jones Industrial Average Index" },
                { "name": "INDEX:NKY", "displayName": "Nikkei 225" },
                { "name": "INDEX:DEU40", "displayName": "DAX Index" },
                { "name": "FOREXCOM:UKXGBP", "displayName": "FTSE 100 Index" }
              ]
            },
            {
              "name": "Futures",
              "originalName": "Futures",
              "symbols": [
                { "name": "CME_MINI:ES1!", "displayName": "S&P 500" },
                { "name": "CME:6E1!", "displayName": "Euro" },
                { "name": "COMEX:GC1!", "displayName": "Gold" },
                { "name": "NYMEX:CL1!", "displayName": "WTI Crude Oil" },
                { "name": "NYMEX:NG1!", "displayName": "Gas" },
                { "name": "CBOT:ZC1!", "displayName": "Corn" }
              ]
            },
            {
              "name": "Bonds",
              "originalName": "Bonds",
              "symbols": [
                { "name": "CBOT:ZB1!", "displayName": "T-Bond" },
                { "name": "CBOT:UB1!", "displayName": "Ultra T-Bond" },
                { "name": "EUREX:FGBL1!", "displayName": "Euro Bund" },
                { "name": "EUREX:FBTP1!", "displayName": "Euro BTP" },
                { "name": "EUREX:FGBM1!", "displayName": "Euro BOBL" }
              ]
            },
            {
              "name": "Forex",
              "originalName": "Forex",
              "symbols": [
                { "name": "FX:EURUSD", "displayName": "EUR to USD" },
                { "name": "FX:GBPUSD", "displayName": "GBP to USD" },
                { "name": "FX:USDJPY", "displayName": "USD to JPY" },
                { "name": "FX:USDCHF", "displayName": "USD to CHF" },
                { "name": "FX:AUDUSD", "displayName": "AUD to USD" },
                { "name": "FX:USDCAD", "displayName": "USD to CAD" }
              ]
            }
          ],
          "showSymbolLogo": true,
          "isTransparent": true,
          "locale": "en"
        });
        document.getElementById('tradingview-widget-containerr').appendChild(script);
    
        // Cleanup on unmount
        return () => {
          document.getElementById('tradingview-widget-containerr').removeChild(script);
        };
      }, []);

    return (
        <section className="recent-post-area-two mb-10">
            <div className="container">
                <div className="recent-post-inner-wrap">
                    <div className="row justify-content-center">
                        <div className="col-lg-12"> 
                            <Heading
                                textHeading={market}
                                showBtn={showBtn}
                            />
                            <div className="sidebar-wrap">
                                {/* <div className="sidebar-tab">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        {tabs.map((tab) => (
                                            <li className="nav-item" role="presentation" key={tab.id}>
                                                <button
                                                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                                    id={`${tab.id}-tab`}
                                                    data-bs-toggle="tab"
                                                    data-bs-target={tab.target}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls={`${tab.id}-tab-pane`}
                                                    aria-selected={activeTab === tab.id}
                                                    onClick={() => handleTabClick(tab.id)}
                                                >
                                                    {tab.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="blog-details-bottom border-0 pt-0 mt-0">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <div className="post-tags">
                                                    <ul className="list-wrap">
                                                        <li>
                                                            <a className="">Art &amp; Design</a>
                                                        </li>
                                                        <li>
                                                            <a className="">Video</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-content" id="myTabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="latest-tab-pane"
                                            role="tabpanel"
                                            aria-labelledby="latest-tab"
                                            tabIndex={0}
                                        >
                                            <div className="container">
                                                <div className="row !overflow-auto">
                                                    <table
                                                        id="example"
                                                        className="table table-striped table-bordered !table-auto !text-xs"
                                                        cellSpacing={0}
                                                        width="100%"
                                                    >
                                                    <thead>
                                                        <tr>
                                                        <th>Name</th>
                                                        <th>Last</th>
                                                        <th>High</th>
                                                        <th>Low</th>
                                                        <th>Chg.</th>
                                                        <th>Chg%</th>
                                                        <th>Time</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Dow Jones</td>
                                                            <td>40,000.90</td>
                                                            <td>40,257.24</td>
                                                            <td>39,783.28</td>
                                                            <td>+247.15</td>
                                                            <td>+0.62%</td>
                                                            <td>12/07</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Dow Jones</td>
                                                            <td>40,000.90</td>
                                                            <td>40,257.24</td>
                                                            <td>39,783.28</td>
                                                            <td>+247.15</td>
                                                            <td>+0.62%</td>
                                                            <td>12/07</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Dow Jones</td>
                                                            <td>40,000.90</td>
                                                            <td>40,257.24</td>
                                                            <td>39,783.28</td>
                                                            <td>+247.15</td>
                                                            <td>+0.62%</td>
                                                            <td>12/07</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Dow Jones</td>
                                                            <td>40,000.90</td>
                                                            <td>40,257.24</td>
                                                            <td>39,783.28</td>
                                                            <td>+247.15</td>
                                                            <td>+0.62%</td>
                                                            <td>12/07</td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="!h-[64rem]" id="tradingview-widget-containerr">
                                    <div className="tradingview-widget-container__widget"></div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-3"></div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}