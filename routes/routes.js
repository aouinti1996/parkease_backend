const express = require('express');
const authController = require('../controllers/authController');
const parkingLotController = require('../controllers/parkingLotController');
const parkingSpotController = require('../controllers/parkingSpotController');
const reservation = require("../controllers/reservationController");
const reservationController = require("../controllers/reservationController");


const router = express.Router();

// Authentication
router.get('/',(req, res) => {
    res.send('test');
})
router.post('/register', authController.register);
router.post('/login', authController.login);

// Parking Lots
router.get('/parking-lots', parkingLotController.getParkingLots);
router.post('/add/parking-lots', parkingLotController.addParkingLots);

// Route to reserve a parking spot
router.get('/parking-spots', parkingSpotController.getAllParkingSpots);
router.post('/reserve/parking-spot', parkingSpotController.addParkingSpot);
// Route to reservation
router.post('/reservation', reservationController.reservation);
// Route to get reservation by ID
//router.get('/reservation/:id', getReservationById);

module.exports = router;

