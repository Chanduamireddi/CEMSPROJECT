/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/Feedback";


export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userEmail, eventId, rating, comment } = await req.json();

    if (!userEmail || !eventId || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const feedback = await Feedback.create({ userEmail, eventId, rating, comment });
    return NextResponse.json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Feedback Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const feedbacks = await Feedback.find().populate("eventId", "name");
    return NextResponse.json(feedbacks);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}