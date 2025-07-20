"use client";
import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import Dashboard from "@/components/dashboard";


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen flex">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={`transition-all duration-300 w-full ${sidebarOpen ? "sm:ml-64" : "sm:ml-20"} p-6`}>
        <Dashboard />
      </div>
    </main>
  );
}
