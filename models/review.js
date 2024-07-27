const { DataTypes } = require('sequelize');
const sequelize = require('./connection'); 
const User = require('./user');
const Book = require('./book');

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Associations
Review.belongsTo(User, { foreignKey: 'UserId' });  // Each review belongs to one user
Review.belongsTo(Book, { foreignKey: 'BookId' });  // Each review belongs to one book

User.hasMany(Review, { foreignKey: 'UserId' });    // One user can have multiple reviews
Book.hasMany(Review, { foreignKey: 'BookId' });    // One book can have multiple reviews

module.exports = Review;
