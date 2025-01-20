import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Subscription from "@/models/subscription.model";

connect();

export async function POST(request) {
    try {
        const userId = await getDataFromToken(request);
        
        const subscription = await Subscription.findOne({ _id: userId });

        if (!subscription) {
            return NextResponse.json({
                message: "User does not exist"
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "Subscription found",
            success: true,
            data: subscription
        });
        
    } catch (error) {
        return NextResponse.json({
            message: "An error occurred",
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
