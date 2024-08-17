import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

async function connect() {
  const mongoURL = process.env.MONGODB_URI;

  if (isConnected) {
    console.log("Already connected.");
    return;
  }

  if (mongoose.connections[0].readyState) {
    isConnected = true;
    console.log("MongoDB is already connected.");
    return;
  }

  if (!mongoURL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoURL);
    console.log("MongoDB is connected...");
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

export default connect;
