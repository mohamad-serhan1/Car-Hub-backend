const express = require('express');
const { addAppointment, getAppointment, getAppointments, editAppointment, removeAppointment ,getAppointmentsByUser } = require('../controllers/appointmentController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new car (restricted to certain roles)
router.post('/', addAppointment);

// Get a car by ID
router.get('/:id', authenticateToken, getAppointment);

// Get all cars
router.get('/', getAppointments);

// Update a car (restricted to certain roles)
router.put('/:id', authenticateToken, authorizeRole(['mechanic']),editAppointment);

// Delete a car (restricted to certain roles)
router.delete('/:id',  removeAppointment);

router.get('/user/:user_id', getAppointmentsByUser); 


module.exports = router;
