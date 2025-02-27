"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, PlusCircle } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="p-3 px-6 bg-white shadow-md flex items-center justify-between">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-700 hover:text-blue-600 transition"
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition">
          ArunachalRents
        </Link>

        {/* Search Button (Moved from Footer) */}
        <Link href="/search" aria-label="Search">
          <Search size={28} className="text-gray-700 hover:text-blue-600 transition" />
        </Link>
      </nav>

      {/* Sidebar with Overlay */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
}
