import mongoose, { Schema, Document } from 'mongoose';

const FullyFinishedProductSchema = new Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  upc: { type: String, required: true },
  brand: { type: String, required: true },
  nf_calories: { type: Number, default: null },
  serving_weight_grams: { type: Number, default: null },
  nf_metric_qty: { type: Number, default: null },
  nf_metric_uom: { type: String, default: null },
  nf_total_fat: { type: Number, default: null },
  nf_saturated_fat: { type: Number, default: null },
  nf_protein: { type: Number, default: null },
  nf_total_carbohydrate: { type: Number, default: null },
  nf_dietary_fiber: { type: Number, default: null },
  nf_sugars: { type: Number, default: null },
  nf_sodium: { type: Number, default: null },
  nf_cholesterol: { type: Number, default: null },
  photo: { type: String, default: null },
  rating: { type: Number, default: null },
});

export interface UserDocument extends Document {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  fitnessgoal: 'bulking' | 'cutting' | 'keto' | 'diabetic';
  saveditems: typeof FullyFinishedProductSchema[];
}

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
  saveditems: { type: [FullyFinishedProductSchema], default: [] },
}, { timestamps: true });

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;