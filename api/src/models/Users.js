const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Users', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false, // validar por regex
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // validar por regex o usar con outzero, no va aca
    },
    birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
              args: [['male', 'female', 'other', 'prefer not to say']],
              msg: 'Gender should be "male", "female", "other" o "prefer not to say"',
            },
      },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false, // validar x regex
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: false, // validar x regex
    },    
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    enrollmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    systemRole: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
              args: [['Admin', 'Coach', 'Guest', 'User']],
              msg: 'Role should be "Admin", "Coach", "Guest", "User"',
            },
        }
    },
    valuation: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    favoriteProducts: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
    },    
    favoriteServices: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
    },
    cart: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
    },

  },{timestamps:false});
};