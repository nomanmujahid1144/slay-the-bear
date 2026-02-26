'use client'

import { useEffect, useState } from "react";
import { LoaderCircleIcon } from "../../loader/LoadingCircle";
import { userService } from "@/services/user.service";
import type { ChangeEvent } from "react";
import type { UserBillingEntry } from "@/types";

const tabHeaders = ["ID", "Amount", "Status", "Start Date", "End Date", "Actions"];

export const InvoiceHistory = () => {
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState<UserBillingEntry[]>([]);

    const getBillingData = async () => {
        setLoading(true);
        try {
            const { data } = await userService.getBilling();
            setInvoices(data.data || []);
        } catch {
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBillingData();
    }, []);

    const handleInvoiceAction = (e: ChangeEvent<HTMLSelectElement>, invoice: UserBillingEntry) => {
        const action = e.target.value;
        if (action === "view" && invoice.viewURL) {
            window.open(invoice.viewURL, "_blank");
        } else if (action === "download" && invoice.downloadURL) {
            window.open(invoice.downloadURL, "_blank");
        }
    };

    return (
        <section>
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        {tabHeaders.map((tab, index) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                            >
                                                {tab}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="py-10">
                                                <LoaderCircleIcon />
                                            </td>
                                        </tr>
                                    ) : invoices.length > 0 ? (
                                        invoices.map((invoice, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>{invoice.invoiceId}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    ${invoice.amount}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 dark:bg-gray-800 ${invoice.status === 'Subscribed' ? 'text-emerald-500 bg-emerald-100/60' : 'text-red-500 bg-red-100/60'}`}>
                                                        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <h2 className="text-sm font-normal">{invoice.status}</h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    {new Date(invoice.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    {new Date(invoice.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <select
                                                            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                                                            onChange={(e) => handleInvoiceAction(e, invoice)}
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled>Select Action</option>
                                                            <option value="view">View</option>
                                                            <option value="download">Download</option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="py-10">
                                                <div className="w-full flex justify-center">No Invoice Found</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};