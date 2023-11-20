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
            allowNull: true,
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
        userID: {
            type: DataTypes.UUID, 
            references: {
                model: 'Users',
                key: 'userID',
            },
        },
        productID: {
            type: DataTypes.UUID, 
            references: {
                model: 'Products',
                key: 'productID',
            },
        },
        status: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        picture_url:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        currency_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mp_payment_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mp_status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mp_merchant_order_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mp_external_reference: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    },{timestamps:false})

};
