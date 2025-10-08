import Book from "../server/models/Book.js";

export const getAllBooks = async (req, res) => {
  console.log("Controller reached");
  try {
    const books = await Book.find({});
    console.log("Books fetched:", books.length);
    res.render("index", { books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Server error");
  }
};
