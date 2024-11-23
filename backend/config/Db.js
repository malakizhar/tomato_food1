import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONG_URL)
      .then(console.log("DB is connected"));
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};
