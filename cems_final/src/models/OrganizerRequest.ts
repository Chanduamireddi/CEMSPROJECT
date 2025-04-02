import mongoose, { Document, Schema } from "mongoose";

export interface IOrganizerRequest extends Document {
  userEmail: string;
  eventName: string;
  date: Date;
  category: string;
  place: string;
  capacity: number;
  message?: string;
  status: string;
  createdAt: Date;
}

const organizerRequestSchema = new Schema<IOrganizerRequest>({
  userEmail: { type: String, required: true },
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  place: { type: String, required: true },
  capacity: { type: Number, required: true },
  message: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const OrganizerRequest =
  mongoose.models.OrganizerRequest ||
  mongoose.model<IOrganizerRequest>("OrganizerRequest", organizerRequestSchema);

export default OrganizerRequest;