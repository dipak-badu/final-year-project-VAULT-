import mongoose from "mongoose";

const connectDB = async () => {
  console.log("MONGODB_URI =", process.env.MONGODB_URI);

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected!!");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};

export default connectDB;
