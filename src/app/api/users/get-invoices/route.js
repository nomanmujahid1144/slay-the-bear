import { connect } from "@/dbConfig/dbConfig";
import { stripe } from "@/utils/stripe";
import { NextResponse } from "next/server";


connect();

export async function POST(request) {
    try {

        const { customerId } = await request.json();

        console.log(customerId, 'customerId')

        // Retrieve all invoices for the given customer
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId, // Filter by customer ID,
            status: 'all',
        });

        if (subscriptions.data.length === 0) {
            return NextResponse.json({
                message: 'No invoices found for the specified customer.',
                success: false
            }, { status: 400 });
        }

        // Map invoices to include their download links and determine if it's monthly or yearly
        const subscriptionData = subscriptions.data.map((subscription) => {
            // Convert Unix timestamps to Date objects


            console.log(subscription, 'subscription')

            const periodStart = new Date(subscription.current_period_start * 1000);  // Unix timestamp to Date
            const periodEnd = new Date(subscription.current_period_end * 1000);      // Unix timestamp to Date

            // Calculate the difference in months
            const diffInMonths = (periodEnd.getFullYear() - periodStart.getFullYear()) * 12 + (periodEnd.getMonth() - periodStart.getMonth());

            // Determine if the invoice is monthly or yearly
            const subscriptionType = diffInMonths === 1 ? 'monthly' : diffInMonths === 12 ? 'yearly' : 'unknown';

            return {
                id: subscription.id,
                amount_due: subscription.plan?.amount,
                status: subscription.status,
                subscription: subscription.plan.interval,
                period_start: periodStart.toISOString(),  // Convert to string for better formatting
                period_end: periodEnd.toISOString(),      // Convert to string for better formatting
                download_link: '',       // Link to download the invoice
            };
        });

        console.log(subscriptionData, 'subscriptionData')

        return NextResponse.json({
            success: true,
            data: subscriptionData.length > 0 ? subscriptionData : [],
        }, { status: 200 });

    } catch (error) {
        console.log(error.message, 'error.message')
        return NextResponse.json({
            message: 'An error occurred while retrieving invoices.',
            success: false
        }, { status: 500 })
    }
}