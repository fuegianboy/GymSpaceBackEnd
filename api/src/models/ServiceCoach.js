const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ServiceCoach = sequelize.define('ServiceCoach', {
        serviceCoachID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userID: {
            type: DataTypes.UUID, 
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userID',
            },
        },
        serviceID: {
            type: DataTypes.UUID, 
            allowNull: false,
            references: {
                model: 'Services',
                key: 'serviceID',
            },
        },
    },{timestamps:false})
};