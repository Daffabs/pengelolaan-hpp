const mysql = require('mysql2/promise');
require('dotenv').config(); // Untuk jaga-jaga kalau pindah ke .env

const db = mysql.createPool({
  host: "yamabiko.proxy.rlwy.net",
  port: 38611,
  user: "root",
  password: "nJBDhFWkUFXXSWLtvbrXsetGOHLtdMDQ",
  database: "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = db;
