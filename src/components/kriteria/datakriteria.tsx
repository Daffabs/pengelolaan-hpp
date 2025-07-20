import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const dataKriteria = [
  {
    kode: "KK01",
    kriteria: "Sikap Kerja",
    bobot: 20,
    subkriteria: [
      { kode: "SK01", nama: "Kepatuhan", target: 5 },
      { kode: "SK02", nama: "Kepatuhan", target: 5 },
    ],
  },
  {
    kode: "KK02",
    kriteria: "Kemampuan",
    bobot: 30,
    subkriteria: [
      { kode: "KP01", nama: "Team Work", target: 5 },
      { kode: "KP02", nama: "Inisiatif", target: 5 },
      { kode: "KP03", nama: "Motivasi", target: 5 },
      { kode: "KP04", nama: "Inovatif", target: 5 },
      { kode: "KP05", nama: "Keterampilan", target: 5 },
      { kode: "KP06", nama: "Kecepatan", target: 5 },
    ],
  },
  {
    kode: "KK03",
    kriteria: "Kinerja",
    bobot: 50,
    subkriteria: [
      { kode: "KJ01", nama: "Disiplin", target: 5 },
      { kode: "KJ02", nama: "Tanggung Jawab", target: 5 },
      { kode: "KJ03", nama: "Kepemimpinan", target: 5 },
      { kode: "KP04", nama: "Pencapaian Kinerja", target: 5 },
      { kode: "KJ05", nama: "Kualitas Kerja", target: 5 },
    ],
  },
];

const DataKriteria = () => {
  return (
    <div className="px-4 sm:px-6 min-h-screen mt-20 sm:mt-0">
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            minWidth: 700,
            overflow: "hidden",
            backgroundColor: "#000", // warna background
          }}
        >
          <Table
            sx={{
              border: "1px solid #255F38",
              "& th, & td": {
                border: "1px solid #255F38",
                color: "white",
                fontSize: "0.875rem", // ukuran teks
              },
            }}
          >
            <TableHead sx={{ backgroundColor: "#255F38" }}>
              <TableRow>
                {["KODE", "KRITERIA", "BOBOT", "KODE", "SUBKRITERIA", "NILAI TARGET"].map(
                  (head, index) => (
                    <TableCell key={index} sx={{ color: "white", fontWeight: "bold" }}>
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataKriteria.map((item, idx) =>
                item.subkriteria.map((sub, subIdx) => (
                  <TableRow key={`${idx}-${subIdx}`}>
                    {subIdx === 0 && (
                      <>
                        <TableCell rowSpan={item.subkriteria.length}>{item.kode}</TableCell>
                        <TableCell rowSpan={item.subkriteria.length}>{item.kriteria}</TableCell>
                        <TableCell rowSpan={item.subkriteria.length}>{item.bobot}</TableCell>
                      </>
                    )}
                    {subIdx !== 0 && null}
                    <TableCell>{sub.kode}</TableCell>
                    <TableCell>{sub.nama}</TableCell>
                    <TableCell>{sub.target}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default DataKriteria;
