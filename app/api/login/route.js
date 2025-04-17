import User from '@/models/User.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const cookieStore = await cookies()
    try {
       await connectDB();
        ///checking user already lgin or not 

        
        
        /// getting username and passsword and find in db
        const { username, password } = await req.json();
        const user = await User.findOne({ username })
        const decodedPassword = await bcrypt.compare(password, user.password)
        console.log(decodedPassword)

        if(!user){
            return NextResponse.json({message: " User not found"},{ status:404})
        }
        if (!decodedPassword) {
            return NextResponse.json({ message: "Incorrect Password" },{status:402})
        }
        /// making payload to set intothe token

        if (decodedPassword){
        
            const userdataPayload = {
                id: user._id,
                username: user.username,
                email: user.email,
                plateform: user.plateform,
                plateFormPassword: user.plateFormPassword,
            }
            const token = jwt.sign(userdataPayload, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })  

            cookieStore.set("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60
                })
                return NextResponse.json({
                    success: true,
                    message: "User logged in successfully",
                    data: userdataPayload
                }, { status: 200 })
            
        
            }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:`${error}internal sever error`}, {status: 500})
    }

}
