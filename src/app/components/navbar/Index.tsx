// src/app/components/navbar/Navbar.tsx

'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TrendingNews } from '../trending-news-slider/Index';
import { MobileVersion } from './MobileVersion';
import { SymbolSearchResults } from './SymbolSearchResults';
import { NavbarAuthSkeleton } from '@/app/components/skeletons';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSymbolSearch } from '@/app/hooks/useSymbolSearch';
import { menuItems } from './menuItems';
import { toast } from '@/utils/toast';
import logoImage from '../../../../public/assets/img/logo/logo.png';
import defaultProfileImage from '../../../../public/assets/img/default/defaultUserMaleTmp.png';
import { UserDropdown } from './UserDropdown';

export const Navbar = () => {
    const router = useRouter();
    const { user, isAuthenticated, isLoading, logout } = useAuthStore();
    const { suggestions, isSearching, handleSearch, clearSuggestions } = useSymbolSearch();

    const [isMobileVersion, setMobileVersion] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMobileVersion = () => setMobileVersion((prev) => !prev);
    const toggleDropdown = () => setIsMenuOpen((prev) => !prev);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
        } catch {
            // Error already handled by errorHandler
        } finally {
            setIsMenuOpen(false);
            router.push('/');
        }
    };

    return (
        <header className="header-style-six">
            <div id="header-fixed-height" />
            <TrendingNews />

            {/* Logo + Search + Auth */}
            <div className="header-logo-area-four">
                <div className="container">
                    <div className="row align-items-center">

                        {/* Logo */}
                        <div className="col-lg-3">
                            <Link href="/" className="w-fit flex flex-col items-center justify-center">
                                <Image src={logoImage} alt="Slay the Bear logo" width={80} height={70} />
                                <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="col-lg-6">
                            <div className="header-search-wrap">
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
                        </div>

                        {/* Auth */}
                        <div className="col-lg-3 flex justify-center">
                            {isLoading ? (
                                <NavbarAuthSkeleton />
                            ) : !isAuthenticated ? (
                                <div className="hl-right-side-four">
                                    <div className="subscribe-btn">
                                        <Link href="/login" className="btn btn-two">Sign In</Link>
                                    </div>
                                </div>
                            ) : (
                                <UserDropdown user={user!} onLogout={handleLogout} />
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* Desktop Nav */}
            <div id="sticky-header" className="menu-area menu-style-six">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-wrap">
                                <nav className="menu-nav justify-content-lg-center">
                                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                                        <ul className="navigation">
                                            {menuItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className={item.subMenu.length > 0 ? 'menu-item-has-children active' : ''}
                                                >
                                                    <Link href={item.navLink}>{item.navbarName}</Link>
                                                    {item.subMenu.length > 0 && (
                                                        <ul className="sub-menu">
                                                            {item.subMenu.map((subItem, subIndex) => (
                                                                <Fragment key={subIndex}>
                                                                    {subItem.subMenu && subItem.subMenu.length > 0 ? (
                                                                        <li className="menu-item-has-children active">
                                                                            <Link href={subItem.navLink}>
                                                                                {subItem.navbarName}
                                                                            </Link>
                                                                            <ul className="sub-menu">
                                                                                {subItem.subMenu.map((subSubItem, subSubIndex) => (
                                                                                    <li key={subSubIndex}>
                                                                                        <Link href={subSubItem.navLink}>
                                                                                            {subSubItem.navbarName}
                                                                                        </Link>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </li>
                                                                    ) : (
                                                                        <li>
                                                                            <Link href={subItem.navLink}>
                                                                                {subItem.navbarName}
                                                                            </Link>
                                                                        </li>
                                                                    )}
                                                                </Fragment>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="logo d-lg-none white-logo">
                                        <Link href="/" className="w-fit flex flex-col items-center justify-center">
                                            <Image src={logoImage} alt="logo" width={80} height={70} />
                                            <p className="font-bold text-[#29BFF0]">Slay the Bear</p>
                                        </Link>
                                    </div>
                                    <div className="mobile-nav-toggler" onClick={handleMobileVersion}>
                                        <i className="fas fa-bars" />
                                    </div>
                                </nav>
                            </div>
                            <MobileVersion
                                isMobileVersion={isMobileVersion}
                                handleMobileVersion={handleMobileVersion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};