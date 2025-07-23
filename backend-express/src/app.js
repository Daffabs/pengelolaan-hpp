const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const uangMasukRoutes = require('./routes/uangMasukRoutes');
const uangKeluarRoutes = require('./routes/uangKeluarRoutes');

const app = express();

// ✅ Domain frontend yang diizinkan
const allowedOrigins = [
  "https://beesinaja.vercel.app",
  "http://localhost:3000", // tambahkan juga untuk dev lokal
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);
app.use('/api/uang-masuk', uangMasukRoutes);
app.use('/api/uang-keluar', uangKeluarRoutes);

// Tes endpoint
app.get('/', (req, res) => {
  res.send('API Backend Express berjalan!');
});



module.exports = app; // ✅ WAJIB ADA agar bisa dipakai di server.js
