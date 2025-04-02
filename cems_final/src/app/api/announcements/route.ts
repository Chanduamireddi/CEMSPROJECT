import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Announcement from "@/models/Announcement";

// ✅ GET: Fetch all announcements
export async function GET() {
  try {
    await dbConnect();
    const announcements = await Announcement.find({}).sort({ createdAt: -1 });

    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

// ✅ POST: Create a new announcement (Admin Only)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    const newAnnouncement = new Announcement({ message });
    await newAnnouncement.save();

    return NextResponse.json({ message: "Announcement created successfully", newAnnouncement }, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}

// ✅ PATCH: Update an announcement
export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const { id, message } = await req.json();

    if (!id || !message) {
      return NextResponse.json({ error: "ID and message are required" }, { status: 400 });
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, { message }, { new: true });

    if (!updatedAnnouncement) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Announcement updated successfully", updatedAnnouncement }, { status: 200 });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
  }
}

// ✅ DELETE: Delete an announcement
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Announcement deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
  }
}
