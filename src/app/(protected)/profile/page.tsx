// src/app/(protected)/profile/page.tsx
'use client'

import { useState } from "react";
import { Accounts } from "../../components/profile/Accounts";
import { Billing } from "../../components/profile/billings-pages/Billing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TabId = 'accounts' | 'billings';

interface Tab {
    id: TabId;
    label: string;
    icon: string;
}

const tabs: Tab[] = [
    { id: 'accounts', label: 'Account', icon: 'user'        },
    { id: 'billings', label: 'Billing', icon: 'credit-card' },
];

export default function Profile() {
    const [activeTab, setActiveTab] = useState<TabId>('accounts');

    return (
        <div className="profile-page-wrap blog-details-inner-content">

            {/* ── Page title ──────────────────────────────── */}
            <div className="profile-page-header">
                <h1 className="title-two profile-page-title">Settings</h1>
            </div>

            <div className="profile-page-body">

                {/* ── Sidebar nav ─────────────────────────── */}
                <aside className="profile-sidebar">
                    <ul className="profile-nav-list">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`profile-nav-item ${activeTab === tab.id ? 'profile-nav-item--active' : ''}`}
                                >
                                    <FontAwesomeIcon
                                        icon={['fas', tab.icon as any]}
                                        className="profile-nav-icon"
                                        fixedWidth
                                    />
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* ── Content panel ───────────────────────── */}
                <main className="profile-content contact-form">
                    {activeTab === 'accounts' && <Accounts />}
                    {activeTab === 'billings' && <Billing />}
                </main>

            </div>
        </div>
    );
}