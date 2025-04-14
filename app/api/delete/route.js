import connectDB from '@/lib/mongodb.js'
import User from '@/models/User.js'
import { NextResponse } from 'next/server';
export async function DELETE(req) {

    try {
        await connectDB();

        /// getting data from request
        const {deletePassword} = await req.json(); // Changed id to deletePassword to match frontend
        const user = await User.findOneAndDelete({ deletePassword });
        
        if (!user) {
            return NextResponse.json({success: false , data: "User not found"})
        }

        return NextResponse.json({success: true, data: user},{ status:200})
    } catch (error) {
        console.error("Delete error:", error); // Added error logging
        return NextResponse.json({success: false, data: "Internal server error" })
    }
    
}