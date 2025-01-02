import { Plan } from "@/constants/erums";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please use a valid email']
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    plan: {
        type: String,
        enum: Object.values(Plan),
        default: Plan.FREE,
    },
    customerId: { // String Customer ID, this will be important when we need to delete the subscription
        type: String,
        sparse: true,
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
    },
    // verifyCode:{
    //     type: String,
    //     required: [true, "Verify code is required"]
    // },
    // verifyCodeExpiry:{
    //     type: Date,
    //     required: [true, "Verify code Expiry is required"]
    // },
})

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User