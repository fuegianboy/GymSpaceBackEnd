const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Reviews', {
    reviewID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userServicesID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'UserServices',
            key: 'userServicesID',
        },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    display: {
      type: DataTypes.ENUM('tocheck', 'display', 'nodisplay'),
      allowNull: true,
    },
  },{timestamps:false});
};
