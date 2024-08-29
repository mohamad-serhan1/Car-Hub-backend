const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'sql306.infinityfree.com',
  user: 'if0_37204753',      // use your MySQL username
  password: 'W75YzcFLs1PBQi',      // use your MySQL password
  database: 'if0_37204753_car_sales'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;
