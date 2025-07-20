<?php
include '../database.php';

$tanggal_um = $_POST['tanggal_um'];
$keterangan_um = $_POST['keterangan_um'];
$jumlah_uang_um = $_POST['jumlah_uang_um'];

$sql = "INSERT INTO uang_masuk (tanggal_um, keterangan_um, jumlah_uang_um) 
VALUES ('$tanggal_um', '$keterangan_um', $jumlah_uang_um)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>