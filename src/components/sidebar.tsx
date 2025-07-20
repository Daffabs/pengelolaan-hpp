"use client";

import {
    Dashboard,
    Engineering,
} from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";


interface NavItem {
    label: string;
    icon: React.ReactElement;
    path: string;
}


interface SidebarProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const navItems: NavItem[] = [
    { label: "Dasboard", icon: <Dashboard fontSize="small" />, path: "/" },
    { label: "Data Order", icon: <ShoppingCartIcon fontSize="small" />, path: "/indexorder" },
    { label: "Data Uang", icon: <MonetizationOnIcon fontSize="medium" />, path: "/indexuang" },
    // { label: "Data Kriteria", icon: <Balance fontSize="small" />, path: "/indexkriteria" },
    // { label: "Penilaian Karyawan", icon: <PsychologyAlt fontSize="small" />, path: "/indexpenilaian" },
    // { label: "Data User", icon: <Settings fontSize="small" />, path: "/indexuser" },
];

const NavButton = ({ item, open }: { item: NavItem; open: boolean }) => {
    const pathname = usePathname();
    const isActive = pathname === item.path;

    return (
        <a
            href={item.path}
            className={`flex items-center gap-4 text-z p-2 rounded-xl transition-colors w-full text-white
                        ${isActive ? "bg-sidebar-biru3" : "hover:bg-sidebar-biru3"}`}
        >
            {item.icon}
            {open && <span className="text-sm font-medium truncate">{item.label}</span>}
        </a>
    );
};


export default function Sidebar({ open, setOpen }: SidebarProps) {
    return (
        <div className="fixed top-1/2 -translate-y-1/2 left-6 z-50">
            {/* MOBILE NAVBAR */}
            <div className="flex items-center justify-between bg-white shadow-xl rounded-2xl p-4 w-[90vw] sm:hidden">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                            src="/images/logo_raharja.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="text-white p-2 rounded-md hover:bg-sidebar-hijau transition"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* SIDEBAR DESKTOP */}
            <div
                className={`hidden sm:flex flex-col justify-between bg-sidebar-biru2 rounded-3xl shadow-xl transition-[width] duration-300 will-change-[width] ${open ? "w-64 p-6" : "w-18 p-4"
                    } min-h-[50vh]`}
            >
                <div className="flex flex-col gap-6">
                    {/* Logo & Toggle */}
                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => !open && setOpen(true)}
                        >
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <Image
                                    src="/images/logo_pengajen2.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            {open && (
                                <span className="text-xl font-bold text-white">
                                    DAFFABS
                                </span>
                            )}
                        </div>
                        {open && (
                            <button
                                onClick={() => setOpen(false)}
                                className="text-white p-1 rounded-full bg-sidebar-biru3 transition font-semibold"
                            >
                                {"<"}
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-4 mt-8">
                        {navItems.map((item, idx) => (
                            <NavButton key={idx} item={item} open={open} />
                        ))}
                    </nav>
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="sm:hidden mt-4 bg-white border border-sidebar-border p-4 rounded-2xl shadow-xl flex flex-col gap-4">
                    {navItems.map((item, idx) => (
                        <NavButton key={idx} item={item} open={true} />
                    ))}
                </div>
            )}
        </div>
    );
}
