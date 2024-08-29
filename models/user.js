const db = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async (firstName,lastName, email, password, phone, role = 'customer') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (firstName,lastName, email, password, phone, role) VALUES (?,?, ?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    db.query(query, [firstName,lastName, email, hashedPassword, phone, role], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.insertId);
    });
  });
};

const findUserByEmail = (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

const findUserById = (id) => {
  const query = 'SELECT id, firstName,lastName, email, phone, role FROM users WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};
const updateUser = async (id, updates) => {
  const { firstName,lastName, email, password, phone, role } = updates;
  let query = 'UPDATE users SET ';
  const values = [];

  if (firstName) {
    query += 'firstName = ?, ';
    values.push(firstName);
  }
  if (lastName) {
    query += 'lastName = ?, ';
    values.push(lastName);
  }

  if (email) {
    query += 'email = ?, ';
    values.push(email);
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += 'password = ?, ';
    values.push(hashedPassword);
  }

  if (phone) {
    query += 'phone = ?, ';
    values.push(phone);
  }

  if (role) {
    query += 'role = ?, ';
    values.push(role);
  }

  query = query.slice(0, -2);
  query += ' WHERE id = ?';
  values.push(id);

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
};
