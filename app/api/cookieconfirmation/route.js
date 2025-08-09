import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const crosHeader  =  {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "POST",
"Access-Control-Allow-Headers": "Content-Type, Authorization",
}
export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    console.log(token);
    if (!token) {
      const respone =  NextResponse.json(
        { success: false, message: "Unotherized route" },
        { status: 401 }
      );
      respone.headers(crosHeader)
      return respone
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const response =  NextResponse.json({ success: true, data: true }, { status: 200 });
      response.headers(crosHeader)
      return response
    }
  } catch (error) {
    const response = NextResponse.json({ success: false, message: error });
    response.headers(crosHeader)
    return response
  }
}
