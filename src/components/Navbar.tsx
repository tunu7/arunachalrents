"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Home, PlusCircle, MessageSquare, User } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 p-4 px-6 bg-white shadow-md flex items-center justify-between">
        {/* Mobile: Logo on left, Hamburger on right */}
        <div className="flex items-center w-full md:hidden">
          <Link
            href="/"
            className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition"
          >
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
        <div className="hidden md:flex items-center justify-between w-full relative">
          <Link
            href="/"
            className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition"
          >
            Arunachal Rents
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`flex items-center gap-2 text-gray-700 hover:text-blue-600 transition ${pathname === "/" ? "font-bold" : ""}`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              href="/add-room"
              className="flex items-center gap-2 px-4 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              <PlusCircle size={20} />
              <span>Add Room</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            >
              <MessageSquare size={20} />
              <span>Messages</span>
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center p-2 rounded-full hover:bg-gray-200 transition"
                >
                  <User size={26} className="text-gray-700" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Account
                    </Link>
                    <Link
                      href="/help"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Help
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <button
                      onClick={toggleDarkMode}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
}
