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
  {
    status: 401,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  }
);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
return NextResponse.json(
  { success: true, data: true },
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
  } catch (error) {
    const response = NextResponse.json(
      { success: false, message: error },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        status  : 500
      }
    );
    return response
  }
}
