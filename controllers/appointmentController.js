const { 
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment,
    updateAppointment, 
    getAppointmentsByUserId
} = require('../models/appointments');

// Create a new appointment
const addAppointment = async (req, res) => {
    const { car_id, customer_id, mechanic_id, service_type, appointment_date, status, notes } = req.body;
    try {
        const appointmentId = await createAppointment(car_id, customer_id, mechanic_id, service_type, appointment_date, status, notes);
        res.status(201).json({ id: appointmentId, car_id, customer_id, mechanic_id, service_type, appointment_date, status, notes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get an appointment by ID
const getAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await getAppointmentById(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments
const getAppointments = async (req, res) => {
    try {
        const appointments = await getAllAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an appointment
const editAppointment = async (req, res) => {
    const { id } = req.params;
    const { car_id, customer_id, mechanic_id, service_type, appointment_date, status, notes } = req.body;
    try {
        const updated = await updateAppointment(id, car_id, customer_id, mechanic_id, service_type, appointment_date, status, notes);
        if (updated === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ id, car_id, customer_id, mechanic_id, service_type, appointment_date, status, notes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an appointment
const removeAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteAppointment(id);
        if (deleted === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getAppointmentsByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const appointments = await new Promise((resolve, reject) => {
            getAppointmentsByUserId(user_id, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addAppointment,
    getAppointment,
    getAppointments,
    editAppointment,
    removeAppointment,
    getAppointmentsByUser
};
