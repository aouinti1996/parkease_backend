const  ParkingLot = require('../models/parkingLot');
const bcrypt = require("bcrypt");
const User = require("../models/User");


exports.getParkingLots = async (req, res) => {
    try {
        const lots = await ParkingLot.findAll(); // Use ParkingLot.findAll() instead of ParkingLotController.findAll()
        res.json(lots);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching parking lots.' });
    }
};

exports.addParkingLots = async (req, res) => {
    try {
        const { name, address, hourlyRate } = req.body;
        const parkingLot = await ParkingLot.create({ name, address, hourlyRate });

        // Respond with the created parking lot
        res.status(201).json(parkingLot);
    } catch (err) {
        console.error('Error creating parking lot:', err); // Log detailed error
        res.status(500).json({ error: 'Error creating parking lot.', details: err.message });
    }
}
//list of parking lot in tunisia
 //   [
   // { "name": "Parking Tunis Centre", "address": "Avenue Habib Bourguiba, Tunis", "hourlyRate": 2.0 },
     //   { "name": "Parking La Marsa", "address": "Rue de La Corniche, La Marsa", "hourlyRate": 1.5 },
// { "name": "Parking Ariana City", "address": "Avenue de l'Indépendance, Ariana", "hourlyRate": 2.0 },
     //
  //  ]
