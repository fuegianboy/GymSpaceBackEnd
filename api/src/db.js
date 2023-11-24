require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const Users = require("./models/Users")
const Products = require("./models/Products")
const UserProducts = require("./models/UserProducts")
const Services = require("./models/Services")
const UserServices = require("./models/UserServices")
const Coaches = require("./models/Coaches")
const Reviews = require("./models/Reviews")
const Favorites = require("./models/Favorites")

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
Reviews(sequelize)
Favorites(sequelize)


const models = sequelize.models;
// relacion User - UserServices - Services
models.Users.hasMany(models.UserServices, { foreignKey: 'userID' });
models.UserServices.belongsTo(models.Users, { foreignKey: 'userID' });

models.Services.hasMany(models.UserServices, { foreignKey: 'serviceID' });
models.UserServices.belongsTo(models.Services, { foreignKey: 'serviceID' });



// relacion User - UserProducts - Products
models.Users.hasMany(models.UserProducts, { foreignKey: 'userID' });
models.UserProducts.belongsTo(models.Users, { foreignKey: 'userID' });

models.Products.hasMany(models.UserProducts, { foreignKey: 'productID' });
models.UserProducts.belongsTo(models.Products, { foreignKey: 'productID' });


// relacion UserProducts - Reviews
models.UserServices.hasMany(models.Reviews, { foreignKey: 'userServicesID' });
models.Reviews.belongsTo(models.UserServices, { foreignKey: 'userServicesID' });



// relacion Users - Favorites - Products - Services

// models.Users.hasMany(models.Favorites, { foreignKey: 'userID' });
// models.Favorites.belongsTo(models.Users, { foreignKey: 'userID' });

// models.Products.belongsToMany(models.Users, { through: models.Favorites, foreignKey: 'productID' });
// models.Users.belongsToMany(models.Products, { through: models.Favorites, foreignKey: 'userID' });

// models.Services.belongsToMany(models.Users, { through: models.Favorites, foreignKey: 'serviceID' });
// models.Users.belongsToMany(models.Services, { through: models.Favorites, foreignKey: 'userID' });

//----------------------------------------------------------
// relacion Users - Favorites - Products
// models.Users.hasMany(models.Favorites, { foreignKey: 'userID' });
// models.Favorites.belongsTo(models.Users, { foreignKey: 'userID' });

// models.Products.belongsToMany(models.Users, { through: models.Favorites, foreignKey: 'productID', as: 'ProductFavorites' });
// models.Users.belongsToMany(models.Products, { through: models.Favorites, foreignKey: 'userID', as: 'UserFavoriteProducts' });

// relacion Users - Favorites - Services
// models.Services.belongsToMany(models.Users, { through: models.Favorites, foreignKey: 'serviceID', as: 'ServiceFavorites' });
// models.Users.belongsToMany(models.Services, { through: models.Favorites, foreignKey: 'userID', as: 'UserFavoriteServices' });

//----------------------------------------------------------

module.exports = {
   ...sequelize.models,
   conn: sequelize, 
};
