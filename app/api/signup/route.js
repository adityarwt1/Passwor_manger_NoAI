import mongoose from "mongoose";
import User from "@/models/User.js"
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import  {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(req) {
    
    try{
      await  connectDB();
        const {username , email , password } = await req.json();
        const user = new User({username, email, password});
        user.save();

        // making pay load for saving the data
        const tokenPayload = {
          username: user.username,
          email: user.email,
          password: user.password
        }

        /// this is creationn not asighnment
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET,{
          expiresIn: "7d"
        })

        //asign ito the   cookie
        ;(await cookies()).set("token",token,{
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path:'/',
          maxAge: 7*24*60*60
        })



        return NextResponse.json({success: true, data:user}, {status: 201})
    }
    catch(error){
            console.log("something went wrong")
    }
}