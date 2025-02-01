const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect');
const ParkingLot = require('./ParkingLot'); // Import ParkingLot
const Reservation = require('./Reservation');

const ParkingSpot = sequelize.define('ParkingSpot', {
    lotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ParkingLots',
            key: 'id',
        },
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Define associations
ParkingSpot.associate = (models) => {
    ParkingSpot.belongsTo(models.ParkingLot, {
        foreignKey: 'lotId',
        as: 'parkingLot',
    });

    // One parking spot can have multiple reservations over time
    ParkingSpot.hasMany(models.Reservation, {
        foreignKey: 'parkingSpotId',
        as: 'reservations',
    });
};

module.exports = ParkingSpot;

/*
data :
    INSERT INTO parkingspots (lotId, isAvailable, number) VALUES
(1, 'false', 'A1'),
    (1, 'false', 'A2'),
    (1, 'false', 'A3'),
    (1, 'false', 'A4'),
    (1, 'false', 'A5'),
    (1, 'false', 'A6'),
    (1, 'false', 'A7'),
    (1, 'false', 'A8'),
    (1, 'false', 'A9'),
    (1, 'false', 'A10'),
    (1, 'false', 'B1'),
    (1, 'false', 'B2'),
    (1, 'false', 'B3'),
    (1, 'false', 'B4'),
    (1, 'false', 'B5'),
    (1, 'false', 'B6'),
    (1, 'false', 'B7'),
    (1, 'false', 'B8'),
    (1, 'false', 'B9'),
    (1, 'false', 'B10'),
    (1, 'false', 'C1'),
    (1, 'false', 'C2'),
    (1, 'false', 'C3'),
    (1, 'false', 'C4'),
    (1, 'false', 'C5'),
    (1, 'false', 'C6'),
    (1, 'false', 'C7'),
    (1, 'false', 'C8'),
    (1, 'false', 'C9'),
    (1, 'false', 'C10'),
    (1, 'false', 'D1'),
    (1, 'false', 'D2'),
    (1, 'false', 'D3'),
    (1, 'false', 'D4'),
    (1, 'false', 'D5'),
    (1, 'false', 'D6'),
    (1, 'false', 'D7'),
    (1, 'false', 'D8'),
    (1, 'false', 'D9'),
    (1, 'false', 'D10'),
    (1, 'false', 'E1'),
    (1, 'false', 'E2'),
    (1, 'false', 'E3'),
    (1, 'false', 'E4'),
    (1, 'false', 'E5'),
    (1, 'false', 'E6'),
    (1, 'false', 'E7'),
    (1, 'false', 'E8'),
    (1, 'false', 'E9'),
    (1, 'false', 'E10');
*/
