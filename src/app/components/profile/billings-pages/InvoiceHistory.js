'use client'

import axiosInstance from "@/app/utils/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoaderCircleIcon } from "../../Loader/LoadingCircle";
import SelectionBox from "../../fields/Select";

const tabHeaders = [
    "ID",
    "Amount",
    "Status",
    "Start Date",
    "End Date",
    "Actions",
];

export const InvoiceHistory = () => {

    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState([]);

    const getBillingDate = async () => {
        setLoading(true)
        const response = await axiosInstance.get('/api/users/get-user-billing-detail');
        if (response.data.success) {
            setInterval(() => {
                setLoading(false)
                setInvoices(response.data.data)
            }, 500)
        } else {
            setLoading(false)
            setInvoices([])
        }

    }


    useEffect(() => {
        getBillingDate();
    }, [params])


    return (
        <>
            <section className="">
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
                                        {loading ?
                                            <tr>
                                                <td colSpan={6} className="py-10">
                                                    <LoaderCircleIcon />
                                                </td>
                                            </tr>
                                            : (<>
                                                {invoices.length > 0 ? <>
                                                    {invoices?.map((invoice, index) => (
                                                        <tr key={index}>
                                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                                <div className="inline-flex items-center gap-x-3">
                                                                    <span>{invoice?.invoice_id}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                ${invoice?.amount}
                                                            </td>
                                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 dark:bg-gray-800 ${invoice.status === 'Subscribed' ? 'text-emerald-500 bg-emerald-100/60' : 'text-red-500 bg-red-100/60'}`}>
                                                                    <svg
                                                                        width={12}
                                                                        height={12}
                                                                        viewBox="0 0 12 12"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M10 3L4.5 8.5L2 6"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                    <h2 className="text-sm font-normal">{invoice?.status}</h2>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                {new Date(invoice.startDate).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                                {new Date(invoice.endDate).toLocaleDateString("en-US", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </td>
                                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                <div className="flex items-center gap-x-6">
                                                                    <select
                                                                        className="px-1 py-2 rounded-md border !border-primary focus:outline-none focus:ring-2 focus:!ring-primary"
                                                                        onChange={(e) => {
                                                                            const action = e.target.value;
                                                                            if (action === "view") {
                                                                                window.open(invoice.viewURL, "_blank");
                                                                            } else if (action === "download") {
                                                                                window.open(invoice.downloadURL, "_blank");
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value="" disabled selected>
                                                                            Select Action
                                                                        </option>
                                                                        <option value="view">View</option>
                                                                        <option value="download">Download</option>
                                                                    </select>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </> : (
                                                    <tr>
                                                        <td colSpan={6} className="py-10">
                                                            <div className="w-full flex justify-center">No Invoice Found</div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex items-center justify-between mt-6">
                    <a
                        href="#"
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span>previous</span>
                    </a>
                    <div className="items-center hidden md:flex gap-x-3">
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            3
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            ...
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            12
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            13
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                        >
                            14
                        </a>
                    </div>
                    <a
                        href="#"
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <span>Next</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </a>
                </div> */}
            </section>
        </>

    )
}