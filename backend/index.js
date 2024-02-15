// const express = require("express");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(202).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(202).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

app.get("/books/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = await Book.findOne({ isbn: isbn });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/newBook", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.genre ||
      !req.body.publication_year ||
      !req.body.isbn ||
      !req.body.copies_available
    ) {
      return res.status(500).send({ message: "send all required params ✌️" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publication_year: req.body.publication_year,
      isbn: req.body.isbn,
      copies_available: req.body.copies_available,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

app.put("/editBook/:isbn", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.genre ||
      !req.body.publication_year ||
      !req.body.isbn ||
      !req.body.copies_available
    ) {
      return res.status(500).send({ message: "send all required params ✌️" });
    }

    const isbn = req.params.isbn;

    const editedBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publication_year: req.body.publication_year,
      isbn: req.body.isbn,
      copies_available: req.body.copies_available,
    };

    const newBook = await Book.updateOne({ isbn: isbn }, editedBook);

    if (newBook) return res.status(202).send(newBook);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

app.delete("/books/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const deletedBook = await Book.findOneAndDelete({ isbn: isbn });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("we are connected 🔗");

    app.listen(PORT, (err) => {
      console.log(`yay! i am a fullstack dev, http://localhost:${PORT}`);

      if (err) console.log("err: server is out of service.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
