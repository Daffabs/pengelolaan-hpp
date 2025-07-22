const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const uangMasukRoutes = require('./routes/uangMasukRoutes');
const uangKeluarRoutes = require('./routes/uangKeluarRoutes');

const app = express();

// Ganti dengan domain frontend Vercel Anda
const allowedOrigins = [
  "https://beesinaja.vercel.app", // contoh: https://beesboard.vercel.app
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

app.get('/', (req, res) => {
  res.send('API Backend Express berjalan!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});