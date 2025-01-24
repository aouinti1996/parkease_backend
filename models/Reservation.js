const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect');
const ParkingSpot = require('../models/ParkingSpot');
const User = require('../models/User');

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

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parkingSpotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

// Define associations inside the associate function
Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId' }); // References 'User' table
    Reservation.belongsTo(models.ParkingSpot, { foreignKey: 'parkingSpotId' }); // References 'ParkingSpot' table
};

module.exports = Reservation;
