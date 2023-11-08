const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Products', {
    productID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isGreaterThanZero(value) {
              if (value <= 0) {
                throw new Error('Price should be more than zero.');
              }
            },
        }
    },
    stockNow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isGreaterThanZero(value) {
              if (value <= 0) {
                throw new Error('Price should be more than zero.');
              }
            },
        }
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false, // validar por regex link a image
    },    
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },{timestamps:false});
};