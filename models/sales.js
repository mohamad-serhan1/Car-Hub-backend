const db = require('../db');

const createSales = ( car_id, user_id,  price, status ) => {
  const query = 'INSERT INTO sales (car_id, user_id,  price,  status) VALUES (?, ?, ?, ? )';
  return new Promise((resolve, reject) => {
    db.query(query, [ car_id, user_id,  price, status ], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.insertId);
    });
  });
};

const getSalesById = (id) => {
  const query = 'SELECT * FROM sales WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const getAllSales = () => {
  const query = 'SELECT * FROM sales';
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const updateSales = (id,  car_id, user_id,  price, status ) => {
  const query = 'UPDATE sales SET  car_id = ?, user_id = ?,  price = ?,  status = ? WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [ car_id, user_id,  price, status , id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const deleteSales = (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const deleteSalesByCarId= (car_id) => {
  const query = 'DELETE FROM sales WHERE car_id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [car_id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  createSales,
  getSalesById,
  getAllSales,
  updateSales,
  deleteSales,
  deleteSalesByCarId
};
