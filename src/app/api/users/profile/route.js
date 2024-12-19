import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request) {
    const userId = await getDataFromToken(request);
    
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
        return NextResponse.json({
            message: "User does not exist"
        }, { status: 400 })
    }

    return NextResponse.json({
        message: "User found",
        success: true,
        data: user
    })
}