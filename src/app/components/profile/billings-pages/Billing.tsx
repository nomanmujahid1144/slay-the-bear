// src/app/components/profile/billings-pages/Billing.tsx
'use client'

import { InvoiceHistory } from "./InvoiceHistory";

export const Billing = () => {
    return (
        <div className="profile-tab-content">

            {/* ── Section header ──────────────────────────────── */}
            <div className="profile-section">
                <div className="profile-section-header">
                    <span className="profile-section-icon">
                        <i className="fas fa-file-invoice-dollar" />
                    </span>
                    <div>
                        <h2 className="profile-section-title">Invoice History</h2>
                        <p className="profile-section-desc">All your past payments and receipts</p>
                    </div>
                </div>

                <InvoiceHistory />
            </div>

        </div>
    );
};