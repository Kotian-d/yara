import "dotenv/config";
import mongoose from "mongoose";

export default async function ConnectDB() {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    return conn;
  } catch (error) {
    console.log(error);
  }
}
