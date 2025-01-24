
const ParkingSpot= require('../models/ParkingSpot');
const ParkingLot= require('../models/ParkingLot');


const getAllParkingSpots = async (req, res) => {
    try {
        const spots = await ParkingSpot.findAll(); // Use ParkingLot.findAll() instead of ParkingLotController.findAll()
        res.json(spots);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching parking lots.' });
    }
};

// Add a new ParkingSpot
const addParkingSpot = async (req, res) => {
    const { lotId, number, isAvailable } = req.body;

    try {
        // Check if the ParkingLot exists
        const parkingLot = await ParkingLot.findByPk(lotId);
        if (!parkingLot) {
            return res.status(404).json({ message: 'ParkingLot not found' });
        }

        // Create a new ParkingSpot
        const parkingSpot = await ParkingSpot.create({
            lotId,
            number,
            isAvailable
        });

        // Return the newly created ParkingSpot
        return res.status(201).json(parkingSpot);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding ParkingSpot', error });
    }
};

module.exports = { addParkingSpot ,getAllParkingSpots};

