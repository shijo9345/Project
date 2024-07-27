import React, { useState } from 'react';
import axios from 'axios';

const ReviewPage = () => {
  // States for adding a review
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [addMessage, setAddMessage] = useState('');

  // States for deleting a review
  const [deleteBookId, setDeleteBookId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  // States for viewing reviews
  const [viewBookId, setViewBookId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [viewMessage, setViewMessage] = useState('');

  // Function to add a review
  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/review/:bookId/add', { rating, review_text: reviewText, email, title });
      setAddMessage(response.data.message);
    } catch (error) {
      setAddMessage(error.response?.data?.message || 'Error adding review');
    }
  };

  // Function to delete a review
  const handleDeleteReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5001/review/${deleteBookId}`);
      setDeleteMessage(response.data.message);
    } catch (error) {
      setDeleteMessage(error.response?.data?.message || 'Error deleting review');
    }
  };

  // Function to view reviews
  const handleViewReviews = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5001/review/${viewBookId}`);
      setReviews(response.data.reviews);
      setViewMessage(response.data.message);
    } catch (error) {
      setViewMessage(error.response?.data?.message || 'Error fetching reviews');
    }
  };

  return (
    <div>
      <h1>Review Manager</h1>

      {/* Add Review Section */}
      <div>
        <h2>Add Review</h2>
        <form onSubmit={handleAddReview}>
          <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
          <textarea placeholder="Review Text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required></textarea>
          <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <button type="submit">Add Review</button>
        </form>
        {addMessage && <p>{addMessage}</p>}
      </div>

      {/* Delete Review Section */}
      <div>
        <h2>Delete Review</h2>
        <form onSubmit={handleDeleteReview}>
          <input type="text" placeholder="Review ID" value={deleteBookId} onChange={(e) => setDeleteBookId(e.target.value)} required />
          <button type="submit">Delete Review</button>
        </form>
        {deleteMessage && <p>{deleteMessage}</p>}
      </div>

      {/* View Reviews Section */}
      <div>
        <h2>View Reviews</h2>
        <form onSubmit={handleViewReviews}>
          <input type="text" placeholder="Book ID" value={viewBookId} onChange={(e) => setViewBookId(e.target.value)} required />
          <button type="submit">Get Reviews</button>
        </form>
        {viewMessage && <p>{viewMessage}</p>}
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review_text}</p>
              <p>User: {review.User.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewPage;
