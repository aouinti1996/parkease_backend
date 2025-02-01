const sequelize = require('../config/db.connect');
const User = require('./User');
const ParkingLot = require('./ParkingLot');
const ParkingSpot = require('./ParkingSpot');
const Reservation = require('./Reservation');

// Register associations after all models are loaded
User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
Reservation.belongsTo(User, { foreignKey: 'userId', as: 'user' });

ParkingLot.hasMany(ParkingSpot, { foreignKey: 'lotId', as: 'parkingSpots' });
ParkingSpot.belongsTo(ParkingLot, { foreignKey: 'lotId', as: 'parkingLot' });

ParkingSpot.hasMany(Reservation, { foreignKey: 'parkingSpotId', as: 'reservations' });
Reservation.belongsTo(ParkingSpot, { foreignKey: 'parkingSpotId', as: 'parkingSpot' });

module.exports = { sequelize, User, ParkingLot, ParkingSpot, Reservation };
