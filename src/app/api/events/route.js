import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";
import Notification from "@/models/Notification";

export async function GET() {
  await connectDB();
  const events = await Event.find().sort({ date: 1 });
  return new Response(JSON.stringify(events), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const event = await Event.create(body);

  // Create related notification
  const notifyAt = new Date(new Date(event.date).getTime() - 5 * 60 * 1000);
  await Notification.create({
    eventId: event._id,
    title: event.title,
    description: event.description,
    notifyAt,
  });

  return new Response(JSON.stringify(event), { status: 201 });
}
