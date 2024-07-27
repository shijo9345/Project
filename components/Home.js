import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

import Image1 from '../images/books1.png';
import Image2 from '../images/books2.jpg';
import Image3 from '../images/books3.jpg';
import Image4 from '../images/books4.jpg';
import Image5 from '../images/books5.jpg';
import Image6 from '../images/books6.jpg';
import Image7 from '../images/books7.jpg';
import Image8 from '../images/books8.jpg';
import Image9 from '../images/books9.jpg';
import Image10 from '../images/books10.jpg';
import Image11 from '../images/books11.jpg';
import Image12 from '../images/books12.jpg';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Pass search query to parent component
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-content" onClick={() => navigate('/')}>
          <h1 className="navbar-title">Books Store</h1>
          {/* You can also use an image/logo instead of text */}
          {/* <img src={logoImage} alt="Logo" className="navbar-logo" /> */}
        </div>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
      </div>
      <div className="navbar-right">
        <button className="navbar-btn" onClick={() => navigate('/register')}>
          Register
        </button>
        <button className="navbar-btn" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </nav>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'Paul Rix', price: '$2', imgSrc: Image1 },
    { id: 2, name: 'Earth vs Alien', price: '$2', imgSrc: Image2 },
    { id: 3, name: 'Earth Tremors', price: '$2', imgSrc: Image3 },
    { id: 4, name: `Earth's Requiem `, price: '$2', imgSrc: Image4 },
    { id: 5, name: 'Smoldering Ember', price: '$2', imgSrc: Image5 },
    { id: 6, name: 'Reaper of Earth', price: '$2', imgSrc: Image6 },
    { id: 7, name: 'Shattered Worlds', price: '$2', imgSrc: Image7 },
    { id: 8, name: 'Ender of Worlds', price: '$2', imgSrc: Image8 },
    { id: 9, name: 'Lord of the Fallen', price: '$2', imgSrc: Image9 },
    { id: 10, name: 'Fae Forsaken', price: '$2', imgSrc: Image10 },
    { id: 11, name: 'Vicious FAE', price: '$2', imgSrc: Image11 },
    { id: 12, name: 'Song of Blood', price: '$2', imgSrc: Image12 }
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = () => {
    navigate('/login');
  };

  return (
    <div>
      <Navbar onSearch={setSearchQuery} />
      <section id="product">
        <div className="container">
          <div className="row">
            {filteredProducts.map(product => (
              <div key={product.id} className="column">
                <div className="card">
                  <img src={product.imgSrc} alt={product.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name} - {product.price}</h5>
                    <button className="btn-primary" onClick={handleAddToCart}>
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;