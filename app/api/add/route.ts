import connectDB from "@/lib/mongodb";
import Password from "@/models/Password";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;

    const username = searchParams.get("username");
    const plateform = searchParams.get("plateform");
    const password = searchParams.get("password");
    if (!username || !plateform || !password) {
      return NextResponse.json(
        { message: "bad request" },
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
    const encryptedPassoword = jwt.sign(password, username);
    const add = new Password({
      username,
      plateform,
      password: encryptedPassoword,
    });
    await add.save();
    if (!add) {
      return NextResponse.json(
        { message: "user not found or unbale to add password" },
        { status: 404,headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }, }
      );
    }

    return NextResponse.json({
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "internal server issue" },
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
