<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include '../../database.php';

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM uang_masuk WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Data berhasil dihapus']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menghapus data']);
}

$stmt->close();
$conn->close();
?>