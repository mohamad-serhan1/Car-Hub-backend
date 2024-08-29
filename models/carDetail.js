const db = require("../db");

const getCarsWithDetails = () => {
  const query = `
    SELECT 
      c.id, c.model, c.year, c.image, c.description, c.status, c.owner_id,
      u.firstName AS owner_firstName, u.lastName AS owner_lastName,
      CASE
        WHEN c.status IN ('for sale', 'request') THEN (
        SELECT s.price 
        FROM sales s 
        WHERE s.car_id = c.id
        LIMIT 1
      )
        WHEN c.status = 'for rent' THEN (
          SELECT r.price_per_day 
          FROM rentals r 
          WHERE r.car_id = c.id
          LIMIT 1
        )
        ELSE NULL
      END AS details
    FROM cars c
    JOIN users u ON c.owner_id = u.id
  `;

  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }

      console.log("Query Results:", results); // Check the entire results object
      resolve(results);
    });
  });
};

const searchCars = async (searchQuery) => {
  const query = `
    SELECT 
      c.id, c.model, c.year, c.image, c.description, c.status, c.owner_id,
      u.firstName AS owner_firstName, u.lastName AS owner_lastName,
      CASE
        WHEN c.status = 'for sale' THEN (SELECT price FROM sales s WHERE s.car_id = c.id)
        WHEN c.status = 'for rent' THEN (SELECT price_per_day FROM rentals r WHERE r.car_id = c.id)
        ELSE NULL
      END AS details
    FROM cars c
    JOIN users u ON c.owner_id = u.id
    WHERE (
      (c.status = 'for sale' AND EXISTS (SELECT 1 FROM sales s WHERE s.car_id = c.id))
      OR (c.status = 'for rent' AND EXISTS (SELECT 1 FROM rentals r WHERE r.car_id = c.id))
    )
    AND (
      c.model LIKE ? 
      OR u.firstName LIKE ? 
      OR u.lastName LIKE ?
    )
      LIMIT 25;
  `;

  const params = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`];

  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }

      console.log("Query Results:", results); // Check the entire results object
      resolve(results);
    });
  });
};


const getCarsByStatus = (status) => {
  const query = `
    SELECT 
      c.id, c.model, c.year, c.image, c.description, c.status, c.owner_id,
      u.firstName AS owner_firstName, u.lastName AS owner_lastName,
      CASE
        WHEN c.status IN ('for sale', 'request') THEN (
        SELECT s.price 
        FROM sales s 
        WHERE s.car_id = c.id
        LIMIT 1
      )
        WHEN c.status = 'for rent' THEN (
          SELECT r.price_per_day 
          FROM rentals r 
          WHERE r.car_id = c.id
          LIMIT 1
        )
        ELSE NULL
      END AS details
    FROM cars c
    JOIN users u ON c.owner_id = u.id
    WHERE c.status = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [status], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }

      resolve(results);
    });
  });
};

const getCarDetailsById = (id) => {
  const query = `
    SELECT 
      c.id, c.model, c.year, c.image, c.description, c.status, c.owner_id,
      u.firstName AS owner_firstName, u.lastName AS owner_lastName,
      CASE
        WHEN c.status IN ('for sale', 'request') THEN (
        SELECT s.price 
        FROM sales s 
        WHERE s.car_id = c.id
        LIMIT 1
      )
        WHEN c.status = 'for rent' THEN (
          SELECT r.price_per_day 
          FROM rentals r 
          WHERE r.car_id = c.id
          LIMIT 1
        )
        ELSE NULL
      END AS details
    FROM cars c
    JOIN users u ON c.owner_id = u.id
    WHERE c.id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return reject(err);
      }

      resolve(results[0]); // Return a single object since the ID is unique
    });
  });
};
module.exports = {
  getCarsWithDetails,
  searchCars,
  getCarsByStatus,
  getCarDetailsById
};
