// src/app/components/navbar/UserDropdown.tsx

'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { UserProfile } from '@/types/user/user.types';
import defaultProfileImage from '../../../../public/assets/img/default/defaultUserMaleTmp.png';

interface UserDropdownProps {
    user: UserProfile;
    onLogout: () => void;
}

const MENU_ITEMS = [
    { label: 'Profile',      href: '/profile', icon: 'user'        },
    { label: 'Billing',      href: '/profile', icon: 'credit-card' },
    { label: 'Subscription', href: '/pricing', icon: 'crown'       },
] as const;

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const close = () => setIsOpen(false);
    const isPremium = user.plan === 'premium';

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>

            {/* Trigger */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="user-dropdown-trigger"
            >
                <Image
                    className="user-dropdown-avatar"
                    src={user.picture || defaultProfileImage}
                    alt={`${user.firstName} ${user.lastName}`}
                />
                <span className="user-dropdown-name profile-name">
                    {user.firstName}
                </span>
                <FontAwesomeIcon
                    size="xs"
                    icon={['fas', 'chevron-down']}
                    className={`user-dropdown-chevron ${isOpen ? 'open' : ''}`}
                />
            </button>

            {/* Dropdown panel */}
            {isOpen && (
                <div className="user-dropdown-panel toggle-drop-down">

                    {/* User info header */}
                    <div className="user-dropdown-header">
                        <div className="user-dropdown-header-inner">
                            <Image
                                className="user-dropdown-header-avatar"
                                src={user.picture || defaultProfileImage}
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                            <div className="user-dropdown-header-info">
                                <p className="user-dropdown-fullname">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="user-dropdown-email">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Plan badge */}
                        <span className={`user-dropdown-badge ${isPremium ? 'premium' : 'free'}`}>
                            <FontAwesomeIcon
                                icon={['fas', isPremium ? 'crown' : 'user']}
                                size="xs"
                            />
                            {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                        </span>
                    </div>

                    {/* Menu items */}
                    <ul className="user-dropdown-menu">
                        {MENU_ITEMS.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    onClick={close}
                                    className="user-dropdown-item"
                                >
                                    <FontAwesomeIcon
                                        icon={['fas', item.icon]}
                                        className="user-dropdown-item-icon"
                                        fixedWidth
                                    />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Sign out */}
                    <div className="user-dropdown-footer">
                        <button
                            onClick={() => { onLogout(); close(); }}
                            className="user-dropdown-signout"
                        >
                            <FontAwesomeIcon
                                icon={['fas', 'arrow-right-from-bracket']}
                                className="user-dropdown-item-icon"
                                fixedWidth
                            />
                            Sign out
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}