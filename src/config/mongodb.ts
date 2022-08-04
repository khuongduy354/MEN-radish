import mongoose from "mongoose";

async function start_server() {
  if (process.env.DB_URL) return await mongoose.connect(process.env.DB_URL);
  console.log("Can't connect to DB");
}
