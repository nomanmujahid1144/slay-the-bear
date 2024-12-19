import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
import { signUpSchema } from "@/schemas/signUpSchema";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { firstName, lastName, email, password } = reqBody;

        const objToVerifyDataFromZod = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        const verificationResult = await signUpSchema.safeParse(objToVerifyDataFromZod);

        if (verificationResult.success) {

            const user = await User.findOne({ email });

            if (user) {
                if (user.isVerified) {
                    return NextResponse.json({
                        message: "An account with this email address already exists.",
                    }, { status: 400 })
                }

                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);

                user.password = hashedPassword;

                const savedUser = await user.save();

                await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id, username: savedUser.firstName  });

                return NextResponse.json({
                    message: 'User registered successfully, verfication code is send to your email',
                    success: true,
                    savedUser
                })
            }

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, salt);

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })

            const savedUser = await newUser.save();

            // Send Verification Email
            await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id, username: savedUser.firstName });

            return NextResponse.json({
                message: 'User registered successfully',
                success: true,
                savedUser
            })
        } else {
            const { fieldErrors } = verificationResult.error.flatten();

            // Extract errors
            const firstNameError = fieldErrors.firstName || [];
            const lastNameError = fieldErrors.lastName || [];
            const emailError = fieldErrors.email || [];
            const passwordError = fieldErrors.password || [];

            // Check if any errors exist
            if (firstNameError.length > 0 || lastNameError.length > 0 || emailError.length > 0 || passwordError.length > 0) {
                return NextResponse.json({
                    message: firstNameError.concat(lastNameError, emailError, passwordError).join(', ') || 'Please check your entries',
                    success: false,
                }, { status: 400 });
            }
        }


    } catch (error) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}