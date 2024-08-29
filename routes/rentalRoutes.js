const express = require('express');
const { addRental, getRental, getRentals, editRental, removeRental,removeRentalByCar } = require('../controllers/rentalController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new car (restricted to certain roles)
router.post('/', addRental);

// Get a car by ID
router.get('/:id', authenticateToken, getRental);

// Get all cars
router.get('/', getRentals);

// Update a car (restricted to certain roles)
router.put('/:id', authenticateToken, editRental);

// Delete a car (restricted to certain roles)
router.delete('/:id',  removeRental);

router.delete('/carId/:car_id',  removeRentalByCar);

module.exports = router;
