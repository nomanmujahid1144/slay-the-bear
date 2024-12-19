import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
import { changePasswordSchema } from "@/schemas/changePasswordSchema";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { password, confirmPassword, userId } = reqBody;

        const objToVerifyDataFromZod = {
            password: password,
            confirmPassword: confirmPassword
        }

        console.log(reqBody, 'reqBody')

        const verificationResult = await changePasswordSchema.safeParse(objToVerifyDataFromZod);

        if (verificationResult.success) {

            const user = await User.findOne({ _id: userId });

            if (user) {

                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);

                user.password = hashedPassword;

                const savedUser = await user.save();

                await sendEmail({ email: savedUser.email, emailType: "CHANGE_PASSWORD", userId: savedUser._id, username: savedUser.firstName });

                return NextResponse.json({
                    message: 'Password changes successfully',
                    success: true,
                    savedUser
                }, { status: 200 })
            }

            return NextResponse.json({
                message: 'Token Expires',
                success: false,
            }, { status: 400 })

        } else {
            const { fieldErrors } = verificationResult.error.flatten();

            // Extract errors
            const passwordError = fieldErrors.password || [];
            const confirmPasswordError = fieldErrors.confirmPassword || [];

            // Check if any errors exist
            if (passwordError.length > 0 || confirmPasswordError.length > 0) {
                return NextResponse.json({
                    message: passwordError.concat(confirmPasswordError).join(', ') || 'Please check your entries',
                    success: false,
                }, { status: 400 });
            }
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: error.message,
        }, {status: 500})
    }
}