const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserProducts = sequelize.define('UserProducts', {
        userProductID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
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
                        throw new Error('Price should be more than zero.');
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

    UserProducts.associate = (models) => {
        UserProducts.belongsTo(models.Users, {
            foreignKey: 'userID',
            allowNull: false,
        });
        UserProducts.belongsTo(models.Products, {
            foreignKey: 'productID',
            allowNull: false,
        });
    };
    return UserProducts;
};


