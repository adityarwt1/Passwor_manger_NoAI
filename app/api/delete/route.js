import User from '@/models/User.js'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function DELETE(req) {
    try {
        await connectDB();

        // Get the current user from the token
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
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
            { username: decoded.username },
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