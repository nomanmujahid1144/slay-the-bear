// src/app/components/profile/billings-pages/InvoiceHistory.tsx
'use client'

import { useEffect, useState } from "react";
import { TgTable, type TgTableColumn } from "@/app/components/table/TgTable";
import { TgTableSkeleton } from "@/app/components/skeletons/tables/TableSkeleton";
import { userService } from "@/services/user.service";
import type { UserBillingEntry } from "@/types";
import Link from "next/link";

const fmt = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const COLUMNS: TgTableColumn<UserBillingEntry>[] = [
    {
        key: 'invoiceId',
        label: 'Invoice ID',
        render: (row) => (
            <span className="stg-invoice-id">{row.invoiceId}</span>
        ),
    },
    {
        key: 'amount',
        label: 'Amount',
        render: (row) => (
            <span className="stg-invoice-amount">${Number(row.amount).toFixed(2)}</span>
        ),
    },
    {
        key: 'status',
        label: 'Status',
        render: (row) => {
            const isActive = row.status === 'Subscribed' || row.status === 'Renewal';
            return (
                <span className={`stg-invoice-status ${isActive ? 'stg-invoice-status--active' : 'stg-invoice-status--canceled'}`}>
                    <i className={`fas ${isActive ? 'fa-circle-check' : 'fa-circle-xmark'}`} />
                    {row.status}
                </span>
            );
        },
    },
    {
        key: 'startDate',
        label: 'Start Date',
        render: (row) => <span>{fmt(row.startDate)}</span>,
    },
    {
        key: 'endDate',
        label: 'End Date',
        render: (row) => <span>{row.endDate ? fmt(row.endDate) : '—'}</span>,
    },
    {
        key: 'actions',
        label: 'Actions',
        align: 'right',
        render: (row) => (
            <div className="stg-invoice-actions">
                {row.viewURL && (
                    <Link
                        href={row.viewURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stg-invoice-btn"
                        title="View Invoice"
                    >
                        <i className="fas fa-eye" />
                    </Link>
                )}
                {row.downloadURL && (
                    <Link
                        href={row.downloadURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stg-invoice-btn"
                        title="Download PDF"
                    >
                        <i className="fas fa-download" />
                    </Link>
                )}
                {!row.viewURL && !row.downloadURL && (
                    <span className="stg-invoice-no-action">—</span>
                )}
            </div>
        ),
    },
];

export const InvoiceHistory = () => {
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState<UserBillingEntry[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await userService.getBilling();
                setInvoices(data.data || []);
            } catch {
                setInvoices([]);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    // Derived — summary stats over all invoices
    const totalSpent = invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);

    if (loading) {
        return <TgTableSkeleton rows={4} cols={6} />;
    }

    return (
        <>
            {/* ── Summary stats ────────────────────────────────── */}
            {invoices.length > 0 && (
                <div className="stg-invoice-stats">
                    <div className="stg-invoice-stat">
                        <span className="stg-invoice-stat-label">Total Invoices</span>
                        <span className="stg-invoice-stat-value">{invoices.length}</span>
                    </div>
                    <div className="stg-invoice-stat">
                        <span className="stg-invoice-stat-label">Total Spent</span>
                        <span className="stg-invoice-stat-value">${totalSpent.toFixed(2)}</span>
                    </div>
                    <div className="stg-invoice-stat">
                        <span className="stg-invoice-stat-label">Last Payment</span>
                        <span className="stg-invoice-stat-value">{fmt(invoices[0].startDate)}</span>
                    </div>
                </div>
            )}

            {/* ── Table ────────────────────────────────────────── */}
            <div className="stg-invoice-table-wrap">
                <TgTable
                    columns={COLUMNS}
                    rows={invoices}
                    keyExtractor={(row) => row.id}
                    emptyText="No invoices yet. Your payment history will appear here."
                />
            </div>
        </>
    );
};