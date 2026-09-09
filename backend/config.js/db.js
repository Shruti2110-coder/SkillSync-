import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not set. Check your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(
      "If this is an Atlas cluster, check Network Access -> IP Access List."
    );
    process.exit(1);
  }
};

export default connectDB;
