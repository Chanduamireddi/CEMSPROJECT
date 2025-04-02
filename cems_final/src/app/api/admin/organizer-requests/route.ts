/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OrganizerRequest from "@/models/OrganizerRequest";
import Event from "@/models/Event";

export async function GET() {
  try {
    await dbConnect();
    const requests = await OrganizerRequest.find();
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { id, action } = await req.json(); // NOTE: now using `id` (not requestId)

    const request = await OrganizerRequest.findById(id);
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (action === "approve") {
      request.status = "accepted";

      await Event.create({
        name: request.eventName,
        date: request.date,
        category: request.category,
        capacity: request.capacity,
        participants: [],
      });
    } else if (action === "reject") {
      request.status = "rejected";
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await request.save();
    return NextResponse.json({ message: "Status updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}