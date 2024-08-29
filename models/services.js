const db = require('../db');

const createService = ( service_name, description, price) => {
  const query = 'INSERT INTO services (service_name, description, price ) VALUES (?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [ service_name, description, price], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.insertId);
    });
  });
};

// const getCarById = (id) => {
//   const query = 'SELECT * FROM cars WHERE id = ?';
//   return new Promise((resolve, reject) => {
//     db.query(query, [id], (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(results[0]);
//     });
//   });
// };

const getAllServices = () => {
  const query = 'SELECT * FROM services';
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const updateService = (id,  service_name, description, price) => {
  const query = 'UPDATE services SET  service_name = ?, description = ?, price = ? WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [ service_name, description, price, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const deleteService = (id) => {
  const query = 'DELETE FROM services WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};

