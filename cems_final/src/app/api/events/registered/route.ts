import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const events = await Event.find({ participants: email });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching registered events:", error);
    return NextResponse.json({ error: "Failed to fetch registered events" }, { status: 500 });
  }
}