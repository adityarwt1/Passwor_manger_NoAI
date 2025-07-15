import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unotherized route" },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      return NextResponse.json({ success: true, data: true }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}
