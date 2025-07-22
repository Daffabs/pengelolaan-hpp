"use client";
import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [totalUangMasuk, setTotalUangMasuk] = useState(0);
    const [totalUangKeluar, setTotalUangKeluar] = useState(0);
    const [totalPenjualan, setTotalPenjualan] = useState(0);
    const [totalBiayaProduksi, setTotalBiayaProduksi] = useState(0);
    const [salesChartData, setSalesChartData] = useState<any>(null);
    const [profitChartData, setProfitChartData] = useState<any>(null);

    const [historiUangMasuk, setHistoriUangMasuk] = useState<any[]>([]);
    const [historiUangKeluar, setHistoriUangKeluar] = useState<any[]>([]);
    const [historiOrder, setHistoriOrder] = useState<any[]>([]);

    useEffect(() => {
        // Fetch uang masuk
        fetch("http://localhost:3001/api/uang-masuk")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setTotalUangMasuk(sorted.reduce((sum: number, d: any) => sum + Number(d.jumlah || 0), 0));
                setHistoriUangMasuk(sorted.slice(0, 5));
            });

        // Fetch uang keluar
        fetch("http://localhost:3001/api/uang-keluar")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setTotalUangKeluar(sorted.reduce((sum: number, d: any) => sum + Number(d.jumlah || 0), 0));
                setHistoriUangKeluar(sorted.slice(0, 5));
            });

        // Fetch orders
        fetch("http://localhost:3001/api/orders")
            .then(res => res.json())
            .then(data => {
                const formatted = data.map((item: any) => ({
                    id: Number(item.id_data_order),
                    date: item.tanggal, // Ganti ke item.date jika field di DB sudah diganti
                    product: item.nama_produk,
                    quantity: Number(item.jumlah_barang) || 0,
                    price: (Number(item.harga_satuan) || 0) * (Number(item.jumlah_barang) || 0),
                    hpp: Number(item.hpp) || 0,
                    profit: Number(item.laba) || 0,
                    namaPerusahaan: item.nama_perusahaan,
                }));
                setHistoriOrder(formatted.sort((a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                ).slice(0, 5));
                const totalPenjualan = formatted.reduce((sum: number, d: any) => sum + (d.price || 0), 0);
                const totalHPP = formatted.reduce((sum: number, d: any) => sum + (d.hpp || 0), 0);
                const totalBiayaProduksi = totalHPP + totalHPP * 0.2;
                setTotalPenjualan(totalPenjualan);
                setTotalBiayaProduksi(totalBiayaProduksi);

                const salesByMonth: Record<string, number> = {};
                const profitByMonth: Record<string, number> = {};
                formatted.forEach((order: any) => {
                    const dateObj = new Date(order.date);
                    const year = dateObj.getFullYear();
                    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                    const key = `${year}-${month}`;
                    if (!salesByMonth[key]) salesByMonth[key] = 0;
                    if (!profitByMonth[key]) profitByMonth[key] = 0;
                    salesByMonth[key] += order.price;
                    profitByMonth[key] += order.profit;
                });

                const sortedMonths = Object.keys(salesByMonth).sort();
                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                const labels = sortedMonths.map(key => {
                    const [year, month] = key.split('-');
                    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
                });

                setSalesChartData({
                    labels,
                    datasets: [{
                        label: "Penjualan",
                        data: sortedMonths.map(key => salesByMonth[key]),
                        backgroundColor: "#49516F",
                        borderRadius: 0,
                        barThickness: 20,
                    }],
                });

                setProfitChartData({
                    labels,
                    datasets: [{
                        label: "Laba",
                        data: sortedMonths.map(key => profitByMonth[key]),
                        backgroundColor: "#496F5D",
                        borderRadius: 0,
                        barThickness: 20,
                    }],
                });
            });
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const value = context.raw;
                        return `Rp ${value.toLocaleString("id-ID")}`;
                    }
                }
            },
        },
        scales: {
            x: {
                title: { display: true, text: "" },
                ticks: { maxRotation: 45, minRotation: 45 }
            },
            y: {
                title: { display: true, text: "" },
                ticks: {
                    callback: function (value: any) {
                        return `Rp ${value.toLocaleString("id-ID")}`;
                    }
                }
            }
        }
    };

    const cardData = [
        { title: "Total Uang Masuk", value: `Rp ${totalUangMasuk.toLocaleString("id-ID")}` },
        { title: "Total Uang Keluar", value: `Rp ${totalUangKeluar.toLocaleString("id-ID")}` },
        { title: "Total Penjualan", value: `Rp ${totalPenjualan.toLocaleString("id-ID")}` },
        { title: "Total Biaya Produksi", value: `Rp ${totalBiayaProduksi.toLocaleString("id-ID")}` },
    ];
    const cardColors = ["#8EA4D2", "#6279B8", "#496F5D", "#4C9F70"];

    return (
        <div className="max-h-screen sm:mt-0 mt-20 px-4 lg:px-8 space-y-6">
            {/* Kartu Ringkasan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            backgroundColor: cardColors[index],
                            color: "#FFF",
                            borderRadius: "16px",
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.02)" },
                        }}
                        elevation={3}
                    >
                        <CardContent>
                            <Typography variant="subtitle2" className="text-sm">{item.title}</Typography>
                            <Typography variant="h6" className="font-bold">{item.value}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Grafik */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grafik Penjualan */}
                <div className="bg-white rounded-3xl p-4 shadow w-full">
                    <Typography variant="h6" className="mb-4 font-bold text-gray-700">
                        Grafik Penjualan
                    </Typography>
                    <div className="overflow-x-auto md:overflow-x-visible">
                        <div className="w-[700px] md:w-full h-[300px] sm:h-[400px]">
                            {salesChartData ? (
                                <Bar
                                    data={salesChartData}
                                    options={chartOptions}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            ) : (
                                <Typography variant="body2">Memuat grafik...</Typography>
                            )}
                        </div>
                    </div>
                </div>

                {/* Grafik Laba */}
                <div className="bg-white rounded-3xl p-4 shadow w-full">
                    <Typography variant="h6" className="mb-4 font-bold text-gray-700">
                        Grafik Laba
                    </Typography>
                    <div className="overflow-x-auto md:overflow-x-visible">
                        <div className="w-[700px] md:w-full h-[300px] sm:h-[400px]">
                            {profitChartData ? (
                                <Bar
                                    data={profitChartData}
                                    options={chartOptions}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            ) : (
                                <Typography variant="body2">Memuat grafik...</Typography>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Histori Terbaru */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Uang Masuk */}
                <Card className="shadow-md border border-gray-200" sx={{ borderRadius: 7 }}>
                    <CardContent className="min-w-[280px]">
                        <Typography variant="subtitle1" className="mb-2 font-semibold text-green-600">
                            🟢 Uang Masuk Terbaru
                        </Typography>
                        <div className="overflow-x-auto">
                            <table className="min-w-[500px] w-full text-sm">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="text-left w-[90px]">Tanggal</th>
                                        <th className="text-left w-[120px]">Keterangan</th>
                                        <th className="text-left w-[100px]">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historiUangMasuk.map((item, index) => (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="py-1">{item.date || "-"}</td>
                                            <td className="text-gray-700 py-1 break-words">{item.keterangan}</td>
                                            <td className="font-bold text-green-700 py-1">Rp {Number(item.jumlah).toLocaleString("id-ID")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Uang Keluar */}
                <Card className="shadow-md border border-gray-200" sx={{ borderRadius: 7 }}>
                    <CardContent className="min-w-[280px]">
                        <Typography variant="subtitle1" className="mb-2 font-semibold text-red-600">
                            🔴 Uang Keluar Terbaru
                        </Typography>
                        <div className="overflow-x-auto">
                            <table className="min-w-[500px] w-full text-sm">
                                <thead>
                                    <tr className="text-gray-600">
                                        <th className="text-left w-[90px]">Tanggal</th>
                                        <th className="text-left w-[120px]">Keterangan</th>
                                        <th className="text-left w-[100px]">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historiUangKeluar.map((item, index) => (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="py-1">{item.date || "-"}</td>
                                            <td className="text-gray-700 py-1 break-words">{item.keterangan}</td>
                                            <td className="font-bold text-red-700 py-1">Rp {Number(item.jumlah).toLocaleString("id-ID")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Order */}
                <div className="md:col-span-2 flex justify-center w-full">
                    <Card className="shadow-md border border-gray-200 w-full max-w-[530px]" sx={{ borderRadius: 7 }}>
                        <CardContent className="max-w-[280px]">
                            <Typography variant="subtitle1" className="mb-2 font-semibold text-blue-600">
                                📦 Order Terbaru
                            </Typography>
                            <div className="overflow-x-auto md:overflow-x-visible">
                                <table className="w-[600px] md:w-full text-sm min-w-[500px]">
                                    <thead>
                                        <tr className="text-gray-600">
                                            <th className="text-left w-[180px]">Tanggal</th>
                                            <th className="text-left w-[180px]">Perusahaan</th>
                                            <th className="text-left w-[180px]">Produk</th>
                                            <th className="text-left w-[180px]">Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historiOrder.map((item, index) => (
                                            <tr key={index} className="border-t border-gray-200">
                                                <td className="py-1">{item.date || "-"}</td>
                                                <td className="text-gray-700 py-1 break-words">{item.namaPerusahaan}</td>
                                                <td className="text-gray-700 py-1 break-words">{item.product}</td>
                                                <td className="font-bold text-blue-700 py-1">Rp {Number(item.price).toLocaleString("id-ID")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}