import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; 
  // Ensure this matches your file structure
import Feedback from "@/models/Feedback";

export async function GET(req: NextRequest) {
  await dbConnect();  // Ensures database is connected
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) return NextResponse.json({ error: "Event ID is required" }, { status: 400 });

  const feedbacks = await Feedback.find({ eventId }).populate("userId", "name");
  return NextResponse.json(feedbacks);
}
