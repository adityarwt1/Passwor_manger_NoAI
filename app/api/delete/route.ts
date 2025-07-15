import connectDB from "@/lib/mongodb";
import Password from "@/models/Password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { _id } = await req.json();
    if (!_id) {
      return NextResponse.json({ message: "bad request" }, { status: 400 });
    }
    await Password.findOneAndDelete({ _id });
    return NextResponse.json(
      { message: "Password delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      { message: "Internal server issue" },
      { status: 500 }
    );
  }
}
