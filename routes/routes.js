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
router.get('/parking-lots/:id', parkingLotController.getParkingLotById);
router.post('/add/parking-lots', parkingLotController.addParkingLots);

// Route to reserve a parking spot
router.get('/parking-spots', parkingSpotController.getAllParkingSpots);
router.post('/reserve/parking-spot', parkingSpotController.addParkingSpot);


// Route to reservation
router.post('/reserve', reservationController.reserveSpot);
router.get('/reservations/:reservationId',reservationController.getReservationById)
router.get('/user/:userId', reservationController.getUserReservations);


module.exports = router;

