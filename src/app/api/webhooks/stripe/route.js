import { stripe } from "@/utils/stripe";
import User from "@/models/user.model";
import Subscription from "@/models/subscription.model";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    const body = await req.text();

    const sig = req.headers.get('stripe-signature');
    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);

    } catch (error) {
        console.log('Webhook signature verification failed,', error.message);
        return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }

    // Handle the event
    try {
        switch (event.type) {
            case "checkout.session.completed": 
                const session = await stripe.checkout.sessions.retrieve(
                    event.data.object.id,
                    {
                        expand: ['line_items']
                    }
                );
                const customerId = session.customer;
                const customer_details = session.customer_details;

                if (customer_details?.email) {
                    const user = await User.findOne({ email: customer_details?.email })

                    if (!user) {
                        throw new Error("User not found")
                    }

                    if (!user.customerId) {
                        user.customerId = customerId;
                        await user.save();
                    }

                    const lineItems = session.line_items?.data || [];

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

                            await Subscription.findOneAndUpdate(
                                { userId: user.id }, // Search criteria
                                {
                                    // Update or create fields
                                    userId: user.id,
                                    startDate: new Date(),
                                    endDate: endDate,
                                    plan: "premium",
                                    period: priceId === process.env.STRIPE_YEARLY_PRICE_ID ? "yearly" : "monthly",
                                },
                                {
                                    new: true, // Return the updated document
                                    upsert: true, // Create a new document if it doesn't exist
                                }
                            );

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
                const subscription = await stripe.subscriptions.retrieve(event.data.object.id);
                
                const user = await User.findOne({
                    customerId: subscription.customer
                });

                if (!user) {
                    console.error("User not found for the subscription deleted event.");
                    throw new Error("User not found for the subscription deleted event.");
                }else{   
                    // Update the user's plan to 'free'
                    await User.findByIdAndUpdate(user._id, { plan: 'free' });
                    console.log(`User ${user._id} plan updated to free.`);
                }

                break;
            }

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