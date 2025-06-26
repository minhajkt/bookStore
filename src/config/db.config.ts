import mongoose from "mongoose";
import { config } from "./env.config";

// connection for mongodb
export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI as string);
    console.log("MongoDB is Connected Successfully");
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1);
  }
};
