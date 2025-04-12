import User from '@/models/User.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";

export async function POST(req) {

    try {
        connectDB();
        /// getting username and passsword and find in db
        const { username, password } = await req.json();
        const user = await User.findOne({ username })
        if (user.password !== password) {
            return NextResponse.json({ message: "Incorrect Password" })
        }
        /// making payload to set intothe token
        
            const userdataPayload = {
                id: user._id,
                username: user.username,
                email: user.email,
                plateform: user.plateform,
                password: user.password,
            }
            const token = jwt.sign(userdataPayload, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })

                (await cookies()).set("passwordManager", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60
                })
        
        return NextResponse.json({success: true , messsage: "user login successfully"}, {status: 200})

    } catch (error) {
        return NextResponse.json({message:"internal sever error"}, {status: 500})
    }

}
