import mongoose from "mongoose";

console.log("MONGODB_URI:", process.env.MONGODB_URI);

async function connect(): Promise<void> {
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  const mongoURL = process.env.MONGODB_URI;

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
