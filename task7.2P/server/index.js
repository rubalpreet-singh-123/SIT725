// server/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import Station from "./models/Station.js";

dotenv.config();

// fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);   // create HTTP server for socket.io
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

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
  res.sendFile(path.join(__dirname, "../client/index.html"));
});


// 🔹 SOCKET.IO HANDLERS
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // Send initial list of stations
  socket.on("getStations", async () => {
    const stations = await Station.find();
    socket.emit("stationsData", stations);
  });

  // Example: update availability and broadcast change
  socket.on("updateStation", async ({ id, available }) => {
    try {
      const station = await Station.findByIdAndUpdate(
        id,
        { available },
        { new: true }
      );
      if (station) {
        io.emit("stationUpdated", station); // broadcast update to all
      }
    } catch (err) {
      console.error("Error updating station:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// start server with socket
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
