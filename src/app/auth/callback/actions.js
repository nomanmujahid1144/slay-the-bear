'use server'

import { stripe } from "@/utils/stripe"

export async function createCheckoutSessionAction({ user, getStripePaymentLinkAccordingToPeriod }) {

    // To grab the customerId
    let customer;

    if (!user) throw new Error('Unauthorized! You must be logged in to subscribe.')

    if (user.customerId) {
        customer = user.customerId
    } else {
        const newCustomer = await stripe.customers.create({
            email: user.email,
            name: user.firstName
        });
        customer = newCustomer.id;
    }

    const priceId =
        getStripePaymentLinkAccordingToPeriod === 'monthly'
            ? process.env.STRIPE_MONTHLY_PRICE_ID // Replace with your actual price ID for monthly
            : process.env.STRIPE_YEARLY_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        metadata: {
            customerId: customer
        },
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
        customer: customer,
        // Link expires after 30 mins
        expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
    })

    return { url: session.url }
}