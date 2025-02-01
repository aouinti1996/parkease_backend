const ParkingSpot = require('../models/ParkingSpot');
const ParkingLot = require('../models/ParkingLot');

exports.getAllParkingSpots = async (req, res) => {
    try {
        const spots = await ParkingSpot.findAll();
        res.json(spots);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching parking spots.' });
    }
};

exports.addParkingSpot = async (req, res) => {
    const { lotId, number, isAvailable } = req.body;

    try {
        // Check if the ParkingLot exists
        const parkingLot = await ParkingLot.findByPk(lotId);
        if (!parkingLot) {
            return res.status(404).json({ message: 'ParkingLot not found' });
        }

        // Validate required fields
        if (!lotId || !number || isAvailable === undefined ) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new ParkingSpot
        const parkingSpot = await ParkingSpot.create({
            lotId,
            number,
            isAvailable
        });

        res.status(201).json(parkingSpot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding ParkingSpot', error });
    }
};