'use client';

import { useState } from "react";
import { Heading } from "../heading/Heading";
import { Banner } from "../ads/Banner";
import { SinglePostDisplay } from "../post-creation/single-post-display/Index";

import politicalNews from '../../../../public/assets/img/blog/cr_trending_post04.jpg';
import crypoImage from '../../../../public/assets/img/blog/blog_post06.jpg';
import eftsNews from '../../../../public/assets/img/blog/cr_banner_post01.jpg';
import forexNews from '../../../../public/assets/img/blog/cr_banner_post02.jpg';

const allNews = [
    {
        postTag: 'Politics', 
        postHeading: 'How To Protect Your App With Threat Model Based On JSONDiff',
        postImage: politicalNews, 
        postDate : '27 AUGUST, 2024', 
        postTime: '20 MINS', 
        postDescription: 'Browned Butter And Brown Sugar Caramelly Oodness Crispyedgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite. Browned Butter Brown Sugar Caramelly Oodness.'
    },
    {
        postTag: 'CRYPTOCURRENCY', 
        postHeading: 'How To Protect Your App With A Model Based On JSONDiff', 
        postImage: crypoImage, 
        postDate : '27 AUGUST, 2024', 
        postTime: '20 MINS', 
        postDescription: 'Browned Butter And Brown Sugar Caramelly Oodness Crispyedgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite. Browned Butter Brown Sugar Caramelly Oodness.'
    },
    {
        postTag: 'Forex', 
        postHeading: 'How To Protect Your App With A Model Based On JSONDiff',
        postImage: forexNews,  
        postDate : '27 AUGUST, 2024', 
        postTime: '20 MINS', 
        postDescription: 'Browned Butter And Brown Sugar Caramelly Oodness Crispyedgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite. Browned Butter Brown Sugar Caramelly Oodness.'
    },
    {
        postTag: 'ETFs', 
        postHeading: 'How To Protect Your App With A Model Based On JSONDiff', 
        postImage: eftsNews, 
        postDate : '27 AUGUST, 2024', 
        postTime: '20 MINS', 
        postDescription: 'Browned Butter And Brown Sugar Caramelly Oodness Crispyedgesthick And Soft Centers And Melty Little Puddles Of Chocolate Y First Favorite. Browned Butter Brown Sugar Caramelly Oodness.'
    },
]

export const NewsTabs = () => {

    const [activeTab, setActiveTab] = useState('indices');

    const tabs = [
        { id: 'stocks', label: 'Stocks', target: '#stocks-news-tab-pane' },
        { id: 'cryptocurrency', label: 'Cryptocurrency', target: '#cryptocurrency-news-tab-pane' },
        { id: 'indices', label: 'Forex', target: '#indices-tab-pane' },
        { id: 'etfs', label: 'ETFs', target: '#etfs-tab-pane' },
        { id: 'funds', label: 'Mutual Funds', target: '#funds-tab-pane' }
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };


    return (
        <section className="recent-post-area-two mt-30">
        <div className="container">
            <div className="recent-post-inner-wrap">
                <div className="row justify-content-center">
                    <div className="col-lg-12"> 
                        <Heading
                            textHeading={'All News'}
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
                                                {allNews.map((news, index) => (
                                                    <SinglePostDisplay
                                                        key={index} 
                                                        postTag={news.postTag}
                                                        postHeading={news.postHeading}
                                                        postImage={news.postImage}
                                                        postDescription={news.postDescription}
                                                        postDate={news.postDate}
                                                        postTime={news.postTime}
                                                    />
                                                ))}
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