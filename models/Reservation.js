// models/Reservation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect');
 const ParkingSpot = require('../models/parkingSpot');
 const User = require('../models/user');

const Reservation = sequelize.define('Reservation', {
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

// Define associations inside the associate function
Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId' }); // Automatically uses 'userId' as foreign key
    Reservation.belongsTo(models.ParkingSpot, { foreignKey: 'parkingSpotId' }); // Automatically uses 'spotId' as foreign key
};

module.exports = Reservation;
