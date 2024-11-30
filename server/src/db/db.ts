import mongoose from "mongoose";

export default function connectToDb(url: string) {
  try {
    mongoose.connect(url);
    console.log("Connected to MongoDB!");
  } catch (err: any) {
    console.log(err);
  }
}
