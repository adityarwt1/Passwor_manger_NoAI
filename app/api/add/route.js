import User from '@/models/User.js';
import connectDB from '@/lib/mongodb.js'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function POST(req) {

    try {
        //connect to db
        await connectDB()

        /// exatracting data from req
        const { plateform, password } = await req.json();

        // getting username from token for varifivation who are the userr

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        /// confirming fromm jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const updatedUser = await User.findOneAndUpdate(
            { username: decoded.username },
            {
                $push: {
                    plateform: plateform,
                    plateFormPassword: { plateform, password }
                }
            },
            { new: true }  // Returns the updated document
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Password added successfully",
            data: updatedUser
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
    }

}