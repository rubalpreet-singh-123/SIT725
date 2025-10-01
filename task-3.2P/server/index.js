// server/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// static client build (if you later build)
app.use(express.static(path.join(path.resolve(), "../client")));

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/locatesocket";

// minimal connection
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("Mongo connected"))
  .catch(err => console.error("Mongo connect error", err));

// Sample route
app.get("/api/ping", (req, res) => res.json({ ok: true, time: new Date() }));

// sample stations route (stub)
app.get("/api/stations", (req, res) => {
  // in production, query DB with filters; here we return static items for demo
  const stations = [
    { id: 1, name: "Uni Carpark A", lat: -37.9, lng: 145.2, price: 2.5, available: true },
    { id: 2, name: "Mall EV Bay", lat: -37.91, lng: 145.21, price: 3.0, available: false }
  ];
  res.json(stations);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "client/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
