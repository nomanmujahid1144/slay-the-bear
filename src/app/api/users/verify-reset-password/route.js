import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

connect();


export async function POST(request) {
    try {

        const reqBody = await request.json();
        const { token } = reqBody;

        console.log(token, 'token')

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}}).select('-password');

        if (!user) {
            return NextResponse.json({
                message: "Token is expired. Please try to reset your password again! Thanks",
                success: false
            },{status: 400})
        }

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Token is verified",
            success: true,
            user
        }, {status: 200})

    } catch (error) {
        console.log(error.message, 'error')
        return NextResponse.json({
            error: error.message
        },{status: 500})
    }
}