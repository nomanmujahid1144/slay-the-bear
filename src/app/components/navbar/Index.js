'use client'

import Link from "next/link";
import { TrendingNews } from "../trending-news-slider/Index";
import Image from "next/image";
import logoImage from '../../../../public/assets/img/logo/logo.png';
import { MobileVersion } from "./MobileVersion";
import { useEffect, useState } from "react";
import { FinentialNewsMarquee } from "../finential-news-marquee/Index";
import axios from "axios";
import { useAuthStore } from '@/stores/useAuthStore';
import defaultProfileImage from '../../../../public/assets/img/default/defaultUserMaleTmp.png';
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
                navbarName: 'Premium Tools',
                navLink: '/premium-tools'
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

    const router = useRouter();
    const pathname = usePathname();

    // USE ZUSTAND STORE INSTEAD
    const { user, isAuthenticated, isLoading, logout } = useAuthStore();

    const [isMobileVersion, setMobileVerion] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState(null);

    // For LoggedIn User
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMobileVersion = () => {
        setMobileVerion(!isMobileVersion)
    }

    const closeMobileVersion = () => {
        setMobileVerion(false);
    };


    const handleSearchKeyword = (event) => {
        const keyword = event.target.value;

        if (keyword.length > 1) {
            const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`;

            axios.get(url, {
                headers: {
                    'User-Agent': 'axios'
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        const data = response.data['bestMatches'];
                        const symbols = data.map(item => ({
                            symbol: item["1. symbol"],
                            name: item["2. name"]
                        }));
                        setSuggestions(symbols);
                    } else {
                        setSuggestions([]);
                    }
                })
                .catch(error => {
                    setSuggestions([]);
                });
        } else {
            setSuggestions([]);
        }
    };

    const handleCleanSuggestions = () => {
        setSuggestions([]);
    }

    const toggleDropdown = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const handleLogout = async () => {
        try {
            await logout();
            setIsMenuOpen(false);
            toast.success("Logged out successfully");
            router.push('/');
        } catch (error) {
            toast.success("Logged out successfully");
        }
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
                                        width={80}
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
                                                        <li style={{ padding: '5px 0' }}>
                                                            <strong>{suggestion.symbol}</strong>: {suggestion.name}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}
                                    </form>
                                </div>
                            </div>
                            {console.log(isAuthenticated, 'isAuthenticated')}
                            <div className="col-lg-3 flex justify-center">
                                {!isAuthenticated ? (
                                    <div className="hl-right-side-four">
                                        <div className="subscribe-btn">
                                            <Link href="/login" className="btn btn-two">
                                                Sign In
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative inline-block text-left">
                                        <div onClick={toggleDropdown} className="flex justify-center items-center gap-2 cursor-pointer">
                                            <Image
                                                id="avatarButton"
                                                className="w-11 h-11 rounded-full"
                                                src={defaultProfileImage}
                                                alt="User dropdown"
                                            />
                                            <div className="flex justify-between gap-2 items-center">
                                                <p className="text-sm font-medium profile-name">
                                                    {user?.firstName + " " + user?.lastName}
                                                </p>
                                                <FontAwesomeIcon size="xs" icon="fa-solid fa-chevron-down" />
                                            </div>
                                        </div>
                                        {isMenuOpen && (
                                            <div
                                                id="userDropdown"
                                                className="absolute z-10 -ml-32 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 toggle-drop-down"
                                            >
                                                <div className="px-4 py-3 text-sm">
                                                    <div>{user?.firstName + " " + user?.lastName}</div>
                                                    <div className="font-medium truncate">{user?.email}</div>
                                                </div>
                                                <ul className="py-2 text-sm">
                                                    <li>
                                                        <Link
                                                            onClick={toggleDropdown}
                                                            href="/profile"
                                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Profile
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <div className="py-1">
                                                    <p
                                                        onClick={handleLogout}
                                                        className="block px-4 cursor-pointer py-2 text-sm hover:bg-gray-100 hover:!text-primary dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Sign out
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                                {isLoading ? (
                                                    <>
                                                        {[...Array(5)].map((_, index) => (
                                                            <div key={index} className="menu-item-has-children">
                                                                <li key={index} className="my-3 animate-pulse mx-1 rounded-full bg-gray-300 dark:bg-gray-700 w-20 h-6"></li>
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (<>
                                                    {menuItems
                                                        .filter(item => !(item.navbarName === 'Subscriptions' && isLoggedInUser?.plan === 'premium'))
                                                        .map((item, index) => (
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
                                                </>)}
                                            </ul>
                                        </div>
                                        <div className="logo d-lg-none white-logo">
                                            <Link href={'/'} className="w-fit flex flex-col items-center justify-center">
                                                <Image
                                                    src={logoImage}
                                                    alt="logo"
                                                    width={80}
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