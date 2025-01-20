import { stripe } from "@/utils/stripe";
import User from "@/models/user.model";
import Subscription from "@/models/subscription.model";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    const body = await req.text();

    const sig = req.headers.get('stripe-signature');
    let event;

    if (!sig) {
        return new Response("Invalid Signature", { status: 400 });
    }

    // Verify the event by using the signature (Sig)
    try {
        event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (error) {
        console.log('Webhook signature verification failed,', error.message);
        return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const data = event.data;
    const eventType = event.type;

    // Handle the event
    try {
        switch (eventType) {
            case "checkout.session.completed":
                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items', 'invoice']
                    }
                );
                const customerId = session.customer;
                const customerDetails = session.customer_details;
                const lineItems = session.line_items?.data || [];

                if (customerDetails?.email) {
                    const user = await User.findOne({ email: customerDetails?.email })

                    if (!user) {
                        throw new Error("User not found")
                    }

                    // It will check rather it's first time purchase or 2nd or many times
                    if (!user.customerId) {
                        user.customerId = customerId;
                        await user.save();
                    }


                    for (const item of lineItems) {
                        const priceId = item.price?.id;
                        const isSubscription = item.price?.type === 'recurring';

                        if (isSubscription) {
                            let endDate = new Date();
                            if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) {
                                endDate.setFullYear(endDate.getFullYear() + 1); // 1 Year from Now
                            } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID) {
                                endDate.setMonth(endDate.getMonth() + 1) // 1 Month from Now
                            } else {
                                throw new Error('Invalid PriceId')
                            }

                            console.log(session, 'session')

                            const subscriptionEntry = {
                                invoice_id: session.invoice.number, // Generate a user-friendly ID
                                amount: (item.price?.unit_amount || 0) / 100, // Convert cents to dollars
                                status: "Subscribed",
                                startDate: new Date(),
                                endDate: endDate,
                                viewURL: session.invoice.hosted_invoice_url,
                                downloadURL: session.invoice.invoice_pdf, // Example URL
                            };

                            // Update only the `subscriptionsList` using $push, leave the rest of the fields intact
                            await Subscription.findOneAndUpdate(
                                { userId: user.id }, // Search criteria
                                {
                                    $set: {
                                        plan: "premium",
                                        period: priceId === process.env.STRIPE_YEARLY_PRICE_ID ? "yearly" : "monthly",
                                        startDate: new Date(),
                                        endDate: endDate
                                    },
                                    $push: { subscriptionsList: subscriptionEntry }, // Append the new subscription to the subscriptions list
                                },
                                {
                                    new: true, // Return the updated document
                                    upsert: true, // Create a new document if it doesn't exist
                                }
                            )

                            // Update the user to change the plan to "premium"
                            await User.findOneAndUpdate(
                                { _id: user.id }, // Search criteria using _id
                                { plan: "premium" }, // Update plan field
                                { new: true } // Return the updated document
                            );


                        } else {
                            // one time purchase
                        }

                    }
                }
                break;

            case "customer.subscription.deleted": {
                // Retrieve the subscription object from Stripe
                const subscription = await stripe.subscriptions.retrieve(data.object.id);

                // Find the user associated with this subscription using customerId
                const user = await User.findOne({
                    customerId: subscription.customer
                });

                if (!user) {
                    console.error("User not found for the subscription deleted event.");
                    throw new Error("User not found for the subscription deleted event.");
                } else {
                    // Find the subscription document using userId (assuming userId exists in the Subscription model)
                    const subscriptionDoc = await Subscription.findOne({
                        userId: user._id
                    });

                    console.log(subscription, 'subscription')

                    // Retrieve the latest invoice associated with this subscription
                    const latestInvoice = await stripe.invoices.retrieve(subscription.latest_invoice);

                    console.log(latestInvoice, 'latestInvoice')
                    console.log(latestInvoice.lines.data[0].proration_details.credited_items.invoice, 'latestInvoice')

                    const deletedInvoiceId = latestInvoice.lines.data[0].proration_details.credited_items.invoice;

                    // Retrieve the latest invoice associated with this subscription
                    const deletedInvoice = await stripe.invoices.retrieve(deletedInvoiceId);

                    // The invoice ID for this canceled subscription
                    const canceledInvoiceId = deletedInvoice.number; // Use latest_invoice to get the associated invoice

                    // Find the matching subscription entry in the subscriptionsList using the invoice_id
                    const subscriptionEntry = subscriptionDoc.subscriptionsList.find(sub => sub.invoice_id === canceledInvoiceId);

                    if (subscriptionEntry) {
                        // Update the status of the subscription entry to 'canceled'
                        subscriptionDoc.plan = "free"
                        subscriptionEntry.status = 'Canceled';

                        await subscriptionDoc.save();
                        console.log(`Subscription with invoice ID ${canceledInvoiceId} has been updated to 'canceled'.`);
                    }

                    // Update the user's plan to 'free' (if applicable)
                    await User.findByIdAndUpdate(user._id, { plan: 'free' });
                    console.log(`User ${user._id} plan updated to free.`);
                }

                break;
            }
            // case "customer.subscription.updated": {
            //     // Retrieve the subscription object from Stripe
            //     const subscription = await stripe.subscriptions.retrieve(data.object.id);

            //     console.log(subscription, 'subscription')

            //     // Find the user associated with this subscription using customerId
            //     const user = await User.findOne({
            //         customerId: subscription.customer,
            //     });

            //     if (!user) {
            //         console.error("User not found for the subscription updated event.");
            //         throw new Error("User not found for the subscription updated event.");
            //     }

            //     // Find the subscription document using userId
            //     const subscriptionDoc = await Subscription.findOne({
            //         userId: user._id,
            //     });

            //     if (!subscriptionDoc) {
            //         console.error("Subscription document not found for the user.");
            //         throw new Error("Subscription document not found.");
            //     }

            //     // Retrieve the latest invoice associated with this subscription
            //     const latestInvoice = await stripe.invoices.retrieve(subscription.latest_invoice);
            //     const invoiceId = latestInvoice.number; // Use latest_invoice to get the associated invoice

            //     // Check the status of the subscription
            //     if (subscription.status === "canceled") {
            //         // Find the matching subscription entry in the subscriptionsList using the invoice_id
            //         const subscriptionEntry = subscriptionDoc.subscriptionsList.find(
            //             (sub) => sub.invoice_id === invoiceId
            //         );

            //         if (!subscriptionEntry) {
            //             console.error(`No subscription entry found for invoice ID: ${invoiceId}`);
            //             throw new Error(`No subscription entry found for invoice ID: ${invoiceId}`);
            //         }

            //         // Handle subscription cancellation
            //         subscriptionDoc.plan = "free"; // Downgrade plan to 'free'
            //         subscriptionEntry.status = "Canceled"; // Update the status of the subscription entry

            //         await subscriptionDoc.save();
            //         console.log(`Subscription with invoice ID ${invoiceId} has been canceled.`);

            //         // Update the user's plan to 'free'
            //         await User.findByIdAndUpdate(user._id, { plan: "free" });
            //         console.log(`User ${user._id} plan updated to free.`);
            //     } else if (subscription.status === "active") {

            //         const priceId = subscription.items.data[0].price.id;

            //         let endDate = new Date();
            //         if (priceId === process.env.STRIPE_YEARLY_PRICE_ID) {
            //             endDate.setFullYear(endDate.getFullYear() + 1); // 1 Year from Now
            //         } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID) {
            //             endDate.setMonth(endDate.getMonth() + 1) // 1 Month from Now
            //         } else {
            //             throw new Error('Invalid PriceId')
            //         }

            //         const subscriptionEntry = {
            //             invoice_id: invoiceId, // Generate a user-friendly ID
            //             amount: (latestInvoice.total) / 100, // Convert cents to dollars
            //             status: "Subscribed",
            //             startDate: new Date(),
            //             endDate: endDate,
            //             viewURL: latestInvoice.hosted_invoice_url,
            //             downloadURL: latestInvoice.invoice_pdf, // Example URL
            //         };

            //         // Update only the `subscriptionsList` using $push, leave the rest of the fields intact
            //         await Subscription.findOneAndUpdate(
            //             { userId: user.id }, // Search criteria
            //             {
            //                 $set: {
            //                     plan: "premium",
            //                     period: priceId === process.env.STRIPE_YEARLY_PRICE_ID ? "yearly" : "monthly",
            //                     startDate: new Date(),
            //                     endDate: endDate
            //                 },
            //                 $push: { subscriptionsList: subscriptionEntry }, // Append the new subscription to the subscriptions list
            //             },
            //             {
            //                 new: true, // Return the updated document
            //                 upsert: true, // Create a new document if it doesn't exist
            //             }
            //         )

            //         // Update the user to change the plan to "premium"
            //         await User.findOneAndUpdate(
            //             { _id: user.id }, // Search criteria using _id
            //             { plan: "premium" }, // Update plan field
            //             { new: true } // Return the updated document
            //         );

            //         console.log(`User ${user._id} plan updated to premium.`);
            //     } else {
            //         console.log(`Unhandled subscription status: ${subscription.status}`);
            //     }

            //     break;
            // }


            default:
                console.log(`Invalid event Type ${event.type}`);
        }
    } catch (error) {
        console.log("Error handling event", error);
        return new Response("Webook Error", { status: 400 })
    }


    // For cancle recurring payments
    // const subscription = await stripe.subscriptions.update(subscriptionId, {
    //     cancel_at_period_end: true, // Stops recurring payments
    // });


    return new Response("Webook received", { status: 200 })

}