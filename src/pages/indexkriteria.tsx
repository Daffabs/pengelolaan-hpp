"use client";
import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import DataKriteria from "@/components/kriteria/datakriteria";

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <main className="min-h-screen flex">
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className={`transition-all duration-300 w-full ${sidebarOpen ? "sm:ml-64" : "sm:ml-20"} p-6`}>
                <DataKriteria />
            </div>
        </main>
    );
}
