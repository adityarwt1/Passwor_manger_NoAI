import connectDB from "@/lib/mongodb";
import Password from "@/models/Password";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const username = req.nextUrl.searchParams.get("username");
    const query = req.nextUrl.searchParams.get("q");
    const page = Number(req.nextUrl.searchParams.get("p")) || 0;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "plateform";
    const sortOrder = req.nextUrl.searchParams.get("sortOrder") || "asc";

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    // Validate pagination parameters
    if (page < 0 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { message: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    let filter: any = { username };

    // Enhanced search functionality
    if (query) {
      filter.$or = [
        { plateform: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }, // assuming you have email field
        { username: { $regex: query, $options: "i" } },
      ];
    }

    // Create sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Get total count for pagination
    const totalCount = await Password.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch passwords with pagination
    const passwords = await Password.find(filter)
      .sort(sort)
      .skip(page * limit)
      .limit(limit);

    // Decrypt passwords
    const decryptedPasswords = passwords.map((doc) => {
      try {
        const decodedPassword = jwt.verify(doc.password, username);
        return {
          _id: doc._id,
          plateform: doc.plateform,
          password: decodedPassword,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        };
      } catch (error) {
        // Handle decryption errors gracefully
        return {
          _id: doc._id,
          plateform: doc.plateform,
          password: "Unable to decrypt",
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        };
      }
    });

    return NextResponse.json(
      {
        passwords: decryptedPasswords,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage: page < totalPages - 1,
          hasPreviousPage: page > 0,
          nextPage: page < totalPages - 1 ? page + 1 : null,
          previousPage: page > 0 ? page - 1 : null,
        },
        query,
        sortBy,
        sortOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching passwords:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
