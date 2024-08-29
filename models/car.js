const db = require("../db");

const createCar = (model, year, image, description, status, owner_id) => {
  const query =
    "INSERT INTO cars (model, year, image, description,status, owner_id) VALUES (?, ?, ?, ?, ?,?)";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [model, year, image, description, status, owner_id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.insertId);
      }
    );
  });
};

const getCarById = (id) => {
  const query = "SELECT * FROM cars WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const getAllCars = () => {
  const query = "SELECT * FROM cars";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const updateCar = (id, model, year, image, description, status, owner_id) => {
  const query =
    "UPDATE cars SET  model = ?, year = ?,image = ?, description=?,status = ?, owner_id = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [model, year, image, description, status, owner_id, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.affectedRows);
      }
    );
  });
};
const updateCarStatus = (id, status) => {
  const query = "UPDATE cars SET status = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [status, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const deleteCar = (id) => {
  const query = "DELETE FROM cars WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

const getCarsByOwnerId = (owner_id) => {
  const query = "SELECT * FROM cars WHERE owner_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [owner_id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const getCarsByStatus = (status) => {
  const query = "SELECT * FROM cars WHERE status = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [status], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
module.exports = {
  createCar,
  getCarById,
  getAllCars,
  updateCar,
  deleteCar,
  getCarsByOwnerId,
  updateCarStatus,
  getCarsByStatus
};
