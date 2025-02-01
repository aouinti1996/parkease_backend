


const { User, ParkingSpot, ParkingLot, Reservation } = require('../models'); // Ensure to import all models

exports.reserveSpot = async (req, res) => {
    try {
        const { parkingSpotId, startTime, endTime, userId } = req.body;

        // Validate request body
        if (!parkingSpotId || !startTime || !endTime || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const start = new Date(startTime);
        const end = new Date(endTime);

        if (isNaN(start) || isNaN(end) || start >= end) {
            return res.status(400).json({ error: 'Invalid start or end time' });
        }

        // Check if user exists and fetch user details
        const user = await User.findByPk(userId, {
            attributes: ['username', 'plate'], // Fetch only the name and plate fields
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the parking spot with its associated parking lot
        const parkingSpot = await ParkingSpot.findOne({
            where: { id: parkingSpotId },
            include: {
                model: ParkingLot,
                as: 'parkingLot',
            },
        });

        if (!parkingSpot) {
            return res.status(404).json({ error: 'Parking spot not found' });
        }

        if (!parkingSpot.isAvailable) {
            return res.status(400).json({ error: 'Parking spot is already reserved' });
        }

        // Calculate cost (duration in hours * hourly rate)
        const durationHours = (end - start) / (1000 * 60 * 60); // Convert ms to hours
        const totalCost = durationHours * parkingSpot.parkingLot.hourlyRate;

        // Create reservation
        const reservation = await Reservation.create({
            parkingSpotId,
            startTime,
            endTime,
            userId,
            totalCost
        });

        // Mark the spot as unavailable
        await parkingSpot.update({ isAvailable: false });

        // Prepare the response with the required details
        const response = {
            message: 'Reservation created successfully',
            reservationDetails: {
                parkingLotName: parkingSpot.parkingLot.name, // Parking lot name
                spotNumber: parkingSpot.id, // Spot number (or use parkingSpot.number if available)
                startTime: start.toISOString(), // Start time in ISO format
                endTime: end.toISOString(), // End time in ISO format
                totalCost: totalCost.toFixed(2), // Total cost formatted to 2 decimal places
                userName: user.username, // User's name
                userPlate: user.plate, // User's license plate number
            },
            reservation // Include the full reservation object if needed
        };

        res.status(201).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reserving spot', details: err.message });
    }
};

exports.getUserReservations = async (req, res) => {
    try {
        const { userId } = req.params;

        const reservations = await Reservation.findAll({
            where: { userId },
            include: [{ model: ParkingSpot, as: 'parkingSpot' }]
        });

        res.status(200).json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching user reservations', details: err.message });
    }
};


exports.getReservationById = async (req, res) => {
    try {
        const { reservationId } = req.params;

        if (!reservationId) {
            return res.status(400).json({ error: 'Reservation ID is required' });
        }

        const reservation = await Reservation.findByPk(reservationId, {
            include: [
                {
                    model: ParkingSpot,
                    as: 'parkingSpot',
                    include: {
                        model: ParkingLot,
                        as: 'parkingLot'
                    }
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['username', 'plate']
                }
            ]
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const response = {
            reservationId: reservation.id,
            parkingLotName: reservation.parkingSpot.parkingLot.name,
            spotNumber: reservation.parkingSpot.id,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            totalCost: reservation.totalCost.toFixed(2),
            userName: reservation.user.username,
            userPlate: reservation.user.plate
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching reservation', details: err.message });
    }
};
