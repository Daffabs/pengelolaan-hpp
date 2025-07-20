<?php
include '../database.php';

$tanggal_um = $_POST['tanggal_uk'];
$keterangan_um = $_POST['keterangan_uk'];
$jumlah_uang_um = $_POST['jumlah_uang_uk'];

$sql = "INSERT INTO uang_keluar (tanggal_uk, keterangan_uk, jumlah_uang_uk) 
VALUES ('$tanggal_uk', '$keterangan_uk', $jumlah_uang_uk)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>