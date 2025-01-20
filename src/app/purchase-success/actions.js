'use server'

import { stripe } from "@/utils/stripe";
import { NextResponse } from "next/server";

export async function getSessionSubscriptoinDetails({ session_id }) {
    const sessionId = session_id;

    console.log('Session Id')
    if (!sessionId) {
        return {
            data: null,
            message: 'Session ID is required.',
            success: false
        }
    }

    try {
        // Fetch session details
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Fetch subscription details
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
    
        const latestInvoice = await stripe.invoices.retrieve(subscription.latest_invoice)

        const responseObj = {
            invoiceId: latestInvoice.number,
            amount: subscription.plan.amount / 100,
            period: subscription.plan.interval,
            startDate: subscription.start_date * 1000,
            endDate: subscription.current_period_end * 1000,
        }

        return {
            data: responseObj,
            success: true
        }

    } catch (error) {
        return {
            data:null,
            message: error.message,
            success: false
        }
    }
}
