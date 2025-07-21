<?php
header('Access-Control-Allow-Origin: https://beesinaja.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

include '../database.php'; // pastikan file koneksi

// Ambil data POST
$tanggal = $_POST['tanggal'] ?? '';
$nama_perusahaan = $_POST['nama_perusahaan'] ?? '';
$nama_produk = $_POST['nama_produk'] ?? '';
$jumlah_barang = $_POST['jumlah_barang'] ?? '';
$harga_satuan = $_POST['harga_satuan'] ?? '';
$hpp = $_POST['hpp'] ?? '';
$laba = $_POST['laba'] ?? '';

// Validasi sederhana
if (!$tanggal || !$nama_perusahaan || !$nama_produk || !$jumlah_barang || !$harga_satuan) {
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
    exit;
}

$query = "INSERT INTO data_order (tanggal, nama_perusahaan, nama_produk, jumlah_barang, harga_satuan, hpp, laba)
          VALUES ('$tanggal', '$nama_perusahaan', '$nama_produk', '$jumlah_barang', '$harga_satuan', '$hpp', '$laba')";

if (mysqli_query($conn, $query)) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil ditambahkan']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menambahkan data: ' . mysqli_error($conn)]);
}
?>