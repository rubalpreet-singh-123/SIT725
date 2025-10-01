import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static page
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// GET endpoint: /add?a=5&b=7
app.get("/add", (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).json({ error: "Invalid numbers" });
  res.json({ a, b, sum: a + b });
});

// POST endpoint: /add
app.post("/add", (req, res) => {
  const { a, b } = req.body;
  if (isNaN(Number(a)) || isNaN(Number(b)))
    return res.status(400).json({ error: "Invalid numbers" });
  res.json({ a, b, sum: Number(a) + Number(b) });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
