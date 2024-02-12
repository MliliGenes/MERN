import mongoose, { model } from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  publication_year: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  copies_available: {
    type: Number,
    required: true,
  },
});

export const Book = mongoose.model("Book", bookSchema);
