<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include '../../database.php';

$result = $conn->query("SELECT * FROM uang_keluar ORDER BY date DESC");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $data]);

$conn->close();
?>