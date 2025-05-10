import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        await connectDB()
        const searchParams = req.nextUrl.searchParams;

        const username = searchParams.get("username")
        const userId = searchParams.get("userid")
        const plateform = searchParams.get("plateform");
        const password = searchParams.get("password")

        const update = await User.findOneAndUpdate(
            {
                username: username
            },
            {
                $push: {
                    plateform: plateform,
                    plateFormPassword: { plateform, password }
                }
            }
        )

        if (!update) {
            return NextResponse.json({ message: "user not found or unbale to add password" }, { status: 404 })
        }

        return NextResponse.json({ update }, { status: 200 })


    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ message: "internal server issue" }, { status: 500 })
    }
}