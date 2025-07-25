"use client";
import React, { useEffect, useState } from "react";
import {
    TextField, Button, Card, CardContent, Typography,
    Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from 'axios';

interface FilterState {
    year: string;
    search: string;
}

interface Transaksi {
    id: number;
    date: string;
    keterangan: string;
    jumlah: number;
}

const exportToExcel = (data: Transaksi[], title: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${title}.xlsx`);
};

const TEXTFIELD_STYLE = {
    color: "black",
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E6E7E8" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E6E7E8" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#E6E7E8" },
};

const TextInputField = ({
    label, value, field, onChange, type = "text",
}: {
    label: string;
    value: string;
    field: keyof FilterState;
    onChange: (field: keyof FilterState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}) => (
    <TextField
        fullWidth type={type} label={label} value={value}
        onChange={onChange(field)}
        InputProps={{ sx: TEXTFIELD_STYLE }}
        InputLabelProps={{ style: { color: "black" } }}
    />
);

const DataUang: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({ year: "", search: "" });
    const [uangMasukData, setUangMasukData] = useState<Transaksi[]>([]);
    const [uangKeluarData, setUangKeluarData] = useState<Transaksi[]>([]);
    const [formMasuk, setFormMasuk] = useState({ date: "", keterangan: "", jumlah: "" });
    const [formKeluar, setFormKeluar] = useState({ date: "", keterangan: "", jumlah: "" });
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingData, setEditingData] = useState<Transaksi | null>(null);
    const [editingType, setEditingType] = useState<"masuk" | "keluar">("masuk");

    const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

    useEffect(() => {
        fetchData("masuk");
        fetchData("keluar");
    }, []);

    const fetchData = async (type: "masuk" | "keluar") => {
        try {
            const endpoint = type === "masuk" ? "uang-masuk" : "uang-keluar";
            const res = await axios.get(`${API_BASE}/${endpoint}`);
            const data = res.data;
            const finalData = Array.isArray(data) ? data : data.data || [];
            type === "masuk" ? setUangMasukData(finalData) : setUangKeluarData(finalData);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const handleChange = (field: keyof FilterState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleFormChange = (setter: React.Dispatch<React.SetStateAction<any>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
        };

    const handleAdd = async (type: "masuk" | "keluar") => {
        const form = type === "masuk" ? formMasuk : formKeluar;
        if (!form.date || !form.keterangan || !form.jumlah) return;

        try {
            const endpoint = type === "masuk" ? "uang-masuk" : "uang-keluar";
            const res = await axios.post(`${API_BASE}/${endpoint}`, {
                date: form.date,
                keterangan: form.keterangan,
                jumlah: Number(form.jumlah),
            });

            if (res.data.message?.includes("berhasil")) {
                fetchData(type);
                type === "masuk"
                    ? setFormMasuk({ date: "", keterangan: "", jumlah: "" })
                    : setFormKeluar({ date: "", keterangan: "", jumlah: "" });
            }
        } catch (err) {
            console.error("Add error:", err);
        }
    };

    const handleEdit = (data: Transaksi, type: "masuk" | "keluar") => {
        setEditingData(data);
        setEditingType(type);
        setModalOpen(true);
    };

    const handleDelete = async (id: number, type: "masuk" | "keluar") => {
        try {
            const endpoint = type === "masuk" ? "uang-masuk" : "uang-keluar";
            const res = await axios.delete(`${API_BASE}/${endpoint}/${id}`);
            if (res.data.message?.includes("berhasil")) fetchData(type);
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingData) {
            setEditingData({ ...editingData, [e.target.name]: e.target.name === "jumlah" ? Number(e.target.value) : e.target.value });
        }
    };

    const handleModalSave = async () => {
        if (editingData) {
            try {
                const endpoint = editingType === "masuk" ? "uang-masuk" : "uang-keluar";
                const res = await axios.put(`${API_BASE}/${endpoint}/${editingData.id}`, {
                    date: editingData.date,
                    keterangan: editingData.keterangan,
                    jumlah: editingData.jumlah,
                });
                if (res.data.message?.includes("berhasil")) {
                    fetchData(editingType);
                    setModalOpen(false);
                    setEditingData(null);
                }
            } catch (err) {
                console.error("Edit error:", err);
            }
        }
    };

    const filteredMasuk = uangMasukData.filter(row =>
        (!filters.year || row.date.includes(filters.year)) &&
        (!filters.search || row.keterangan.toLowerCase().includes(filters.search.toLowerCase()))
    );

    const filteredKeluar = uangKeluarData.filter(row =>
        (!filters.year || row.date.includes(filters.year)) &&
        (!filters.search || row.keterangan.toLowerCase().includes(filters.search.toLowerCase()))
    );

    const totalMasuk = uangMasukData.reduce((sum, item) => sum + item.jumlah, 0);
    const totalKeluar = uangKeluarData.reduce((sum, item) => sum + item.jumlah, 0);
    const saldo = totalMasuk - totalKeluar;

    const cardData = [
        { title: "Total Uang Masuk", value: totalMasuk },
        { title: "Total Uang Keluar", value: totalKeluar },
        { title: "Saldo Akhir", value: saldo },
        { title: "Transaksi", value: uangMasukData.length + uangKeluarData.length },
    ];

    const cardColors = ["#2ecc71", "#e74c3c", "#3498db", "#9b59b6"];

    const columns = (type: "masuk" | "keluar"): GridColDef[] => [
        { field: "id", headerName: "ID", width: 70 },
        { field: "date", headerName: "Tanggal", width: 130 },
        { field: "keterangan", headerName: "Keterangan", flex: 1 },
        {
            field: "jumlah",
            headerName: "Jumlah",
            width: 150,
            valueFormatter: (params) => `Rp ${params.value.toLocaleString("id-ID")}`,
        },
        {
            field: "actions",
            headerName: "Aksi",
            width: 160,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <Button size="small" variant="outlined" onClick={() => handleEdit(params.row, type)}>
                        Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(params.row.id, type)}>
                        Hapus
                    </Button>
                </div>
            ),
        },
    ];


    return (
        <div className="max-h-screen sm:mt-0 mt-20 px-4 lg:px-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((c, i) => (
                    <Card key={i} sx={{ backgroundColor: cardColors[i], color: "#FFF", borderRadius: "16px", '&:hover': { transform: "scale(1.02)" } }}>
                        <CardContent>
                            <Typography variant="subtitle2">{c.title}</Typography>
                            <Typography variant="h5" className="font-bold">
                                Rp {c.value.toLocaleString("id-ID")}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* GRUP UANG MASUK */}
            <Card className="shadow-lg !rounded-3xl border">
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <TextInputField label="" type="date" value={filters.year} field="year" onChange={handleChange} />
                        <TextInputField label="Cari Keterangan" value={filters.search} field="search" onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Form Uang Masuk */}
                        <Card className="shadow-md border border-gray-200 !rounded-3xl">
                            <CardContent>
                                <Typography variant="subtitle1" className="mb-4 font-semibold">🟢 Form Input Uang Masuk</Typography>
                                <div className="flex flex-col space-y-6 mt-2">
                                    <TextField size="small" type="date" name="date" label="Tanggal"
                                        value={formMasuk.date} onChange={handleFormChange(setFormMasuk)} InputLabelProps={{ shrink: true }} />
                                    <TextField size="small" name="keterangan" label="Keterangan"
                                        value={formMasuk.keterangan} onChange={handleFormChange(setFormMasuk)} />
                                    <TextField size="small" type="number" name="jumlah" label="Jumlah"
                                        value={formMasuk.jumlah} onChange={handleFormChange(setFormMasuk)} />
                                    <Button variant="contained" className="!bg-datauang-biru text-white font-semibold"
                                        onClick={() => handleAdd("masuk")}>Simpan</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* History Uang Masuk */}
                        <Card className="!rounded-3xl shadow-md border border-gray-200">
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <Typography variant="subtitle1" className="font-semibold">
                                        🟢 History Uang Masuk
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        className="mb-2"
                                        onClick={() => exportToExcel(filteredMasuk, "Data_Uang_Masuk")}
                                        sx={{ textTransform: "none" }}
                                    >
                                        📥Export Excel
                                    </Button>
                                </div>
                                <div style={{ height: 300 }}>
                                    <DataGrid
                                        rows={uangMasukData.filter(row =>
                                            (!filters.year || row.date.includes(filters.year)) &&
                                            (!filters.search || row.keterangan.toLowerCase().includes(filters.search.toLowerCase()))
                                        )}
                                        columns={columns("masuk")}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        sx={{
                                            border: 0,
                                            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f9fafb", fontWeight: "bold" },
                                            "& .MuiDataGrid-cell": { py: 1 }
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* GRUP UANG KELUAR */}
            <Card className="shadow-lg !rounded-3xl border">
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <TextInputField label="" type="date" value={filters.year} field="year" onChange={handleChange} />
                        <TextInputField label="Cari Keterangan" value={filters.search} field="search" onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Form Uang Keluar */}
                        <Card className="!rounded-3xl shadow-md border border-gray-200">
                            <CardContent>
                                <Typography variant="subtitle1" className="mb-4 font-semibold">🔴 Form Input Uang Keluar</Typography>
                                <div className="flex flex-col space-y-6 mt-2">
                                    <TextField size="small" type="date" name="date" label="Tanggal"
                                        value={formKeluar.date} onChange={handleFormChange(setFormKeluar)} InputLabelProps={{ shrink: true }} />
                                    <TextField size="small" name="keterangan" label="Keterangan"
                                        value={formKeluar.keterangan} onChange={handleFormChange(setFormKeluar)} />
                                    <TextField size="small" type="number" name="jumlah" label="Jumlah"
                                        value={formKeluar.jumlah} onChange={handleFormChange(setFormKeluar)} />
                                    <Button variant="contained" className="!bg-datauang-biru text-white font-semibold"
                                        onClick={() => handleAdd("keluar")}>Simpan</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* History Uang Keluar */}
                        <Card className="!rounded-3xl shadow-md border border-gray-200">
                            <CardContent>
                                <div className="flex items-center justify-between mb-4">
                                    <Typography variant="subtitle1" className="font-semibold">
                                        🔴 History Uang Keluar
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        className="mb-2"
                                        onClick={() => exportToExcel(filteredKeluar, "Data_Uang_Keluar")}
                                        sx={{ textTransform: "none" }}
                                    >
                                        📥Export Excel
                                    </Button>
                                </div>
                                <div style={{ height: 300 }}>
                                    <DataGrid
                                        rows={uangKeluarData.filter(row =>
                                            (!filters.year || row.date.includes(filters.year)) &&
                                            (!filters.search || row.keterangan.toLowerCase().includes(filters.search.toLowerCase()))
                                        )}
                                        columns={columns("keluar")}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        sx={{
                                            border: 0,
                                            "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f9fafb", fontWeight: "bold" },
                                            "& .MuiDataGrid-cell": { py: 1 }
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Modal Edit */}
            <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>Edit Transaksi</DialogTitle>
                <DialogContent className="space-y-4">
                    <TextField fullWidth size="small" name="date" type="date" label="Tanggal"
                        value={editingData?.date || ""} onChange={handleModalChange} InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth size="small" name="keterangan" label="Keterangan"
                        value={editingData?.keterangan || ""} onChange={handleModalChange} />
                    <TextField fullWidth size="small" name="jumlah" type="number" label="Jumlah"
                        value={editingData?.jumlah || ""} onChange={handleModalChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>Batal</Button>
                    <Button variant="contained" onClick={handleModalSave} className="!bg-blue-600 text-white">Simpan</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DataUang;