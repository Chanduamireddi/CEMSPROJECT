import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'participant' | 'organizer' | 'admin';
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['participant', 'organizer', 'admin'], default: 'participant' }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
