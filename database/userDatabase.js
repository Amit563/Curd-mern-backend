import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGOURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGOURL);
    console.log(` MongoDB connected || DB HOST ${connection}`);
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
