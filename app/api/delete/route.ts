import User from '@/models/User.js'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js'
import mongoose from 'mongoose';
export async function DELETE(req: NextRequest) {
    try {
        await connectDB();

        // Get the current user from the token
        const cookieStore = await cookies();
        const searchParams = req.nextUrl.searchParams;

        const username = searchParams.get("username")

        if (!username) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }


        // Get the password ID to delete
        const { _id } = await req.json();

        if (!_id) {
            return NextResponse.json(
                { success: false, message: 'Password ID is required' },
                { status: 400 }
            );
        }

        // Update the user document
        const user = await User.findOneAndUpdate(
            { username: username },
            {
                $pull: {
                    plateFormPassword: {
                        _id: new mongoose.Types.ObjectId(_id) // Convert string to ObjectId
                    }
                }
            },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: user },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Server error" },
            { status: 500 }
        );
    }
}