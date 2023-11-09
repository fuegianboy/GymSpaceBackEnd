const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserProducts = sequelize.define('UserServices', {
        userServicesID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        finishDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: false, 
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
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isGreaterThanZero(value) {
                    if (value <= 0) {
                        throw new Error('Quantity should be more than zero.');
                    }
                },
            }
        },
        unitPrice: {
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },{timestamps:false})

    UserServices.associate = (models) => {
        UserServices.belongsTo(models.Users, {
            foreignKey: 'userID',
            allowNull: false,
        });
        UserServices.belongsTo(models.Services, {
            foreignKey: 'serviceID',
            allowNull: false,
        });
    };
    return UserProducts;
};


