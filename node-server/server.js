const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;
const dbUrl = process.env.MONGO_CONNECTION_STRING;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Application-json');
  next();
});
mongoose.connect(dbUrl);

const bookSchema = new mongoose.Schema({
  name: String,
  description: String,
  publishDate: Date,
  price: Number
});

const Book = mongoose.model('Book', bookSchema);

app.use(bodyParser.json());

// List all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new book
app.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update an existing book
app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (deletedBook) {
      res.sendStatus(204);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
