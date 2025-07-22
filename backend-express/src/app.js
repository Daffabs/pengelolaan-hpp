const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const uangMasukRoutes = require('./routes/uangMasukRoutes');
const uangKeluarRoutes = require('./routes/uangKeluarRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);
app.use('/api/uang-masuk', uangMasukRoutes);
app.use('/api/uang-keluar', uangKeluarRoutes);

app.get('/', (req, res) => {
  res.send('API Backend Express berjalan!');
});

app.listen(3001, () => {
  console.log('Server berjalan di http://localhost:3001');
});