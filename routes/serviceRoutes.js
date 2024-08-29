const express = require('express');
const { addService, getServices, editService,  removeService } = require('../controllers/serviceController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new car (restricted to certain roles)
router.post('/', addService);

// Get a car by ID
router.get('/:id', authenticateToken, getServices);

// Get all cars
router.get('/', getServices);

// Update a car (restricted to certain roles)
router.put('/:id', editService);

// Delete a car (restricted to certain roles)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), getServices);

module.exports = router;
