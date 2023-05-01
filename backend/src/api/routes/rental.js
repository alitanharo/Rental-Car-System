const express = require('express');
const router = express.Router();
const rentalController = require('../../controllers/rentalController');

// Endpoint for registering rental pick-up
router.post('/pickup', rentalController.registerPickUp);

// Endpoint for registering rental return
router.put('/return', rentalController.registerReturn);

// Endpoint for getting list of all rentals
router.get('/rentals', rentalController.getAllRentals);

// Endpoint for getting specific rental record by booking number
router.get('/bookingNumber/:bookingNumber', rentalController.getRentalByBookingNumber);


 // Endpoint for getting specific rental record by car plate
router.get('/plate/:plate', rentalController.getRentalByPlate);


// Endpoint for deleting rental record by booking number
router.delete('/:bookingNumber', rentalController.deleteRental);

module.exports = router;
