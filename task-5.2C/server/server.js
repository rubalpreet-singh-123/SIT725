import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { getAllBooks } from "../controllers/bookController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/bookshelf")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Route comes BEFORE static files
app.get("/", getAllBooks);

// Static files come last
app.use(express.static(path.join(__dirname, "../public")));

app.listen(PORT, () =>
  console.log(`BookShelf MVC running at http://localhost:${PORT}`)
);
