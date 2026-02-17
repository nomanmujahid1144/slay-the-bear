// src/app/components/profile/billings-pages/Billing.js - UPDATE

'use client'

import { useState } from "react";
import { Goto } from "../../Buttons/Goto";
import { InvoiceHistory } from "./InvoiceHistory";
import { stripeService } from "@/services/stripe.service";
import toast from "react-hot-toast";

export const Billing = () => {
    const [loading, setLoading] = useState(false);

    const handleCustomerPortal = async () => {
        setLoading(true);
        try {
            const { data } = await stripeService.getCustomerPortal();
            window.location.href = data.data.url;
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="pt-4">
                <div className="flex justify-between">
                    <h1 className="py-2 text-2xl font-semibold">Billings</h1>
                    <div className="w-auto">
                        <button
                            onClick={handleCustomerPortal}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Billing Dashboard'}
                        </button>
                    </div>
                </div>
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Invoice History</p>
            <InvoiceHistory />
        </>
    );
};