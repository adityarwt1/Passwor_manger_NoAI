import connectDB from "@/lib/mongodb";
import Password from "@/models/Password";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { _id, plateform, password } = await req.json();
    if (!_id || !plateform || !password) {
      return NextResponse.json({ message: "bad request" }, { status: 400 });
    }
    const update = await Password.findOneAndUpdate(
      {
        _id,
      },
      {
        plateform,
        password,
      }
    );
    if (!update) {
      return NextResponse.json(
        { message: "Unable ot update the pasword" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "Password updated successfully", update },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
