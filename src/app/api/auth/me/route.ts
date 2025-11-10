import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, verifyJwt } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = verifyJwt<TokenPayload>(token);

    await connectToDatabase();

    const user = await User.findById(payload.sub)
      .select("name email")
      .lean<{ _id: string; name: string; email: string }>();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("[AUTH_ME]", error);
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

