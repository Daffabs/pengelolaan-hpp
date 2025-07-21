<?php
header('Access-Control-Allow-Origin: https://beesinaja.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../../database.php';

$id = $_POST['id'];
$date = $_POST['date'];
$keterangan = $_POST['keterangan'];
$jumlah = $_POST['jumlah'];

$stmt = $conn->prepare("UPDATE uang_masuk SET date = ?, keterangan = ?, jumlah = ? WHERE id = ?");
$stmt->bind_param("ssii", $date, $keterangan, $jumlah, $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil diperbarui']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal memperbarui data']);
}

$stmt->close();
$conn->close();
?>