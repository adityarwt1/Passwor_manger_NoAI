import mongoose from "mongoose";
import User from "@/models/User.js"
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'


/// for logging the user
export async function GET(req) {

  try {
    /// getting username and passsword and find in db
    const { username, password } = await req.json();
    const user = await User.findOne({ username })
    if (user.password !== password) {
      return NextResponse.json({ message: "Incorrect Password" })
    }
    /// making payload to set intothe token
    if (user) {
      const userdataPayload = {
        id: user._id,
        username: user.username,
        email: user.email,
        plateform: user.plateform,
        password: user.password,
      }
      const token = jwt.sign(userdataPayload,process.env.JWT_SECRET,{
        expiresIn:"7d"
      })

      ;(await cookies()).set("passwordManager", token,{
        httpOnly: true,
        secure:true,
        sameSite:"strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 
      })


      
      

    }

  } catch (error) {

  }

}


export async function POST(req) {

  try {
    await connectDB();
    const { username, email, password } = await req.json();


    /// trying user exist or not  
    const existingUser = await User.findOne({
      Username: username,
    })

    if (existingUser) {
      return NextResponse.json({ success: false, message: "User Already Exist" })
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

  try {
    (await cookies()).delete("passwordManager")

    return NextResponse.json({ success: true, message: "Cokie deleted successfully" })
  }
  catch (error) {
    return NextResponse.json({ success: false, message: "Itana Chutiya Api hai" })
  }


}