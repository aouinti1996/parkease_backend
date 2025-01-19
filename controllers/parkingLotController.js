const { ParkingLot: ParkingLotController } = require('../models/parkingLot');

exports.getParkingLots = async (req, res) => {
    try {
        const lots = await ParkingLotController.findAll();
        res.json(lots);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching parking lots.' });
    }
};
