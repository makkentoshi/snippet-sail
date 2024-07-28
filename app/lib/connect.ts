import mongoose, { mongo } from "mongoose";

async function connect(): Promise<void> {
  const MONGO_URL = process.env.MONGO_URL;
  
  
  if (!MONGO_URL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("db connected...");
  } catch (error) {
    console.error(error);
  }
}

export default connect;
