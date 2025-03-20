"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation"; // Removed useRouter import
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  // Removed: const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 p-4 px-6 bg-white shadow-md flex items-center justify-between">
        {/* Mobile: Logo on left, Hamburger on right */}
        <div className="flex items-center w-full md:hidden">
          <Link href="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition">
            Arunachal Rents
          </Link>
          <div className="ml-auto">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-700 hover:text-blue-600 transition"
              aria-label="Open Menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* Desktop: Logo on left, Navigation menu on right */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Link href="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition">
            Arunachal Rents
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-gray-700 hover:text-blue-600 transition ${pathname === "/" ? "font-bold" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-gray-700 hover:text-blue-600 transition ${pathname === "/about" ? "font-bold" : ""}`}
            >
              About Us
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
            )}
            <Link
              href="/rooms/add"
              className="px-4 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Add Room
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
}
