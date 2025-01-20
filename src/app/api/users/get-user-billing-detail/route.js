import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Subscription from "@/models/subscription.model";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
    try {
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({
                message: "Invalid User",
            }, { status: 400 });
        }

        const getInvoicesDetails = await Subscription.findOne({ userId: userId });

        const reversedSubscriptions = getInvoicesDetails?.subscriptionsList?.length > 0
            ? [...getInvoicesDetails.subscriptionsList].reverse()
            : [];

        return NextResponse.json({
            message: "Invoice List",
            success: true,
            data: reversedSubscriptions,
        });

    } catch (error) {
        return NextResponse.json({
            error: error.message,
        }, { status: 500 });
    }
}
