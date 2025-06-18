import mongoose from "mongoose";

export default connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_URI}/quickcart`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
