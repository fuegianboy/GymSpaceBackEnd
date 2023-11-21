const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Coaches', {
    userID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false, // validar por regex link a image
    },    
    valuation: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },{timestamps:false});
};