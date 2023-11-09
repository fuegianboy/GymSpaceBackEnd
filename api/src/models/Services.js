const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Services', {
    serviceID: {
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
    startTime: {
      type: DataTypes.ENUM(
        '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', 'M', 'T', 'N'
      ),
      allowNull: false,
    },
    duration: {
        type: DataTypes.ENUM('45', '60', '90'),
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
    coachID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isGreaterThanZero(value) {
              if (value <= 0) {
                throw new Error('Capacity should be more than zero.');
              }
            },
        }
    },
    areaID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },{timestamps:false});
};