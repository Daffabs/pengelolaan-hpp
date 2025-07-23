"use client";
import { useEffect, useState } from "react";
import {
    TextField, Button, Card, CardContent, Typography,
    Dialog, DialogTitle, DialogContent, DialogActions,
    IconButton
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

interface Order {
    id: number;
    date: string;
    product: string;
    quantity: number;
    price: number;
    hpp: number;
    profit: number;
    namaPerusahaan: string;
}

export default function DataOrder() {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [form, setForm] = useState({ date: "", product: "", quantity: "", price: "", namaPerusahaan: "" });
    const [editForm, setEditForm] = useState({ id: 0, date: "", product: "", quantity: "", price: "", namaPerusahaan: "" });
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(API_BASE);
            const data = res.data;
            const formatted = data.map((item: any) => ({
                id: Number(item.id_data_order),
                date: item.tanggal,
                product: item.nama_produk,
                quantity: Number(item.jumlah_barang) || 0,
                price: Number(item.harga_satuan) * Number(item.jumlah_barang) || 0,
                hpp: Number(item.hpp) || 0,
                profit: Number(item.laba) || 0,
                namaPerusahaan: item.nama_perusahaan,
            })).sort((a: Order, b: Order) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setOrderData(formatted);
        } catch (err) {
            console.error("❌ Gagal fetch data:", err);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const handleAddOrder = async () => {
        const price = Number(form.price);
        const quantity = Number(form.quantity);
        if (!form.date || !form.product || !form.namaPerusahaan || isNaN(price) || isNaN(quantity)) return;

        const totalPrice = price * quantity;
        const hpp = totalPrice * 0.6;
        const profit = totalPrice - hpp;

        try {
            await axios.post(API_BASE, {
                tanggal: form.date,
                nama_perusahaan: form.namaPerusahaan,
                nama_produk: form.product,
                jumlah_barang: quantity,
                harga_satuan: price,
                hpp,
                laba: profit,
            });

            await fetchOrders();
            setForm({ date: "", product: "", quantity: "", price: "", namaPerusahaan: "" });
        } catch (err) {
            console.error("❌ Gagal tambah data:", err);
        }
    };

    const handleEditOpen = (row: Order) => {
        setEditForm({
            id: row.id,
            date: row.date,
            product: row.product,
            quantity: String(row.quantity),
            price: String(row.price / row.quantity),
            namaPerusahaan: row.namaPerusahaan,
        });
        setOpenEdit(true);
    };

    const handleEditSubmit = async () => {
        const price = Number(editForm.price);
        const quantity = Number(editForm.quantity);
        const totalPrice = price * quantity;
        const hpp = totalPrice * 0.6;
        const profit = totalPrice - hpp;

        try {
            await axios.put(`${API_BASE}/${editForm.id}`, {
                tanggal: editForm.date,
                nama_perusahaan: editForm.namaPerusahaan,
                nama_produk: editForm.product,
                jumlah_barang: quantity,
                harga_satuan: price,
                hpp,
                laba: profit,
            });
            await fetchOrders();
            setOpenEdit(false);
            setEditForm({ id: 0, date: "", product: "", quantity: "", price: "", namaPerusahaan: "" });
        } catch (err) {
            console.error("❌ Gagal update data:", err);
        }
    };

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    const confirmDelete = async () => {
        if (deleteId !== null) {
            try {
                await axios.delete(`${API_BASE}/${deleteId}`);
                await fetchOrders();
                setOpenDelete(false);
                setDeleteId(null);
            } catch (err) {
                console.error("❌ Gagal hapus data:", err);
            }
        }
    };

    const totalPenjualan = orderData.reduce((sum, d) => sum + (d.price || 0), 0);
    const totalHPP = orderData.reduce((sum, d) => sum + (d.hpp || 0), 0);
    const totalProfit = orderData.reduce((sum, d) => sum + (d.profit || 0), 0);
    const totalBiayaProduksi = totalHPP + totalHPP * 0.2;

    const columns: GridColDef[] = [
        { field: "date", headerName: "Tanggal", width: 130, valueFormatter: ({ value }) => new Date(value).toLocaleDateString("id-ID") },
        { field: "namaPerusahaan", headerName: "Nama Perusahaan", width: 160 },
        { field: "product", headerName: "Produk", width: 140 },
        { field: "quantity", headerName: "Jumlah", width: 100 },
        { field: "price", headerName: "Harga Total", width: 150, valueFormatter: ({ value }) => `Rp ${Number(value).toLocaleString("id-ID")}` },
        { field: "hpp", headerName: "HPP", width: 120, valueFormatter: ({ value }) => `Rp ${Number(value).toLocaleString("id-ID")}` },
        { field: "profit", headerName: "Laba", width: 120, valueFormatter: ({ value }) => `Rp ${Number(value).toLocaleString("id-ID")}` },
        {
            field: "actions", headerName: "Aksi", width: 120, sortable: false,
            renderCell: ({ row }) => (
                <>
                    <IconButton onClick={() => handleEditOpen(row)} color="primary"><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDeleteClick(row.id)} color="error"><DeleteIcon /></IconButton>
                </>
            )
        }
    ];

    const cardData = [
        { title: "Total Penjualan", value: `Rp ${totalPenjualan.toLocaleString("id-ID")}` },
        { title: "Total Biaya Produksi", value: `Rp ${totalBiayaProduksi.toLocaleString("id-ID")}` },
        { title: "Total HPP", value: `Rp ${totalHPP.toLocaleString("id-ID")}` },
        { title: "Laba Kotorr", value: `Rp ${totalProfit.toLocaleString("id-ID")}` },
    ];

    const cardColors = ["#8EA4D2", "#6279B8", "#496F5D", "#4C9F70"];

    const [filterDate, setFilterDate] = useState("");
    const [filterSearch, setFilterSearch] = useState("");

    const handleFilterDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilterDate(e.target.value);
    const handleFilterSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilterSearch(e.target.value);

    const filteredOrderData = orderData.filter(order => {
        const matchDate = filterDate ? order.date === filterDate : true;
        const matchSearch = filterSearch
            ? (
                order.namaPerusahaan.toLowerCase().includes(filterSearch.toLowerCase()) ||
                order.product.toLowerCase().includes(filterSearch.toLowerCase())
            )
            : true;
        return matchDate && matchSearch;
    });

    const exportToExcel = () => {
        const dataToExport = filteredOrderData.map(order => ({
            Tanggal: new Date(order.date).toLocaleDateString("id-ID"),
            "Nama Perusahaan": order.namaPerusahaan,
            Produk: order.product,
            Jumlah: order.quantity,
            "Harga Total": order.price,
            HPP: order.hpp,
            Laba: order.profit,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "DataOrder");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, `DataOrder_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    return (
        <div className="max-h-screen sm:mt-0 mt-20 px-4 lg:px-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((c, i) => (
                    <Card key={i} sx={{ backgroundColor: cardColors[i], color: "#FFF", borderRadius: "16px", '&:hover': { transform: "scale(1.02)" } }}>
                        <CardContent>
                            <Typography variant="subtitle2">{c.title}</Typography>
                            <Typography variant="h5" className="font-bold">{c.value}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-200">
                {/* Filter input */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <TextField
                        size="small"
                        type="date"
                        label="Tanggal"
                        value={filterDate}
                        onChange={handleFilterDateChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        size="small"
                        label="Cari Keterangan"
                        value={filterSearch}
                        onChange={handleFilterSearchChange}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card sx={{ borderRadius: '1rem' }}>
                        <CardContent className="text-black">
                            <Typography variant="subtitle1" className="mb-4 font-semibold">📝Input Data Order</Typography>
                            <div className="flex flex-col space-y-6 mt-6">
                                <TextField size="small" name="date" type="date" label="Tanggal" value={form.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                                <TextField size="small" name="namaPerusahaan" label="Nama Perusahaan" value={form.namaPerusahaan} onChange={handleInputChange} />
                                <TextField size="small" name="product" label="Nama Produk" value={form.product} onChange={handleInputChange} />
                                <TextField size="small" name="quantity" type="number" label="Jumlah" value={form.quantity} onChange={handleInputChange} />
                                <TextField size="small" name="price" type="number" label="Harga Satuan" value={form.price} onChange={handleInputChange} />
                                <Button variant="contained" className="!bg-sidebar-biru3" onClick={handleAddOrder}>Simpan Data</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-2">
                        <Card sx={{ borderRadius: '1rem' }}>
                            <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                    <Typography variant="subtitle1" className="font-semibold">
                                        📦 Data Order
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={exportToExcel}
                                        sx={{ textTransform: "none" }}
                                    >
                                        📥 Export Excel
                                    </Button>
                                </div>
                                <div style={{ height: 400 }}>
                                    <DataGrid
                                        rows={filteredOrderData}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        sx={{
                                            border: 0,
                                            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f0f0f0" },
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Edit Data Order</DialogTitle>
                <DialogContent className="flex flex-col space-y-4 mt-2">
                    <TextField name="date" type="date" label="Tanggal" value={editForm.date} onChange={handleEditChange} InputLabelProps={{ shrink: true }} />
                    <TextField name="namaPerusahaan" label="Nama Perusahaan" value={editForm.namaPerusahaan} onChange={handleEditChange} />
                    <TextField name="product" label="Nama Produk" value={editForm.product} onChange={handleEditChange} />
                    <TextField name="quantity" type="number" label="Jumlah" value={editForm.quantity} onChange={handleEditChange} />
                    <TextField name="price" type="number" label="Harga Satuan" value={editForm.price} onChange={handleEditChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Batal</Button>
                    <Button variant="contained" onClick={handleEditSubmit}>Simpan</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDelete} onClose={() => setOpenDelete(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Hapus Data</DialogTitle>
                <DialogContent><Typography>Apakah Anda yakin ingin menghapus data ini?</Typography></DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Batal</Button>
                    <Button variant="contained" color="error" onClick={confirmDelete}>Hapus</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}