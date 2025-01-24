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
ParkingLot.associate = (models) => {
    ParkingLot.hasMany(models.ParkingSpot, { foreignKey: 'lotsId' });
};
    module.exports = ParkingLot;
  /*  json
{
    "name": "Parking Tunis Centre",
    "address": "Avenue Habib Bourguiba, Tunis",
    "hourlyRate": 2.0,
    "createdAt": "2025-01-24T10:00:00Z",
    "updatedAt": "2025-01-24T10:00:00Z"
},
{
    "name": "Parking La Marsa",
    "address": "Rue de La Corniche, La Marsa",
    "hourlyRate": 1.5,
    "createdAt": "2025-01-24T10:00:00Z",
    "updatedAt": "2025-01-24T10:00:00Z"
},
{
    "name": "Parking Ariana City",
    "address": "Avenue de l'Indépendance, Ariana",
    "hourlyRate": 2.0,
    "createdAt": "2025-01-24T10:00:00Z",
    "updatedAt": "2025-01-24T10:00:00Z"
},
{
    "name": "Parking Lac 1",
    "address": "Rue du Lac, Les Berges du Lac",
    "hourlyRate": 2.5,
    "createdAt": "2025-01-24T10:00:00Z",
    "updatedAt": "2025-01-24T10:00:00Z"
},
{
    "name": "Parking Lac 2",
    "address": "Rue du Lac 2, Les Berges du Lac",
    "hourlyRate": 3.0,
    "createdAt": "2025-01-24T10:00:00Z",
    "updatedAt": "2025-01-24T10:00:00Z"
}*/