import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await dbConnect(); // Ensure DB connection
    const body = await req.json(); // Get request body
    console.log("Received Login Request:", body); // Debugging

    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    console.log("User Authenticated:", { email, role: user.role });

    return NextResponse.json({ message: "Login successful!", token, role: user.role });
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
