require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const Users = require("./models/Users")
const Products = require("./models/Products")
const UserProducts = require("./models/UserProducts")
const Services = require("./models/Services")
const UserServices = require("./models/UserServices")
const Coaches = require("./models/Coaches")

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   {
      logging: false, 
      native: false, 
   }
);

Users(sequelize)
Products(sequelize)
UserProducts(sequelize)
Services(sequelize)
UserServices(sequelize)
Coaches(sequelize)

module.exports = {
   ...sequelize.models,
   conn: sequelize, 
};