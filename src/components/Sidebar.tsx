"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X, Home, List, Info, LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const menuItems = [
  { name: "Home", href: "/", icon: <Home size={22} /> },
  { name: "Listings", href: "/listings", icon: <List size={22} /> },
  { name: "About Us", href: "/about", icon: <Info size={22} /> },
];

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
        className="fixed top-0 left-0 w-72 sm:w-64 h-screen bg-white shadow-xl z-50 flex flex-col p-6 overflow-y-auto"
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
        <ul className="mt-14 flex flex-col gap-6 mb-10">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 text-gray-700 text-lg hover:text-black transition px-2 py-2"
                onClick={closeSidebar}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button - Lowered Slightly */}
        <div className="mt-auto pb-8">
          <button
            onClick={closeSidebar}
            className="w-full flex items-center justify-center gap-3 bg-red-500 text-white text-lg font-medium px-4 py-3 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={22} /> Logout
          </button>
        </div>
      </motion.div>
    </>
  );
}
