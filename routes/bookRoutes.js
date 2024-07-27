const express = require('express');
const router = express.Router();
const {
  addBook,
  getBooksByTitle,
  getBooksByAuthor,
  getBooksByDescription,
  getAllBooks,
} = require('../controllers/bookController'); 


router.post('/book', addBook);
router.get('/books', getAllBooks);
router.get('/books/by-title', getBooksByTitle);
router.get('/books/by-author', getBooksByAuthor);
router.get('/books/by-description', getBooksByDescription);

module.exports = router;
