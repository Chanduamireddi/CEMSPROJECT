import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log("✅ User found:", user.email);

    // We'll send email in next step
    return NextResponse.json({ message: 'Reset link sent to your email.' });
  } catch (err) {
    console.error("❌ Error in forgot-password API:", err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
