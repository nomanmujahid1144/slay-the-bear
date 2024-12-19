import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { forgetSchema } from "@/schemas/forgetSchema";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();

        const { email } = reqBody;

        // validation
        const objToVerifyDataFromZod = {
            email: email,
        }

        const verificationResult = await forgetSchema.safeParse(objToVerifyDataFromZod);

        if (verificationResult.success) {
            const user = await User.findOne({ email });

            if (!user) {
                return NextResponse.json({
                    message: "Invalid email address",
                    success: false
                }, { status: 400 })
            }

            await sendEmail({ email, emailType: "RESET", userId: user._id, username: user.firstName });

            return NextResponse.json({
                message: 'We have emailed you a link to reset your password',
                success: true
            }, {status: 200})

        } else {
            const { fieldErrors } = verificationResult.error.flatten();

            // Extract errors
            const emailError = fieldErrors.email || [];

            // Check if any errors exist
            if (emailError.length > 0) {
                return NextResponse.json({
                    message: emailError.join(', ') || 'Please check your entries',
                    success: false,
                }, { status: 400 });
            }
        }

    } catch (error) {
        console.log(error, 'error')
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 })
    }
}