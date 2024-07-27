const Review = require('../models/review');
const User = require('../models/user');
const Book = require('../models/book');

async function addReview(req, res) {
  try {
    const { rating, review_text, email, title } = req.body; 

    if (!email || !title) {
      return res.status(400).json({ message: 'Email and book title are required' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const book = await Book.findOne({ where: { title } });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const newReview = await Review.create({
      rating,
      review_text,
      UserId: user.id,
      BookId: book.id, 
    });

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getReviewsByBook(req, res) {
  try {
    const { bookId } = req.params;  

    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const book = await Book.findByPk(bookId);  
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const reviews = await Review.findAll({
      where: { BookId: book.id },
      include: [{ model: User, attributes: ['id', 'name'] }],
    });

    res.json({ message: 'No Reviews', reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params; // Assuming you are passing the review ID as a URL parameter

    if (!reviewId) {
      return res.status(400).json({ message: 'Review ID is required' });
    }
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.destroy();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  addReview,
  getReviewsByBook,
  deleteReview,
};
