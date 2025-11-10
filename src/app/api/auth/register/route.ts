import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { hashPassword, signJwt, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email: email.toLowerCase() }).lean();
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "An account with that email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const createdUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = signJwt({ sub: createdUser._id.toString(), email: createdUser.email });

    const response = NextResponse.json({
      success: true,
      data: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[REGISTER]", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while creating the account" },
      { status: 500 }
    );
  }
}

