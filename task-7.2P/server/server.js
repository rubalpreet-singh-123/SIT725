import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { getAllBooks } from "../controllers/bookController.js";
import http from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/bookshelf")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", getAllBooks);
app.get("/chat", (req, res) => res.render("chat"));

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("chatMessage", (msg) => io.emit("chatMessage", msg));
  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

server.listen(PORT, () =>
  console.log(`BookShelf MVC with Socket running at http://localhost:${PORT}`)
);
