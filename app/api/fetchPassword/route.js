import mongoose from "mongoose";
import connectDB from '@/lib/mongodb.js'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";
import User from '@/models/User.js'

export async function GET() {
    try {
        /// 1. connnectinn to congo db
        await connectDB();
        // 2. extract uerbase data from 
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized: No token provided' },
                { status: 401 }
            );
        }
        /// GETTIN username from cookies
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            username: decoded.username,
        })


        return NextResponse.json({ success: true, data: user.plateFormPassword });
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.json(
            { success: false, message: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}