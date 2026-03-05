// src/app/components/profile/billings-pages/InvoiceHistory.tsx
'use client'

import { useEffect, useState } from "react";
import { TgTable, type TgTableColumn } from "@/app/components/table/TgTable";
import { TgTableSkeleton } from "@/app/components/skeletons/tables/TableSkeleton";
import { userService } from "@/services/user.service";
import type { UserBillingEntry } from "@/types";

const fmt = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const COLUMNS: TgTableColumn<UserBillingEntry>[] = [
    {
        key: 'invoiceId',
        label: 'Invoice ID',
        render: (row) => (
            <span className="tg-cell-value">{row.invoiceId}</span>
        ),
    },
    {
        key: 'amount',
        label: 'Amount',
        render: (row) => (
            <span className="tg-cell-value">${Number(row.amount).toFixed(2)}</span>
        ),
    },
    {
        key: 'status',
        label: 'Status',
        render: (row) => {
            const isActive = row.status === 'Subscribed' || row.status === 'Renewal';
            return (
                <span className={`profile-invoice-status ${isActive ? 'profile-invoice-status--active' : 'profile-invoice-status--canceled'}`}>
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
            <div className="profile-invoice-actions">
                {row.viewURL && (
                    <a
                        href={row.viewURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-invoice-btn"
                        title="View Invoice"
                    >
                        <i className="fas fa-eye" />
                    </a>
                )}
                {row.downloadURL && (
                    <a
                        href={row.downloadURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-invoice-btn"
                        title="Download PDF"
                    >
                        <i className="fas fa-download" />
                    </a>
                )}
                {!row.viewURL && !row.downloadURL && (
                    <span className="profile-invoice-no-action">—</span>
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

    if (loading) {
        return <TgTableSkeleton rows={4} cols={6} />;
    }

    return (
        <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <TgTable
                columns={COLUMNS}
                rows={invoices}
                keyExtractor={(row) => row.id}
                emptyText="No invoices yet. Your payment history will appear here."
            />
        </div>
    );
};