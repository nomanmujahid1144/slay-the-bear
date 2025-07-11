import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { logInSchema } from "@/schemas/logInSchema";
import serverPosthog from "@/lib/posthog-server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    // validation
    const objToVerifyDataFromZod = {
      email: email,
      password: password
    }

    const verificationResult = await logInSchema.safeParse(objToVerifyDataFromZod);

    if (verificationResult.success) {

      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({
          message: "Wrong email or password. Try again."
        }, { status: 400 })
      }

      const validPassword = await bcryptjs.compare(password, user.password);

      if (!validPassword) {
        return NextResponse.json({
          message: "Wrong email or password. Try again."
        }, { status: 400 })
      }

      if (!user.isVerified) {
        try {
          serverPosthog.capture({
            distinctId: email,
            event: 'login_failed',
            properties: {
              reason: 'not_verified',
              userId: user._id.toString(),
              email: email
            }
          });
        } catch (trackingError) {
          console.error("Error tracking failed login:", trackingError);
        }

        return NextResponse.json({
          message: "Please verify first, or signup again"
        }, { status: 400 })
      }

      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.plan
      }

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '3d' });

      const returnUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: user.isVerified,
        email: user.email,
        plan: user.plan,
        _id: user._id,
      }

      serverPosthog.capture({
        distinctId: returnUser.email,
        event: 'user_login',
        properties: {
          userId: returnUser._id.toString(),
          email: returnUser.email,
          firstName: returnUser.firstName,
          lastName: returnUser.lastName,
          plan: returnUser.plan,
          loginTime: new Date().toISOString()
        }
      });

      const response = NextResponse.json({
        message: "Logged In Success",
        success: true,
        data: returnUser
      });

      response.cookies.set("token", token, {
        httpOnly: true
      });

      return response;
    }

    const { fieldErrors } = verificationResult.error.flatten();

    // Extract errors
    const emailError = fieldErrors.email || [];
    const passwordError = fieldErrors.password || [];

    // Check if any errors exist
    if (emailError.length > 0 || passwordError.length > 0) {
      return NextResponse.json({
        message: emailError.concat(passwordError).join(', ') || 'Please check your entries',
        success: false,
      }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 })
  }
}