import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`mongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

export default connectDB;

