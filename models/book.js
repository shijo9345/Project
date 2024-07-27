const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publication_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cover_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  });
  
  module.exports = Book;
