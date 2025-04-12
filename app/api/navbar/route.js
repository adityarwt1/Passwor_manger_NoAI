import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    // Access the cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('passwordManager')?.value;

    // If no token is found, return unauthorized response
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Return the decoded user information
    return NextResponse.json({ success: true, data: decoded });
  } catch (error) {
    // Handle token verification errors
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}
