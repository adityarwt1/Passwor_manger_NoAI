import mongoose from "mongoose";
import User from "@/models/User.js"
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(req) {

  try {
    await connectDB();
    const { username, email, password } = await req.json();


    /// trying user exist or not  
    const existingUser = await User.findOne({
        Username: username,
    })

    if(existingUser){
      return NextResponse.json({success: false, message: "User Already Exist"})
    }
    
    const user = new User({ username, email, password });
    await user.save();
  

    // making pay load for saving the data
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,

    }

    /// this is creationn not asighnment
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })

    //asign ito the   cookie
    cookies().set("passwordManager", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    })



    return NextResponse.json({ success: true, data: user }, { status: 201 })
  }
  catch (error) {
    console.log("User already exist");
    return NextResponse.json({
      success: false,
      data: "User already exist of server Error"
    }, { status: 500 })

  }
}


export async function DELETE() {
  
  try{
    (await cookies()).delete("passwordManager")

    return NextResponse.json({success:true , message: "Cokie deleted successfully"})
  }
  catch(error){
    return NextResponse.json({success: false, message:"Itana Chutiya Api hai"})
  }

  
}