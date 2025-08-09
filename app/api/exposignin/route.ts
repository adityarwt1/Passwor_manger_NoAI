import connectDB from "@/lib/mongodb";
import ExpoUser from "@/models/ExpoUser";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {username, password} = await req.json()

        if(!username  || !password){
            return NextResponse.json(
              { error: "Field are required" },
              {
                status: 400,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                  "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
              }
            );
        }

        await connectDB()
        let user;

        const exist = await User.findOne({ username }).select("username password");

        if(exist) user = exist;
        if(!exist){
            user = await ExpoUser.findOne({ username }).select("username password");
        }

        if(!user){
            return NextResponse.json(
              { error: "User not found" },
              {
                status: 404,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                  "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
              }
            );
        }
       const isPasswordTrue = await bcrypt.compare(password, user.password)
       if(isPasswordTrue){
        return NextResponse.json(
          { message: "Sogin sussfully" ,user },
          {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          }
        );
       }
       if(!isPasswordTrue){
        return NextResponse.json(
          { error: "Wrong password" },
          {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          }
        );
       }
    } catch (error) {
            console.log((error as Error).message)
            return NextResponse.json(
              { error: "Internal server issue" },
              {
                status: 500,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                  "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
              }
            );
    }
    
}