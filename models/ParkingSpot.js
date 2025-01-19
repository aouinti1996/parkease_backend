// models/ParkingSpot.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect');


    const ParkingSpot = sequelize.define('ParkingSpot', {
        lotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Default to true, meaning the spot is available by default
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true, // Automatically adds createdAt and updatedAt
    });

    ParkingSpot.associate = (models) => {
        ParkingSpot.belongsTo(models.ParkingLot, { foreignKey: 'lotId' });
    };

module.exports = ParkingSpot;
