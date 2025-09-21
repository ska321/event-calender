import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET() {
  await connectDB();
  const now = new Date();

  const count = await Notification.countDocuments({
    notifyAt: { $lte: now },
    seen: false,
  });

  return new Response(JSON.stringify({ count }), { status: 200 });
}
