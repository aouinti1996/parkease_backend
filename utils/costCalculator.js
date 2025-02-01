const ParkingLot = require('../models/ParkingLot');
const ParkingSpot = require('../models/ParkingSpot');

const calculateCost = async (startTime, endTime, parkingSpotId) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Get total hours parked
    const durationHours = Math.ceil((end - start) / (1000 * 60 * 60));

    // Get the hourly rate from the parking lot
    const parkingSpot = await ParkingSpot.findByPk(parkingSpotId, { include: 'parkingLot' });

    if (!parkingSpot || !parkingSpot.parkingLot) {
        throw new Error('Parking lot not found');
    }

    const hourlyRate = parkingSpot.parkingLot.hourlyRate;

    return durationHours * hourlyRate;
};

module.exports = calculateCost;
