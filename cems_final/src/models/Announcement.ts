import mongoose, { Schema, model, models } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Auto-generate timestamp
    },
  },
  { timestamps: true }
);

export default models.Announcement || model("Announcement", AnnouncementSchema);
