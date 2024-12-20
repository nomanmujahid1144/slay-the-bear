'use client'

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import logo from '../../../../public/assets/img/logo/logo.png';
import whiteLogo from '../../../../public/assets/img/logo/w_logo.png';

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

export const MobileVersion = ({ isMobileVersion, handleMobileVersion }) => {

  const [dropdowns, setDropdowns] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const toggleDropdown = (index) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const closeMobileVersion = () => {
    handleMobileVersion()
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
      <div className="mobile-menu-visible mobile-menu" style={{ transform: isMobileVersion ? 'translateX(0%)' : '' }}>
        <nav className="menu-box">
          <div className="close-btn" onClick={closeMobileVersion}>
            <i className="fas fa-times" />
          </div>
          <div className="nav-logo">
            <Link href="/" className="w-fit flex flex-col items-center justify-center">
              <Image src={logo} alt="Logo" layout="intrinsic" className=" w-auto h-auto" style={{ width: 'auto', height: 'auto' }} />
              <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
            </Link>
          </div>
          <div className="nav-logo d-none">
            <Link href="/" className="w-fit flex flex-col items-center justify-center">
              <Image src={whiteLogo} alt="Logo" layout="intrinsic" className=" w-auto h-auto" style={{ width: 'auto', height: 'auto' }}
              />
              <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
            </Link>
          </div>
          <div className="mobile-search">
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
          <div className="menu-outer">
            <ul className="navigation">
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