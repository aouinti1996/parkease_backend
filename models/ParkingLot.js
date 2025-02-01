const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.connect');

const ParkingLot = sequelize.define('ParkingLot', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hourlyRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    available: {
        type: DataTypes.INTEGER, // Added available field
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER, // Added total field
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = ParkingLot;

/*
{
    "name": "Parking Lot Tunis Centre",
    "hourlyRate": 2.5,
    "available": 20,
    "total": 50,
    "address": "Avenue Habib Bourguiba, Tunis"
},
{
    "name": "Parking Lot Sfax Port",
    "hourlyRate": 1.8,
    "available": 15,
    "total": 40,
    "address": "Port de Sfax, Sfax"
},
{
    "name": "Parking Lot La Marsa",
    "hourlyRate": 3.0,
    "available": 30,
    "total": 60,
    "address": "La Marsa Beach, Tunis"
},
{
    "name": "Parking Lot Carthage",
    "hourlyRate": 2.2,
    "available": 10,
    "total": 25,
    "address": "Carthage, Tunis"
},
{
    "name": "Parking Lot Ariana Mall",
    "hourlyRate": 2.0,
    "available": 50,
    "total": 100,
    "address": "Ariana Mall, Ariana"
},
{
    "name": "Parking Lot Sousse Marina",
    "hourlyRate": 1.5,
    "available": 40,
    "total": 80,
    "address": "Sousse Marina, Sousse"
},
{
    "name": "Parking Lot Monastir Airport",
    "hourlyRate": 2.8,
    "available": 15,
    "total": 35,
    "address": "Monastir Habib Bourguiba International Airport, Monastir"
},
{
    "name": "Parking Lot Hammamet Beach",
    "hourlyRate": 3.5,
    "available": 25,
    "total": 55,
    "address": "Hammamet Beach, Hammamet"
}*/
