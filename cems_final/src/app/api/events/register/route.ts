import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { eventId, email } = await req.json(); // ✅ Use email instead of userId

    if (!eventId || !email) {
      return NextResponse.json({ error: "Missing eventId or email" }, { status: 400 });
    }

    // ✅ Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // ✅ Check if event is full
    if (event.participants.length >= event.capacity) {
      return NextResponse.json({ error: "Event is full" }, { status: 400 });
    }

    // ✅ Check if user is already registered
    if (event.participants.includes(email)) {
      return NextResponse.json({ error: "You are already registered" }, { status: 400 });
    }

    // ✅ Add user to participants
    event.participants.push(email);
    await event.save();

    return NextResponse.json({ message: "Successfully registered!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
