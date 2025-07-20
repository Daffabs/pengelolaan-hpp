"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    TextField,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
} from "@mui/material";

interface FilterState {
    division: string;
    jabatan: string;
    year: string;
    search: string;
}

interface Employee {
    name: string;
    division: string;
    level: string;
    jabatan: string;
    nik: string;
    jk: string;
    address: string;
    phone: string;
    bankAcc: string;
    education: string;
    status: string;
    history: {
        date: string;
        desc: string;
        value: number;
    }[];
}

interface TeamMember {
    name: string;
    role: string;
    avatar: string;
    performance: number;
    skills: {
        label: string;
        value: number;
    }[];
}

const divisionOptions = ["IT", "R&D", "Design", "HR"];
const jabatanOptions = [
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
    "UI/UX Designer",
    "CTO",
    "HR Supervisor",
];

const initialTeamPerformance: TeamMember[] = [
    {
        name: "Spiderman",
        role: "UI/UX Designer",
        avatar: "/images/spiderman.png",
        performance: 78,
        skills: [
            { label: "Sikap Kerja", value: 90 },
            { label: "Kemampuan", value: 74 },
            { label: "Kinerja", value: 86 },
            { label: "Absen", value: 78 },
        ],
    },
    {
        name: "Hulk",
        role: "Frontend Developer",
        avatar: "/images/hulk.png",
        performance: 82,
        skills: [
            { label: "Sikap Kerja", value: 90 },
            { label: "Kemampuan", value: 74 },
            { label: "Kinerja", value: 86 },
            { label: "Absen", value: 78 },
        ],
    },
    {
        name: "Captain America",
        role: "Backend Developer",
        avatar: "/images/captain.png",
        performance: 69,
        skills: [],
    },
    {
        name: "Wolverine",
        role: "Business Analyst",
        avatar: "/images/wolf.jpg",
        performance: 60,
        skills: [],
    },
];

const textFieldStyle = {
    color: "white",
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#255F38",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#255F38",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#255F38",
    },
};

const CircleProgress = ({ value }: { value: number }) => {
    const radius = 35;
    const stroke = 6;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="#10b981"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-xs fill-gray-800 font-semibold"
            >
                {value}%
            </text>
        </svg>
    );
};

const FilterForm = ({
    filters,
    handleChange,
    handleSearch,
}: {
    filters: FilterState;
    handleChange: (field: keyof FilterState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
}) => {
    const renderSelectField = (
        label: string,
        value: string,
        field: keyof FilterState,
        options: string[]
    ) => (
        <TextField
            select
            label={label}
            value={value}
            onChange={handleChange(field)}
            fullWidth
            InputProps={{ sx: textFieldStyle }}
            InputLabelProps={{ style: { color: "white" } }}
        >
            <MenuItem value="">Semua</MenuItem>
            {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );

    const renderTextField = (label: string, value: string, field: keyof FilterState) => (
        <TextField
            label={label}
            value={value}
            onChange={handleChange(field)}
            fullWidth
            InputProps={{ sx: textFieldStyle }}
            InputLabelProps={{ style: { color: "white" } }}
        />
    );

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {renderSelectField("Pilih Divisi", filters.division, "division", divisionOptions)}
                {renderSelectField("Pilih Jabatan", filters.jabatan, "jabatan", jabatanOptions)}
                {renderTextField("Pilih Periode", filters.year, "year")}
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {renderTextField("Cari Nama", filters.search, "search")}
                <Button
                    variant="contained"
                    className="bg-green-600 hover:bg-green-500 text-white rounded-lg shadow-sm shadow-green-300"
                    onClick={handleSearch}
                >
                    Cari
                </Button>
            </div>
        </>
    );
};

const DataPenilaian = () => {
    const [filters, setFilters] = useState<FilterState>({
        division: "",
        jabatan: "",
        year: "",
        search: "",
    });

    const [selectedMember, setSelectedMember] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [teamPerformance, setTeamPerformance] = useState<TeamMember[]>(initialTeamPerformance);
    const rowsPerPage = 5;

    useEffect(() => {
        // Filter data berdasarkan input pencarian
        const filteredData = initialTeamPerformance.filter((member) => {
            const matchesSearch = member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                member.role.toLowerCase().includes(filters.search.toLowerCase());
            const matchesDivision = filters.division === "" || member.role.includes(filters.division);
            const matchesJabatan = filters.jabatan === "" || member.role === filters.jabatan;

            return matchesSearch && matchesDivision && matchesJabatan;
        });

        setTeamPerformance(filteredData);
        setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
    }, [filters]);

    const handleChange =
        (field: keyof FilterState) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setFilters((prev) => ({ ...prev, [field]: event.target.value }));
            };

    const handleSearch = () => {
        // Trigger useEffect dengan mengubah state filters
        setFilters({ ...filters });
    };

    // Pagination untuk tabel employee (contoh)
    const paginatedEmployees = [] // Ganti dengan data asli Anda
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="min-h-screen sm:mt-0 mt-20 px-4 lg:px-8">
            <FilterForm filters={filters} handleChange={handleChange} handleSearch={handleSearch} />

            {/* Team Performance Section */}
            <div className="bg-black border border-sidebar-border shadow-sm shadow-green-300 p-6 rounded-2xl mt-8">
                <h2 className="text-lg font-semibold text-white mb-4">Team Performance</h2>
                <div className="space-y-4">
                    {teamPerformance.length > 0 ? (
                        [...teamPerformance]
                            .sort((a, b) => b.performance - a.performance)
                            .map((member, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedMember(selectedMember === idx ? null : idx)}
                                    className={`cursor-pointer p-4 rounded-xl border ${selectedMember === idx
                                        ? "bg-white border-sidebar-border"
                                        : "bg-black border-sidebar-border"
                                        } transition duration-200`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                        <div>
                                            <p className={`font-semibold ${selectedMember === idx ? "text-gray-800" : "text-white"
                                                }`}>
                                                {member.name}
                                            </p>
                                            <p className={`text-sm ${selectedMember === idx ? "text-gray-500" : "text-gray-400"
                                                }`}>
                                                {member.role}
                                            </p>
                                        </div>
                                        <div className={`ml-auto font-bold ${selectedMember === idx ? "text-gray-700" : "text-white"
                                            }`}>
                                            {member.performance}%
                                        </div>
                                    </div>

                                    {selectedMember === idx && member.skills.length > 0 && (
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                            {member.skills.map((skill, sIdx) => (
                                                <div key={sIdx} className="flex flex-col items-center">
                                                    <CircleProgress value={skill.value} />
                                                    <p className="mt-2 text-sm text-gray-700 font-medium">
                                                        {skill.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                    ) : (
                        <p className="text-white text-center py-4">Tidak ada data yang ditemukan</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataPenilaian;