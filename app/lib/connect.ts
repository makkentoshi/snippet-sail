async function connect(): Promise<void> {
  const mongoURL = process.env.MONGO_URL;

  if (!mongoURL) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  try {
    const mongoose = require("mongoose");

    mongoose
      .connect(mongoURL)
      .then(() => console.log("MongoDB is connected..."))
      .catch((err: Error) =>
        console.error("Error in connection to MongoDB", err)
      );
  } catch (error) {
    console.error(error);
  }
}

export default connect;
