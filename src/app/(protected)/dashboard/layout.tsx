'use client'

// src/app/(protected)/dashboard/layout.tsx
// Dashboard Layout — persistent sidebar for all dashboard routes
// All pages under /dashboard will have this sidebar

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DashboardIcon, LearnIcon, MrFinleyIcon } from '../../components/icons';

// ── Nav item types ─────────────────────────────────────────────────────────────
interface NavItem {
    id:      string;
    label:   string;
    href:    string;
    section: 'main' | 'settings';
}

const NAV_ITEMS: NavItem[] = [
    // Main section
    { id: 'dashboard', label: 'Dashboard',  href: '/dashboard',           section: 'main'     },
    { id: 'learn',     label: 'Learn',      href: '/dashboard/learn',     section: 'main'     },
    { id: 'mrfinley',  label: 'Mr. Finley', href: '/dashboard/mrfinley',  section: 'main'     },
    // Settings section
    { id: 'account',   label: 'Account',    href: '/dashboard/account',   section: 'settings' },
    { id: 'billing',   label: 'Billing',    href: '/dashboard/billing',   section: 'settings' },
];

// ── Icon helper ───────────────────────────────────────────────────────────────
function NavIcon({ id, className }: { id: string; className?: string }) {
    switch (id) {
        case 'dashboard': return <DashboardIcon size={18} className={className} />;
        case 'learn':     return <LearnIcon     size={18} className={className} />;
        case 'mrfinley':  return <MrFinleyIcon  size={18} className={className} />;
        case 'account':   return <FontAwesomeIcon icon={['fas', 'user']}        fixedWidth className={className} />;
        case 'billing':   return <FontAwesomeIcon icon={['fas', 'credit-card']} fixedWidth className={className} />;
        default:          return null;
    }
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const pathname = usePathname();

    const mainTabs     = NAV_ITEMS.filter((t) => t.section === 'main');
    const settingsTabs = NAV_ITEMS.filter((t) => t.section === 'settings');

    // Active check — lesson page should keep Learn active
    const isActive = (item: NavItem) => {
        if (item.href === '/dashboard') return pathname === '/dashboard';
        return pathname.startsWith(item.href);
    };

    return (
        <div className="db-wrap">

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className={`db-sidebar ${sidebarCollapsed ? 'db-sidebar--collapsed' : ''}`}>

                {/* Collapse toggle */}
                <button
                    className="db-sidebar-toggle"
                    onClick={() => setSidebarCollapsed((p) => !p)}
                    aria-label="Toggle sidebar"
                >
                    <FontAwesomeIcon
                        icon={['fas', sidebarCollapsed ? 'chevron-right' : 'chevron-left']}
                        size="xs"
                    />
                </button>

                {/* Main nav */}
                <nav className="db-sidebar-nav">
                    <ul className="db-nav-list">
                        {mainTabs.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className={`db-nav-item ${isActive(item) ? 'db-nav-item--active' : ''}`}
                                    title={sidebarCollapsed ? item.label : undefined}
                                >
                                    <NavIcon id={item.id} className="db-nav-icon" />
                                    {!sidebarCollapsed && (
                                        <span className="db-nav-label">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Settings divider */}
                    {!sidebarCollapsed && (
                        <p className="db-nav-section-label">Settings</p>
                    )}
                    {sidebarCollapsed && <div className="db-nav-divider" />}

                    <ul className="db-nav-list">
                        {settingsTabs.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    className={`db-nav-item ${isActive(item) ? 'db-nav-item--active' : ''}`}
                                    title={sidebarCollapsed ? item.label : undefined}
                                >
                                    <NavIcon id={item.id} className="db-nav-icon" />
                                    {!sidebarCollapsed && (
                                        <span className="db-nav-label">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

            </aside>

            {/* ── Main area ────────────────────────────────────────────── */}
            <div className="db-main">
                <main className="db-content">
                    {children}
                </main>
            </div>

        </div>
    );
}