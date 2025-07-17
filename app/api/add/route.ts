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
      return NextResponse.json({ message: "bad request" }, { status: 400 });
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
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "internal server issue" },
      { status: 500 }
    );
  }
}
