import { NextResponse } from "next/server"

export function GET(req, res) {
    return NextResponse.json('Hello from Next.js!')
}