const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // измените при необходимости
  user: 'root',      // измените при необходимости
  password: '',      // измените при необходимости
  database: 'food_delivery', // имя базы данных
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
