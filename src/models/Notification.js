import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  title: String,
  description: String,
  notifyAt: Date,
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
