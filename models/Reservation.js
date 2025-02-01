const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect');

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
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    parkingSpotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ParkingSpots',
            key: 'id',
        },
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

// Define associations
Reservation.associate = (models) => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Reservation.belongsTo(models.ParkingSpot, { foreignKey: 'parkingSpotId', as: 'parkingSpot' });
};

module.exports = Reservation;
