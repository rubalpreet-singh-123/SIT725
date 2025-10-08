import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { Book } from "./models/Book.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/bookshelf", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => console.log(`BookShelf running at http://localhost:${PORT}`));
