import connectDB from "@/lib/mongodb";
import ExpoUser from "@/models/ExpoUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(req: NextRequest) {
    try {
        const {username, password} = await req.json()
        console.log(username,password)
        if(!username || !password){
            return NextResponse.json(
              { error: "Fields are required" },
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

        /// this is db request

        await connectDB()
        /// check the  existence 
        const existence = await ExpoUser.findOne({username})
        if(existence){
            return NextResponse.json(
              { error: "User already exist" },
              {
                status: 409,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST",
                  "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
              }
            );
        }

        ///saving the user data
        const hashePassword = await bcrypt.hash(password, 5)
        const user = new ExpoUser({username, password: hashePassword})
        await user.save()


        return NextResponse.json(
          { message: "working" ,user },
          {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
          }
        );
    } catch (error) {
        console.log((error as Error).message)
        return NextResponse.json({message: "Internel server issue"},{status: 500 ,headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }})
    }
    
}