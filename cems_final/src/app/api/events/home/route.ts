import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const ongoingEvents = await Event.find({
      date: { $gte: today, $lte: nextWeek },
    });

    const upcomingEvents = await Event.find({
      date: { $gt: nextWeek },
    });

    return NextResponse.json({ ongoingEvents, upcomingEvents });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch events' }, { status: 500 });
  }
}
