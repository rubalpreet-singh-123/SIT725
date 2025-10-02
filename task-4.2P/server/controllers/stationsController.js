import Station from "../models/Station.js";

// GET /api/stations with filters
export async function listStations(req, res) {
  try {
    const { q, minPrice, maxPrice, available } = req.query;
    const filter = {};

    if (q) filter.name = { $regex: q, $options: "i" };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (available === "true") filter.available = true;
    if (available === "false") filter.available = false;

    const stations = await Station.find(filter).sort({ price: 1 });
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// GET /api/stations/:id
export async function getStation(req, res) {
  try {
    const s = await Station.findById(req.params.id);
    if (!s) return res.status(404).json({ error: "Not found" });
    res.json(s);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
}
