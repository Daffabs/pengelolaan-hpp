const db = require('../models/database');

// Ambil semua data order
exports.getOrders = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM data_order');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambah data order
exports.addOrder = async (req, res) => {
  const { tanggal, nama_produk, jumlah_barang, harga_satuan, hpp, laba, nama_perusahaan } = req.body;
  try {
    await db.query(
      'INSERT INTO data_order (tanggal, nama_produk, jumlah_barang, harga_satuan, hpp, laba, nama_perusahaan) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tanggal, nama_produk, jumlah_barang, harga_satuan, hpp, laba, nama_perusahaan]
    );
    res.json({ message: 'Order berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update data order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { tanggal, nama_produk, jumlah_barang, harga_satuan, hpp, laba, nama_perusahaan } = req.body;
  try {
    await db.query(
      'UPDATE data_order SET tanggal=?, nama_produk=?, jumlah_barang=?, harga_satuan=?, hpp=?, laba=?, nama_perusahaan=? WHERE id_data_order=?',
      [tanggal, nama_produk, jumlah_barang, harga_satuan, hpp, laba, nama_perusahaan, id]
    );
    res.json({ message: 'Order berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hapus data order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM data_order WHERE id_data_order=?', [id]);
    res.json({ message: 'Order berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};