const db = require('../models/database');

// Ambil semua data uang keluar
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM uang_keluar');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambah data uang keluar
exports.add = async (req, res) => {
  const { date, jumlah, keterangan } = req.body;
  try {
    await db.query('INSERT INTO uang_keluar (date, jumlah, keterangan) VALUES (?, ?, ?)', [date, jumlah, keterangan]);
    res.json({ message: 'Data berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update data uang keluar
exports.update = async (req, res) => {
  const { id } = req.params;
  const { date, jumlah, keterangan } = req.body;
  try {
    await db.query('UPDATE uang_keluar SET date=?, jumlah=?, keterangan=? WHERE id=?', [date, jumlah, keterangan, id]);
    res.json({ message: 'Data berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hapus data uang keluar
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM uang_keluar WHERE id=?', [id]);
    res.json({ message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};