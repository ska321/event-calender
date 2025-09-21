import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET() {
  await connectDB();
  const now = new Date();

  // Get notifications that should appear
  const notifications = await Notification.find({
    notifyAt: { $lte: now },
  })
    .sort({ notifyAt: -1 })
    .limit(20);

  return new Response(JSON.stringify(notifications), { status: 200 });
}
