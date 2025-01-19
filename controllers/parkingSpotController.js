const { ParkingSpot: ParkingSpotController } = require('../models/parkingSpot');

exports.getSpotsByLot = async (req, res) => {
    try {
        const { lotId } = req.params;
        const spots = await ParkingSpotController.findAll({ where: { lotId } });
        res.json(spots);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching spots.' });
    }
};

exports.reserveSpot = async (req, res) => {
    try {
        const { spotId, startTime, endTime, userId } = req.body;
        const totalCost = calculateCost(startTime, endTime); // Add your logic
        const reservation = await Reservation.create({ spotId, startTime, endTime, userId, totalCost });
        await ParkingSpotController.update({ isAvailable: false }, { where: { id: spotId } });
        res.status(201).json(reservation);
    } catch (err) {
        res.status(500).json({ error: 'Error reserving spot.' });
    }
};
