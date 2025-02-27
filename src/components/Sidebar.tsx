"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X, Home, List, Info, LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  return (
    <>
      {/* Overlay (Closes Sidebar on Click Outside) */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 w-72 h-screen bg-white shadow-xl z-50 flex flex-col p-6"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* Close Button */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-600 transition"
        >
          <X size={26} />
        </button>

        {/* Sidebar Navigation */}
        <nav className="flex-1 mt-10 flex flex-col gap-5">
          <Link
            href="/"
            className="flex items-center gap-3 text-gray-700 text-lg hover:text-black transition"
            onClick={closeSidebar}
          >
            <Home size={22} /> Home
          </Link>
          <Link
            href="/listings"
            className="flex items-center gap-3 text-gray-700 text-lg hover:text-black transition"
            onClick={closeSidebar}
          >
            <List size={22} /> Listings
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-3 text-gray-700 text-lg hover:text-black transition"
            onClick={closeSidebar}
          >
            <Info size={22} /> About Us
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          onClick={closeSidebar}
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white text-lg font-medium px-4 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={22} /> Logout
        </button>
      </motion.div>
    </>
  );
}
