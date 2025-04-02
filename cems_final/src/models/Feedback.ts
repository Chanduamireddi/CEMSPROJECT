import mongoose, { Document, Schema } from "mongoose";

export interface IFeedback extends Document {
  eventId: mongoose.Types.ObjectId;
  userEmail: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const feedbackSchema = new Schema<IFeedback>({
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  userEmail: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Feedback =
  mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;
