const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Favorites', {
    favoriteID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userID',
        },
    },
    productID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Products',
            key: 'productID',
        },
    },
    serviceID: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Services',
            key: 'serviceID',
        }
    }
  },{timestamps:false});
};