const ParkingLot = require('../models/ParkingLot');
const ParkingSpot = require('../models/ParkingSpot');

exports.getParkingLots = async (req, res) => {
    try {
        const lots = await ParkingLot.findAll();
        res.json(lots);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching parking lots.' });
    }
};

exports.getParkingLotById = async (req, res) => {
    try {
        const { id } = req.params;
        const lot = await ParkingLot.findByPk(id, {
            include: [
                {
                    model: ParkingSpot,
                    as: 'parkingSpots',
                },
            ],
        });

        if (!lot) {
            return res.status(404).json({ error: 'Parking lot not found' });
        }

        res.json(lot);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching parking lot.' });
    }
};

exports.addParkingLots = async (req, res) => {
    try {
        const { name,total, available, hourlyRate, address } = req.body;

        // Validate required fields
        if (!name  || !available || !hourlyRate || !address) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const parkingLot = await ParkingLot.create({
            name,
            total,
            available,
            hourlyRate,
            address,
        });

        res.status(201).json(parkingLot);
    } catch (err) {
        console.error('Error creating parking lot:', err);
        res.status(500).json({ error: 'Error creating parking lot.', details: err.message });
    }
};