const Book = require('../models/book');

async function addBook(req, res) {
  try {
    const { title, author, publication_date, description, cover_image_url } = req.body;

    const existingBook = await Book.findOne({ where: { title, author } });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    const newBook = await Book.create({
      title,
      author,
      publication_date,
      description,
      cover_image_url,
    });

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


async function getBooksByTitle(req, res) {
  try {
    const { title } = req.query;

    const books = await Book.findAll({ where: { title } });

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with this title' });
    }

    res.json({ message: 'Books found', books });
  } catch (error) {
    console.error('Error fetching books by title:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getBooksByAuthor(req, res) {
  try {
    const { author } = req.query;

    const books = await Book.findAll({ where: { author } });

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with this author' });
    }

    res.json({ message: 'Books found', books });
  } catch (error) {
    console.error('Error fetching books by author:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getBooksByDescription(req, res) {
  try {
    const { description } = req.query;

    const books = await Book.findAll({ where: { description } });

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with this description' });
    }

    res.json({ message: 'Books found', books });
  } catch (error) {
    console.error('Error fetching books by description:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getAllBooks(req, res) {
  try {
    const books = await Book.findAll({
      attributes: ['id', 'title', 'author', 'publication_date', 'description', 'cover_image_url']
    });
    res.json({ message: 'Books found', books });
  } catch (error) {
    console.error('Error fetching all books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  addBook,
  getBooksByTitle,
  getBooksByAuthor,
  getBooksByDescription,
  getAllBooks,  
};
