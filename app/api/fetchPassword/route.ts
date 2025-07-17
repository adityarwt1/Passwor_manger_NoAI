import connectDB from "@/lib/mongodb";
import Password from "@/models/Password";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const username = req.nextUrl.searchParams.get("username");
    const query = req.nextUrl.searchParams.get("q");
    if (!username) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    let filter: any = {};
    if (username) {
      filter.username = username;
    }
    if (query) {
      filter.$or = [
        {
          plateform: { $regex: query, $options: "i" },
        },
        { plateform: { $regex: query, $options: "i" } },
      ];
    }
    const passwords = await Password.find(filter);
    const password = passwords.map((childobject) => {
      const decodedPassword = jwt.verify(childobject.password, username);
      return {
        _id: childobject._id,
        plateform: childobject.plateform,
        password: decodedPassword,
      };
    });
    console.log(password);
    if (!password) {
      return NextResponse.json({ password: [] }, { status: 200 });
    } else {
      return NextResponse.json({ password }, { status: 200 });
    }
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      { mesage: "Internal server issue" },
      { status: 500 }
    );
  }
}
