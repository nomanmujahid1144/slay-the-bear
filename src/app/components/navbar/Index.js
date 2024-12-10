'use client'
import Link from "next/link";
import { TrendingNews } from "../trending-news-slider/Index";
import Image from "next/image";
import logoImage from '../../../../public/assets/img/logo/logo.png';
import { MobileVersion } from "./MobileVersion";
import { useState } from "react";
import { FinentialNewsMarquee } from "../finential-news-marquee/Index";
import axios from "axios";


const menuItems = [
    {
        navbarName: 'Home',
        subMenu: [],
        navLink: '/'
    },
    {
        navbarName: 'Markets',
        subMenu: [
            {
                navbarName: 'Stocks',
                subMenu: [],
                navLink: '/markets/stocks'
            },
            {
                navbarName: 'Cryptocurrency',
                subMenu: [],
                navLink: '/markets/cryptocurrency'
            },
            {
                navbarName: 'Forex',
                subMenu: [],
                navLink: '/markets/forex'
            },
            {
                navbarName: 'ETFs',
                subMenu: [],
                navLink: '/markets/etfs'
            },
            {
                navbarName: 'Mutual Funds',
                subMenu: [],
                navLink: '/markets/mutual-funds'
            },
        ],
        navLink: '/markets'
    },
    {
        navbarName: 'Tool Section',
        subMenu: [
            {
                navbarName: 'Free Tools',
                subMenu: [
                    {
                        navbarName: 'Loan Amortization Calculator',
                        navLink: '/tools/loan-amortization'
                    },
                    {
                        navbarName: 'Mortgage Calculator',
                        navLink: '/tools/mortgage-calculator'
                    },
                    {
                        navbarName: 'Retirement Calculator',
                        navLink: '/tools/retirement-calculator'
                    },
                    {
                        navbarName: 'Investment Return Calculator',
                        navLink: '/tools/investment-return-calculator'
                    },
                    {
                        navbarName: 'Compound Interest Calculator',
                        navLink: '/tools/compound-interest-calculator'
                    },
                    {
                        navbarName: 'More In Calculators',
                        navLink: '/tools'
                    },
                ],
                navLink: '/tools'
            },
            {
                navbarName: 'Paid Tools',
                navLink: '/paid-tools'
            },
        ],
        navLink: '/tools'
    },
    {
        navbarName: 'News Page',
        subMenu: [],
        navLink: '/news'
    },
    {
        navbarName: 'Subscriptions',
        subMenu: [],
        navLink: '/pricing'
    }
];

export const Navbar = () => {

    const [isMobileVersion, setMobileVerion] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleMobileVersion = () => {
        setMobileVerion(!isMobileVersion)
    }

    // Function to handle search keyword change
    const handleSearchKeyword = (event) => {
        const keyword = event.target.value;

        // Check if input has more than one character
        if (keyword.length > 1) {
            const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.alphaVantageStockApi}`;

            // Using axios to make a GET request
            axios.get(url, {
                headers: {
                    'User-Agent': 'axios'  // Optionally set User-Agent header
                }
            })
                .then(response => {
                    // Check if the request was successful
                    if (response.status === 200) {
                        const data = response.data['bestMatches'];  // Extracting the 'bestMatches' key from response data
                        const symbols = data.map(item => ({
                            symbol: item["1. symbol"],
                            name: item["2. name"]
                        }));
                        setSuggestions(symbols);  // Set the state with fetched symbols
                    } else {
                        setSuggestions([]);  // Clear suggestions if API call fails
                    }
                })
                .catch(error => {
                    setSuggestions([]);  // Clear suggestions on error
                });
        } else {
            setSuggestions([]);  // Clear suggestions if input is less than 2 characters
        }
    };

    const handleCleanSuggestions = () => {
        setSuggestions([]);
    }

    return (
        <>
            <header className="header-style-six">
                <div id="header-fixed-height" />
                <TrendingNews />
                <FinentialNewsMarquee />
                <div className="header-logo-area-four">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <Link href={'/'} className="w-fit flex flex-col items-center justify-center">
                                    <Image
                                        src={logoImage}
                                        alt="logo"
                                        width={130}
                                        height={70}
                                    />
                                    <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
                                </Link>
                            </div>
                            <div className="col-lg-6">
                                <div className="header-search-wrap">
                                    <form action="#" className="relative w-100">
                                        <input type="text" onChange={(e) => handleSearchKeyword(e)} placeholder="Search here . . ." />
                                        <button type="submit">
                                            <i className="flaticon-search" />
                                        </button>
                                        {suggestions.length > 0 && (
                                            <ul className="absolute bg-white z-10 rounded-lg p-3">
                                                {suggestions.map((suggestion, index) => (
                                                    <Link key={index} onClick={handleCleanSuggestions} href={`/symbols?tvwidgetsymbol=${suggestion.symbol}`}>
                                                        <li key={index} style={{ padding: '5px 0' }}>
                                                            <strong>{suggestion.symbol}</strong>: {suggestion.name}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 flex justify-center">
                                <div className="hl-right-side-four">
                                    <div className="subscribe-btn">
                                        <Link href="/login" className="btn btn-two">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sticky-header" className="menu-area menu-style-six">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="menu-wrap">
                                    <nav className="menu-nav justify-content-lg-center">
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">
                                                {menuItems.map((item, index) => (
                                                    <li key={index} className={`${item.subMenu.length > 0 ? 'menu-item-has-children active' : ''}`}>
                                                        <Link href={item.navLink}>
                                                            {item.navbarName}
                                                        </Link>
                                                        {item.subMenu.length > 0 && (
                                                            <ul className="sub-menu">
                                                                {item.subMenu.map((subItem, subIndex) => (
                                                                    <>
                                                                        {subItem?.subMenu?.length > 0 ? (
                                                                            <>
                                                                                <li key={index} className={`${subItem.subMenu.length > 0 ? 'menu-item-has-children active' : ''}`}>
                                                                                    <Link href={subItem.navLink}>
                                                                                        {subItem.navbarName}
                                                                                    </Link>
                                                                                    <ul className="sub-menu">
                                                                                        {subItem?.subMenu?.map((subItem, index) => (
                                                                                            <li key={subIndex}>
                                                                                                <Link href={subItem.navLink}>
                                                                                                    {subItem.navbarName}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </li>
                                                                            </>
                                                                        ) : (
                                                                            <li key={subIndex}>
                                                                                <Link href={subItem.navLink}>
                                                                                    {subItem.navbarName}
                                                                                </Link>
                                                                            </li>
                                                                        )}
                                                                    </>
                                                                ))}
                                                            </ul >
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="logo d-lg-none white-logo">
                                            <Link href={'/'} className="w-fit flex flex-col items-center justify-center">
                                                <Image
                                                    src={logoImage}
                                                    alt="logo"
                                                    width={100}
                                                    height={70}
                                                />
                                                <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
                                            </Link>
                                        </div>
                                        <div className="mobile-nav-toggler" onClick={handleMobileVersion}>
                                            <i className="fas fa-bars" />
                                        </div>
                                    </nav>
                                </div>
                                {/* Mobile Menu  */}
                                <MobileVersion
                                    isMobileVersion={isMobileVersion}
                                    handleMobileVersion={handleMobileVersion}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}