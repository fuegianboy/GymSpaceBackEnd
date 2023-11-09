require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const Users = require("./models/Users")
const Products = require("./models/Products")
const UserProducts = require("./models/UserProducts")



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


// const { Users, Products, UserProduct } = sequelize.models;

// Users.belongsToMany(Products, { through: 'UserProduct' });
// Products.belongsToMany(Users, { through: 'UserProduct' });


module.exports = {
   ...sequelize.models, 
   conn: sequelize, 
};