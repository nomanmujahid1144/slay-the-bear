// src/app/components/navbar/MobileVersion.tsx

'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/assets/img/logo/logo.png';
import { menuItems } from './menuItems';
import { SymbolSearchResults } from './SymbolSearchResults';
import { useSymbolSearch } from '@/app/hooks/useSymbolSearch';

interface MobileVersionProps {
    isMobileVersion: boolean;
    handleMobileVersion: () => void;
}

export const MobileVersion = ({ isMobileVersion, handleMobileVersion }: MobileVersionProps) => {
    const [dropdowns, setDropdowns] = useState<Record<number, boolean>>({});
    const { suggestions, isSearching, handleSearch, clearSuggestions } = useSymbolSearch();

    const toggleDropdown = (index: number) => {
        setDropdowns((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <>
            <div
                className="mobile-menu-visible mobile-menu"
                style={{ transform: isMobileVersion ? 'translateX(0%)' : '' }}
            >
                <nav className="menu-box">
                    <div className="close-btn" onClick={handleMobileVersion}>
                        <i className="fas fa-times" />
                    </div>
                    <div className="nav-logo">
                        <Link href="/" className="w-fit flex flex-col items-center justify-center">
                            <Image src={logo} alt="Logo" width={65} height={70} className="w-auto h-auto" />
                            <p className="font-bold !text-primary">Slay the Bear</p>
                        </Link>
                    </div>
                    <div className="mobile-search">
                        <form action="#" className="relative w-100">
                            <input
                                type="text"
                                onChange={handleSearch}
                                onBlur={() => setTimeout(clearSuggestions, 200)}
                                placeholder="Search symbols . . ."
                            />
                            <button type="submit">
                                <i className="flaticon-search" />
                            </button>
                            <SymbolSearchResults
                                suggestions={suggestions}
                                isSearching={isSearching}
                                onSelect={clearSuggestions}
                            />
                        </form>
                    </div>
                    <div className="menu-outer">
                        <ul className="navigation">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`${item.subMenu.length > 0 ? 'menu-item-has-children' : ''} ${dropdowns[index] ? 'active' : ''}`}
                                >
                                    <Link href={item.navLink}>{item.navbarName}</Link>
                                    {item.subMenu.length > 0 && (
                                        <>
                                            <ul
                                                className="sub-menu"
                                                style={{ display: dropdowns[index] ? 'block' : 'none' }}
                                            >
                                                {item.subMenu.map((subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link href={subItem.navLink}>
                                                            {subItem.navbarName}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div
                                                className="dropdown-btn"
                                                onClick={() => toggleDropdown(index)}
                                            >
                                                <span className="fas fa-angle-down" />
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="menu-backdrop" />
        </>
    );
};