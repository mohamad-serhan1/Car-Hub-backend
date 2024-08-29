const db = require("../db");

const createAppointment = (
  car_id,
  customer_id,
  mechanic_id,
  service_type,
  appointment_date,
  status,
  notes
) => {
  const query =
    "INSERT INTO appointments (car_id, customer_id, mechanic_id, service_type, appointment_date, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        car_id,
        customer_id,
        mechanic_id,
        service_type,
        appointment_date,
        status,
        notes,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      }
    );
  });
};

const getAppointmentById = (id) => {
  const query = "SELECT * FROM appointments WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const getAllAppointments = () => {
  const query = "SELECT * FROM appointments";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const updateAppointment = (
  id,
  car_id,
  customer_id,
  mechanic_id,
  service_type,
  appointment_date,
  status,
  notes
) => {
  const query =
    "UPDATE appointments SET  car_id = ?, customer_id = ?, mechanic_id = ?, service_type = ?, appointment_date = ?, status = ?, notes = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        car_id,
        customer_id,
        mechanic_id,
        service_type,
        appointment_date,
        status,
        notes,
        id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      }
    );
  });
};

const deleteAppointment = (id) => {
  const query = "DELETE FROM appointments WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const getAppointmentsByUserId = (user_id, callback) => {
  const query = `
      SELECT 
          appointments.id, 
          appointments.car_id, 
          appointments.customer_id, 
          appointments.mechanic_id, 
          appointments.service_type, 
          appointments.appointment_date, 
          appointments.status, 
          appointments.notes,
          cars.model AS car_model
      FROM 
          appointments
      JOIN
          cars ON appointments.car_id = cars.id
      WHERE 
          appointments.customer_id = ? OR appointments.mechanic_id = ?
  `;
  const values = [user_id, user_id];

  db.query(query, values, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUserId,
};
