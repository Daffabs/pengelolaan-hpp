<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/x-www-form-urlencoded");

$koneksi = new mysqli("localhost", "root", "", "hpp_keuangan");

if ($koneksi->connect_error) {
    die("Koneksi gagal: " . $koneksi->connect_error);
}

$id = $_POST['id'];
$tanggal = $_POST['tanggal'];
$nama_perusahaan = $_POST['nama_perusahaan'];
$nama_produk = $_POST['nama_produk'];
$jumlah_barang = $_POST['jumlah_barang'];
$harga_satuan = $_POST['harga_satuan'];
$hpp = $_POST['hpp'];
$laba = $_POST['laba'];

$sql = "UPDATE data_order SET 
            tanggal='$tanggal',
            nama_perusahaan='$nama_perusahaan',
            nama_produk='$nama_produk',
            jumlah_barang='$jumlah_barang',
            harga_satuan='$harga_satuan',
            hpp='$hpp',
            laba='$laba'
        WHERE id_data_order='$id'";

if ($koneksi->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Data berhasil diupdate"]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal update: " . $koneksi->error]);
}

$koneksi->close();
