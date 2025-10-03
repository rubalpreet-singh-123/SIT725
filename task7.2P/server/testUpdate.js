import mongoose from "mongoose";
import Station from "./models/Station.js";

const MONGO = "mongodb://127.0.0.1:27017/locatesocket";

async function run() {
  await mongoose.connect(MONGO);
  console.log("Connected");

  const result = await Station.updateOne(
    { name: "Uni Carpark A" },
    { available: true }
  );

  console.log("Update result:", result);
  process.exit();
}

run();
