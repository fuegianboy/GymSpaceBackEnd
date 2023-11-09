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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isWithinRange(value) {
                if (value < 1 || value > 10) {
                    throw new Error('Valuation should be between 1 and 10.');
                }
            },
        },
    },
  },{timestamps:false});
};