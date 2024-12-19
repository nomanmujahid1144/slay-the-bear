import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
import { signUpSchema } from "@/schemas/signUpSchema";
import { updateUserSchema } from "@/schemas/updateUserSchema";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { firstName, lastName, email } = reqBody;

        const objToVerifyDataFromZod = {
            firstName: firstName,
            lastName: lastName
        }

        const verificationResult = await updateUserSchema.safeParse(objToVerifyDataFromZod);

        if (verificationResult.success) {

            const user = await User.findOne({ email });

            if (user) {
                
                user.firstName = firstName;
                user.lastName = lastName;

                const savedUser = await user.save();

                return NextResponse.json({
                    message: 'Your detials updated successfully',
                    success: true,
                    savedUser
                }, { status: 200 })
            }

            return NextResponse.json({
                message: 'User not found',
                success: false,
            }, { status: 400 })

        } else {
            const { fieldErrors } = verificationResult.error.flatten();

            // Extract errors
            const firstNameError = fieldErrors.firstName || [];
            const lastNameError = fieldErrors.lastName || [];

            // Check if any errors exist
            if (firstNameError.length > 0 || lastNameError.length > 0) {
                return NextResponse.json({
                    message: firstNameError.concat(lastNameError).join(', ') || 'Please check your entries',
                    success: false,
                }, { status: 400 });
            }
        }


    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 })
    }
}