<?php
header('Access-Control-Allow-Origin: https://beesinaja.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
include '../../database.php';

$date = $_POST['date'];
$keterangan = $_POST['keterangan'];
$jumlah = $_POST['jumlah'];

$stmt = $conn->prepare("INSERT INTO uang_keluar (date, keterangan, jumlah) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $date, $keterangan, $jumlah);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil ditambahkan']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menambahkan data']);
}

$stmt->close();
$conn->close();
?>