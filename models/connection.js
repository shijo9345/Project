const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Book-Review', 'postgres', 'qwert@123', {
  host: 'localhost', 
  dialect: 'postgres',
});

module.exports = sequelize;
