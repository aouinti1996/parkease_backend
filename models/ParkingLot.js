// models/ParkingLot.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect');


    const ParkingLot = sequelize.define('ParkingLot', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hourlyRate: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0, // Ensures hourly rate is not negative
            },
        },
    }, {
        timestamps: true, // Automatically adds createdAt and updatedAt
    });

    module.exports = ParkingLot;