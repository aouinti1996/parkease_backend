// controllers/parkingController.js
const ParkingSpot = require('../models/ParkingSpot');
const Reservation = require('../models/Reservation');
const ParkingLot = require('../models/ParkingLot');
const { calculateCost } = require('../utils/costCalculator');

exports.reservation = async (req, res) => {
    try {
        const startTime = "2025-01-25T10:00:00Z";
        const endTime = "2025-01-25T10:01:00Z";
        const userId = 1;
        const parkingSpotId = 1;

        if (!parkingSpotId || !startTime || !endTime || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }




        // Include associated ParkingLot using the correct alias
        const spot = await ParkingSpot.findByPk(parkingSpotId, {
            include: {
                model: ParkingLot,
                as: 'parkingLot', // Use the correct alias defined in the association
                attributes: ['hourlyRate'],
            },
        });

        if (!spot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }

        if (!spot.isAvailable) {
            return res.status(400).json({ error: 'Parking spot is already reserved' });
        }

        const totalCost = calculateCost(startTime, endTime, spot.parkingLot.hourlyRate);


        const reservation = await Reservation.create({
            parkingSpotId,
            startTime,
            endTime,
            userId,
            totalCost,
        });

        await spot.update({ isAvailable: false });

        res.status(201).json({
            message: 'Reservation successful',
            reservation,
        });
    } catch (err) {
        console.error('Error reserving spot:', err);
        res.status(500).json({ error: 'Error reserving spot', details: err.message });
    }
};
