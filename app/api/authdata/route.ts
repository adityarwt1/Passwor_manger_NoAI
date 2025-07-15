import { useAuth, useUser } from "@clerk/nextjs";
import { currentUser, getAuth, auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Not found " }, { status: 404 });
    }
    return NextResponse.json({ userId }, { status: 200 });
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json(
      { message1: "Internal server issue", message2: (error as Error).message },
      { status: 500 }
    );
  }
}
