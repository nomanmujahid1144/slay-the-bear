import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

connect();


export async function POST(request) {
    try {

        const reqBody = await request.json();
        const { token } = reqBody;

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({
                message: "Token is expired. Please sign-up try again"
            },{status: 400})
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "User Verified",
            success: true
        }, {status: 200})

    } catch (error) {
        console.log(error.message, 'error')
        return NextResponse.json({
            error: error.message
        },{status: 500})
    }
}