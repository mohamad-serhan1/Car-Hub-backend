// models/serviceRequest.js

const db = require('../db'); // Adjust this path to your actual db configuration

const getServiceRequests = (callback) => {
    const query = `
        SELECT 
            sr.id AS request_id, 
            sr.service_id, 
            sr.user_id, 
            sr.car_id, 
            s.service_name, 
            u.firstName 
        FROM 
            service_requests sr
        JOIN 
            services s ON sr.service_id = s.id
        JOIN 
            users u ON sr.user_id = u.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const createServiceRequest = (service_id, user_id,car_id, callback) => {
    const query = 'INSERT INTO service_requests (service_id, user_id, car_id) VALUES (?, ?, ?)';
    const values = [service_id, user_id ,car_id];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
const updateServiceRequestStatus = (id, status, callback) => {
    const query = 'UPDATE service_requests SET status = ? WHERE id = ?';
    const values = [status, id];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
const deleteServiceRequest = (id, callback) => {
    const query = 'DELETE FROM service_requests WHERE id = ?';
    const values = [id];

    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
module.exports = {
    getServiceRequests,
    createServiceRequest,
    updateServiceRequestStatus,
    deleteServiceRequest
};
