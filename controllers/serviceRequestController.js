// controllers/serviceController.js

const { createServiceRequest, getServiceRequests ,updateServiceRequestStatus,deleteServiceRequest  } = require('../models/serviceRequest');

const addServiceRequest = (req, res) => {
    const { service_id, user_id,car_id } = req.body;

    createServiceRequest(service_id, user_id,car_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Service request created successfully', request: result });
    });
};

const getServiceRequestsController = (req, res) => {
    getServiceRequests((err, serviceRequests) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(serviceRequests);
    });
};
const updateServiceRequestStatusController = (req, res) => {
    const id = req.params.id; // Extract id from URL params
    const { status } = req.body; // Extract status from request body

    updateServiceRequestStatus(id, status, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service request not found' });
        }
        res.status(200).json({ message: 'Service request status updated successfully' });
    });
};
const deleteServiceRequestController = (req, res) => {
    const id = req.params.id;

    deleteServiceRequest(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service request not found' });
        }
        res.status(200).json({ message: 'Service request deleted successfully' });
    });
};
module.exports = {
    addServiceRequest,
    getServiceRequestsController,
    updateServiceRequestStatusController,
    deleteServiceRequestController
};
