import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  capacity: { type: Number, required: true },
  participants: { type: [String], default: [] },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
