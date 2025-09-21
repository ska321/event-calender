import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function POST() {
  await connectDB();
  const now = new Date();

  await Notification.updateMany(
    { notifyAt: { $lte: now }, seen: false },
    { $set: { seen: true } }
  );

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
