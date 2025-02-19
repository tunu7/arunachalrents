"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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

        {/* Right-Side Placeholder (Can Add More Features Later) */}
        <div className="w-8"></div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
}
