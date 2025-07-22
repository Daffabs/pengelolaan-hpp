const mysql = require('mysql2');

// Gunakan DATABASE_URL dari environment Railway jika ada, fallback ke lokal untuk development
const pool = process.env.DATABASE_URL
  ? mysql.createPool(process.env.DATABASE_URL)
  : mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'hpp_keuangan'
    });

module.exports = pool.promise();