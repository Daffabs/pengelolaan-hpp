const mysql = require('mysql2');
require('dotenv').config(); // Wajib agar .env terbaca

const db = mysql.createConnection({
  host: "yamabiko.proxy.rlwy.net",
  port: 38611,
  user: "root",
  password: "nJBDhFWkUFXXSWLtvbrXsetGOHLtdMDQ",
  database: "railway"
});


db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke database:", err.message);
  } else {
    console.log("✅ Berhasil konek ke database Railway");
  }
});

module.exports = db;
