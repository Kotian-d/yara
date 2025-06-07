import "dotenv/config";
import mongoose from "mongoose";

export default async function ConnectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    return;
  } catch (error) {
    console.log(error);
  }
}
