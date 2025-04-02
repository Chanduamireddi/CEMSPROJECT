/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({});
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, date, category, capacity } = await req.json();

    if (!name || !date || !category || !capacity) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newEvent = new Event({ name, date: new Date(date), category, capacity: parseInt(capacity) });
    await newEvent.save();

    return NextResponse.json({ message: "Event added successfully", event: newEvent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { id, name, date, category, capacity } = await req.json();

    if (!id || !name || !date || !category || !capacity) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date: new Date(date), category, capacity: parseInt(capacity) },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event updated successfully", event: updatedEvent }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}