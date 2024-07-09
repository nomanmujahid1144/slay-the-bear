'use client'

import { useState } from "react";
import Link from "next/link";

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
      navLink: '/home'
    },
    {
      navbarName: 'Tool Section',
      subMenu: [],
      navLink: '/tool-section'
    },
    {
      navbarName: 'News Page',
      subMenu: [],
      navLink: '/news-page'
    },
    {
      navbarName: 'Paid Tools',
      subMenu: [],
      navLink: '/paid-tools'
    },
    {
      navbarName: 'Ads Free Version',
      subMenu: [],
      navLink: '/ads-free'
    },
  ];

export const MobileVersion = ({isMobileVersion, handleMobileVersion}) => {

    const [dropdowns, setDropdowns] = useState({});

    const toggleDropdown = (index) => {
      setDropdowns((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    };

    const closeMobileVersion = () => {
        handleMobileVersion()   
    }

    return (
        <>
            <div className="mobile-menu-visible mobile-menu" style={{ transform: isMobileVersion ? 'translateX(0%)' : '' }}>
                <nav className="menu-box">
                    <div className="close-btn" onClick={closeMobileVersion}>
                        <i className="fas fa-times" />
                    </div>
                    <div className="nav-logo">
                        <a href="index.html">
                        <img src="assets/img/logo/logo.png" alt="Logo" />
                        </a>
                    </div>
                    <div className="nav-logo d-none">
                        <a href="index.html">
                        <img src="assets/img/logo/w_logo.png" alt="Logo" />
                        </a>
                    </div>
                    <div className="mobile-search">
                        <form action="#">
                        <input type="text" placeholder="Search here..." />
                        <button>
                            <i className="flaticon-search" />
                        </button>
                        </form>
                    </div>
                    <div className="menu-outer">
                        <ul class="navigation">
                            {menuItems.map((item, index) => (
                                <li key={index} className={`${item.subMenu.length > 0 ? 'menu-item-has-children' : ''} ${dropdowns[index] ? 'active' : ''}`}>
                                <Link href={item.navLink}>
                                    {item.navbarName}
                                </Link>
                                {item.subMenu.length > 0 && (
                                    <>
                                        <ul className="sub-menu" style={{ display: dropdowns[index] ? 'block' : 'none' }}>
                                            {item.subMenu.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link href={subItem.navLink}>
                                                    {subItem.navbarName}
                                                </Link>
                                            </li>
                                            ))}
                                        </ul>
                                        <div className="dropdown-btn" onClick={() => toggleDropdown(index)}>
                                            <span className="fas fa-angle-down"></span>
                                        </div>
                                    </>
                                )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className="social-links">
                        <ul className="clearfix list-wrap">
                        <li>
                            <a href="#">
                            <i className="fab fa-facebook-f" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <i className="fab fa-twitter" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <i className="fab fa-instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <i className="fab fa-linkedin-in" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                            <i className="fab fa-youtube" />
                            </a>
                        </li>
                        </ul>
                    </div> */}
                </nav>
            </div>
            <div className="menu-backdrop" />
        </>
    )
}