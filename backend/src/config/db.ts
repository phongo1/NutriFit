import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_CONNECTION_STRING;

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not set in environment variables.");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected!');
    console.log('MongoDB URI:', MONGO_URI);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};