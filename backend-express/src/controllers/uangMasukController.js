const db = require('../models/database');

// Ambil semua data uang masuk
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM uang_masuk');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambah data uang masuk
exports.add = async (req, res) => {
  const { date, jumlah, keterangan } = req.body;
  try {
    await db.query('INSERT INTO uang_masuk (date, jumlah, keterangan) VALUES (?, ?, ?)', [date, jumlah, keterangan]);
    res.json({ message: 'Data berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update data uang masuk
exports.update = async (req, res) => {
  const { id } = req.params;
  const { date, jumlah, keterangan } = req.body;
  try {
    await db.query('UPDATE uang_masuk SET date=?, jumlah=?, keterangan=? WHERE id=?', [date, jumlah, keterangan, id]);
    res.json({ message: 'Data berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hapus data uang masuk
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM uang_masuk WHERE id=?', [id]);
    res.json({ message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};