'use client';

import { useState } from "react";
import { Heading } from "../../heading/Heading";
import { Banner } from '../../ads/Banner'

export const Markets = () => {

    const [activeTab, setActiveTab] = useState('indices');

    const tabs = [
        { id: 'indices', label: 'Indices', target: '#indices-tab-pane' },
        { id: 'stocks', label: 'Stocks', target: '#stocks-tab-pane' },
        { id: 'commodities', label: 'Commodities', target: '#commodities-tab-pane' },
        { id: 'currencies', label: 'Currencies', target: '#currencies-tab-pane' },
        { id: 'etfs', label: 'ETFs', target: '#etfs-tab-pane' },
        { id: 'bonds', label: 'Bonds', target: '#bonds-tab-pane' },
        { id: 'funds', label: 'Funds', target: '#funds-tab-pane' },
        { id: 'cryptocurrency', label: 'Cryptocurrency', target: '#cryptocurrency-tab-pane' },
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <section className="recent-post-area-two">
            <div className="container">
                <div className="recent-post-inner-wrap">
                    <div className="row justify-content-center">
                        <div className="col-lg-12"> 
                            <Heading
                                textHeading={'Markets'}
                            />
                            <div className="sidebar-wrap no-sticky">
                                <div className="sidebar-tab">
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
                                            {/* <div className="sidebar-widget sidebar-widget-two"> */}
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

                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Banner />
                        </div>
                        {/* <div className="col-lg-3"></div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}