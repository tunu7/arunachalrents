"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, PlusCircle } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="p-3 bg-white shadow-md flex items-center justify-between">
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
          ArunachalRent
        </Link>

        {/* Add Room Button */}
        <Link href="/add-room" aria-label="Add Room">
          <PlusCircle size={28} className="text-gray-700 hover:text-green-600 transition" />
        </Link>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
}
