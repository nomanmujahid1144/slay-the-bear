import { Plan, SubscriptionPeriod } from "@/constants/erums";
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plan: {
        type: String,
        enum: Object.values(Plan),
        required: true,
    },
    period: {
        type: String,
        enum: Object.values(SubscriptionPeriod),
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
})

const Subscription = mongoose.models.subscriptions || mongoose.model('subscriptions', subscriptionSchema);

export default Subscription