'use client'
import Link from "next/link";
import { TrendingNews } from "../trending-news-slider/Index";
import Image from "next/image";
import logoImage from '../../../../public/assets/img/logo/logo.png';
import { MobileVersion } from "./MobileVersion";
import { useState } from "react";
import { FinentialNewsMarquee } from "../finential-news-marquee/Index";


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
                navLink: '/market/stocks'
            },
            {
                navbarName: 'Cryptocurrency',
                subMenu: [],
                navLink: '/market/cryptocurrency'
            },
            {
                navbarName: 'Forex',
                subMenu: [],
                navLink: '/market/forex'
            },
            {
                navbarName: 'ETFs',
                subMenu: [],
                navLink: '/market/etf'
            },
            {
                navbarName: 'Mutual Funds',
                subMenu: [],
                navLink: '/market/mutual-funds'
            },
        ],
        navLink: '/markets'
    },
    {
        navbarName: 'Tool Section',
        subMenu: [],
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
        navLink: '/paid-tools'
    }
];

export const Navbar = () => {

    const [isMobileVersion, setMobileVerion] = useState(false);

    const handleMobileVersion = () => {
        setMobileVerion(!isMobileVersion)
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
                                <Link href={'/'}>
                                    <Image
                                        src={logoImage}
                                        alt="logo"
                                        width={130}
                                        height={70}
                                    />
                                </Link>
                            </div>
                            <div className="col-lg-6">
                                <div className="header-search-wrap">
                                    <form action="#" className="w-100">
                                        <input type="text" placeholder="Search here . . ." />
                                        <button type="submit">
                                            <i className="flaticon-search" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        <div className="col-lg-3">
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
                                                    <li key={subIndex}>
                                                        <Link href={subItem.navLink}>
                                                            {subItem.navbarName}
                                                        </Link>
                                                    </li>
                                                    ))}
                                                </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="logo d-none white-logo">
                                    <Link href={'/'}>
                                        <Image
                                            src={logoImage}
                                            alt="logo"
                                            width={100}
                                            height={70}
                                        />
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