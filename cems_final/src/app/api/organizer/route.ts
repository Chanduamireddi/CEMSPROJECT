/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OrganizerRequest from "@/models/OrganizerRequest";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userEmail, eventName, date, category, place, capacity, message } = await req.json();

    const existing = await OrganizerRequest.findOne({ userEmail, status: "pending" });
    if (existing) {
      return NextResponse.json({ error: "You already have a pending request." }, { status: 400 });
    }

    const newRequest = await OrganizerRequest.create({
      userEmail,
      eventName,
      date,
      category,
      place,
      capacity,
      message,
    });

    return NextResponse.json({ message: "Request submitted", request: newRequest });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const requests = await OrganizerRequest.find();
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}