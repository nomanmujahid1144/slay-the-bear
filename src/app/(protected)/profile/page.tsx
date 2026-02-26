// src/app/(protected)/profile/page.tsx

'use client'

import { useState } from "react";
import { Accounts } from "../../components/profile/Accounts";
import { Billing } from "../../components/profile/billings-pages/Billing";

type TabId = 'accounts' | 'billings';

interface Tab {
    id: TabId;
    label: string;
}

const tabs: Tab[] = [
    { id: 'accounts', label: 'Accounts' },
    { id: 'billings', label: 'Billings' },
];

const TabContent = ({ activeTab }: { activeTab: TabId }) => {
    switch (activeTab) {
        case 'accounts':
            return <Accounts />;
        case 'billings':
            return <Billing />;
        default:
            return (
                <div>
                    <h1 className="py-2 text-2xl font-semibold">Profile Settings</h1>
                    <p className="text-gray-600">Edit your profile information and preferences.</p>
                </div>
            );
    }
};

export default function Profile() {
    const [activeTab, setActiveTab] = useState<TabId>('accounts');

    return (
        <div className="mx-4 min-h-screen blog-details-inner-content max-w-screen-xl sm:mx-8 xl:mx-auto">
            <h1 className="title-two font-bold !text-4xl border-b py-6">Settings</h1>
            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                <div className="relative my-4 w-56 sm:hidden">
                    <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
                    <label
                        htmlFor="select-1"
                        className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
                    >
                        Accounts
                    </label>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
                    </ul>
                </div>
                <div className="col-span-2 hidden sm:block">
                    <ul>
                        {tabs.map((tab) => (
                            <li
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`mt-5 cursor-pointer border-l-2 border-l-primary px-2 py-2 !text-primary font-semibold transition ${
                                    activeTab === tab.id ? 'border-l-secondary !text-secondary font-semibold' : ''
                                } hover:border-l-secondary hover:text-secondary`}
                            >
                                {tab.label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-8 overflow-hidden rounded-xl contact-area sm:px-8 sm:shadow pb-10">
                    <TabContent activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}