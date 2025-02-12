"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <nav className="p-4 bg-white shadow-md flex justify-between items-center relative z-50">
        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="text-gray-700 hover:text-blue-600 transition"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        {/* Centered Logo (Fixed Positioning) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition">
            ArunachalRent
          </Link>
        </div>

        {/* Sidebar & Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)}></div>

        <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out p-6 z-50`}>
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-4 right-4 text-gray-700 hover:text-red-600 transition"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>

          {/* Sidebar Links */}
          <ul className="flex flex-col gap-6 mt-10">
            <li>
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 transition block" onClick={() => setIsOpen(false)}>
                List
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition block" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition block text-center" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
