import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5001/api/books');
        setBooks(response.data.books);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="book-list-container">
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="navbar-item">Books</a>
        </div>
        <div className="navbar-right">
          <button className="navbar-button" onClick={() => navigate('/profile')}>Profile</button>
          <button className="navbar-button" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </nav>

      <h1 className="book-list-heading">Books List</h1>
      {books.length > 0 ? (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <div className="book-cover">
                {book.cover_image_url && (
                  <img src={book.cover_image_url} alt={book.title} className="book-image" />
                )}
              </div>
              <div className="book-details">
                <h2 className="book-title">{book.title}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publication Date:</strong> {book.publication_date}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <button
                  className="review-button"
                  onClick={() => navigate('/review')}
                >
                  Review
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-books">No books found</p>
      )}
    </div>
  );
}

export default BookList;
