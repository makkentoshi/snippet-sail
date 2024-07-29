import mongoose from "mongoose";

async function testConnection() {
  const mongoURL = process.env.MONGODB_URI || ''
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB is connected...");

    const userSchema = new mongoose.Schema(
      {
        clerkUserId: { type: String, unique: true, required: true },
        emailAddress: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );

    const User = mongoose.model("User", userSchema);

    const newUser = {
      clerkUserId: "testUserId",
      emailAddress: "test@example.com",
    };

    await User.create(newUser);
    console.log("Test user created successfully");

    const users = await User.find({});
    console.log("Users in database:", users);
  } catch (error) {
    console.error("Error during MongoDB operations:", error);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
