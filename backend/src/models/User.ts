import mongoose, { Schema, Document } from 'mongoose';

export interface SavedItem {
  name: string;
  details: string;
  createdAt: Date;
}

export interface UserDocument extends Document {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  fitnessgoal: 'bulking' | 'cutting' | 'keto' | 'diabetic';
  saveditems: SavedItem[];
}

const SavedItemSchema = new Schema<SavedItem>({
  name: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true }, // Make sure to hash before storing
  fitnessgoal: { 
    type: String, 
    required: true, 
    enum: ['bulking', 'cutting', 'keto', 'diabetic'] 
  },
  saveditems: { type: [SavedItemSchema], default: [] },
}, { timestamps: true });

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;