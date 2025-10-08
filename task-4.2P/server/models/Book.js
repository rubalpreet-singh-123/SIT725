import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  image: String
});

export const Book = mongoose.model("Book", bookSchema);
