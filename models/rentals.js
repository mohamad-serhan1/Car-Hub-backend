const db = require('../db');

const createRental = ( car_id, user_id, price_per_day,  status) => {
  const query = 'INSERT INTO rentals (car_id, user_id, price_per_day,  status) VALUES (?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [ car_id, user_id, price_per_day,  status], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.insertId);
    });
  });
};

const getRentaLById = (id) => {
  const query = 'SELECT * FROM rentals WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const getAllRentals = () => {
  const query = 'SELECT * FROM rentals';
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const updateRental = (id,  car_id, user_id, price_per_day,  status) => {
  const query = 'UPDATE rentals SET  car_id = ?, user_id = ?,  price_per_day = ?, status = ? WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [ car_id, user_id, price_per_day,  status, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const deleteRental = (id) => {
  const query = 'DELETE FROM rentals WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const deleteRentalByCarId = (car_id) => {
  const query = 'DELETE FROM rentals WHERE car_id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [car_id], (err, result) => {
      if (err) {
        console.error(err); // Log error
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  createRental,
  getRentaLById,
  getAllRentals,
  updateRental,
  deleteRental,
  deleteRentalByCarId
};
