// src/app/components/profile/billings-pages/Billing.tsx
'use client'

import { InvoiceHistory } from "./InvoiceHistory";

export const Billing = () => {
    return (
        <div className="stg-wrap">

            {/* ── Page intro ───────────────────────────────────── */}
            <div className="stg-page-head">
                <h1 className="stg-page-title">Billing</h1>
                <p className="stg-page-sub">Your payment history and receipts</p>
            </div>

            {/* ── Invoice History ──────────────────────────────── */}
            <div className="stg-card">
                <div className="stg-card-head">
                    <div className="stg-card-icon">
                        <i className="fas fa-file-invoice-dollar" />
                    </div>
                    <div>
                        <h2 className="stg-card-title">Invoice History</h2>
                        <p className="stg-card-desc">All your past payments and receipts</p>
                    </div>
                </div>

                <div className="stg-card-body">
                    <InvoiceHistory />
                </div>
            </div>

        </div>
    );
};