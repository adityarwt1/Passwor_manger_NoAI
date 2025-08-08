import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {
        return NextResponse.json(
          { message: "Hello from the next js password manager" },
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
        return NextResponse.json({message: (error as Error).message},{status: 500})
    }
}