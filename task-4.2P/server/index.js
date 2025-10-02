// server/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import Station from "./models/Station.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(path.resolve(), "../client")));

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/locatesocket";

// connect DB
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo connected"))
  .catch(err => console.error("Mongo connect error", err));

// routes
app.get("/api/ping", (req, res) => res.json({ ok: true, time: new Date() }));

// get all stations
app.get("/api/stations", async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get single station
app.get("/api/stations/:id", async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ error: "Station not found" });
    res.json(station);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// root route
app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
