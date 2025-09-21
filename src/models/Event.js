import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event ||
  mongoose.model("Event", eventSchema);
