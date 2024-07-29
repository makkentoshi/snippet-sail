console.log("MONGODB_URI:", process.env.MONGODB_URI);
async function connect(): Promise<void> {
  console.log("MMONGODB_URI:", process.env.MONGODB_URI);
  const mongoURL = process.env.MONGODB_URI;

  if (!mongoURL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    const mongoose = require("mongoose");

    mongoose
      .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("MongoDB is connected..."))
      .catch((err: Error) => {
        console.error("Error in connection to MongoDB", err);
      });
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

export default connect;
