const express = require('express');
const authController = require('../controllers/authController');
const parkingLotController = require('../controllers/parkingLotController');
const parkingSpotController = require('../controllers/parkingSpotController');

const router = express.Router();

// Authentication
router.post('/register', authController.register);
router.post('/login', authController.login);

// Parking Lots
router.get('/parking-lots', parkingLotController.getParkingLots);

// Parking Spots
router.get('/parking-spots/:lotId', parkingSpotController.getSpotsByLot);
router.post('/reserve', parkingSpotController.reserveSpot);

module.exports = router;
