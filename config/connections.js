const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  'DB_USER = ',
  'DB_PASS',
  'DB_Root',
  {
   
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;