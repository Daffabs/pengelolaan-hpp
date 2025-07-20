<?php
$host = 'localhost';
$user = 'root'; // ganti jika pakai user lain
$pass = '';     // ganti jika ada password
$dbname = 'hpp_keuangan';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>