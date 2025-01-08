import { Plan, SubscriptionPeriod } from "@/constants/erums";
import mongoose from "mongoose";


const subscriptionEntrySchema = new mongoose.Schema({
    invoice_id: {
        type: String,
        default: '',
    },
    amount: {
        type: Number,
        min: 0,
        default: 0,  // Optional: Ensure a default value for amount
    },
    status: {
        type: String,
        enum: ['Subscribed', 'Renewal', 'Canceled'],
        default: 'Subscribed',  // Default status
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    viewURL: {
        type: String,
        default: '',
    },
    downloadURL: {
        type: String,
        default: '',
    },
});

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
    subscriptionsList: [subscriptionEntrySchema],
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