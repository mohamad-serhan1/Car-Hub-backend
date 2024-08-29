const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // use your MySQL username
  password: '',      // use your MySQL password
  database: 'car_sales'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;
