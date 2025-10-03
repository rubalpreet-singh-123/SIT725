// server/models/Station.js
import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

export default mongoose.model("Station", stationSchema);
