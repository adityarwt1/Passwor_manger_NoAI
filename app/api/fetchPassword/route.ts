import mongoose from "mongoose";
import connectDB from '@/lib/mongodb.js'
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/User.js'

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const username = searchParams.get("username")

        const filter: any = {}
        if (username) {
            filter.username = username
        }

        const passwords = await User.find(filter)
        if (!passwords) {
            return NextResponse.json({ success: false, message: "no one password found" }, { status: 404 })
        }



        return NextResponse.json({ success: true, data: passwords }, { status: 200 });
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.json(
            { success: false, message: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}