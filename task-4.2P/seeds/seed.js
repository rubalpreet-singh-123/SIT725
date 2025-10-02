// seeds/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Station from "../server/models/Station.js";

dotenv.config();
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/locatesocket";

mongoose.connect(MONGO)
  .then(async () => {
    console.log("Connected, seeding...");
    await Station.deleteMany();

    await Station.insertMany([
      { name: "Uni Carpark A", lat: -37.9, lng: 145.2, price: 2.5, available: true },
      { name: "Mall EV Bay", lat: -37.91, lng: 145.21, price: 3.0, available: false }
    ]);

    console.log("Seeding done");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
