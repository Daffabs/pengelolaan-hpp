<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/x-www-form-urlencoded");

$koneksi = new mysqli("localhost", "root", "", "hpp_keuangan");

if ($koneksi->connect_error) {
    die("Koneksi gagal: " . $koneksi->connect_error);
}

$id = $_POST['id'];

$sql = "DELETE FROM data_order WHERE id_data_order='$id'";

if ($koneksi->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Data berhasil dihapus"]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal hapus: " . $koneksi->error]);
}

$koneksi->close();
