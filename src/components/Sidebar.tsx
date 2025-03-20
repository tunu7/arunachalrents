"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { 
  X, 
  Home, 
  PlusCircle, 
  MessageSquare, 
  User, 
  HelpCircle, 
  Phone, 
  Moon, 
  LogOut 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const menuItems = [
  { name: "Home", href: "/", icon: <Home size={22} /> },
  { name: "Add Room", href: "/rooms/add", icon: <PlusCircle size={22} /> },
  { name: "Messages", href: "/messages", icon: <MessageSquare size={22} /> },
  { name: "Account", href: "/account", icon: <User size={22} /> },
  { name: "Help", href: "/help", icon: <HelpCircle size={22} /> },
  { name: "Contact Us", href: "/contact", icon: <Phone size={22} /> },
];

export default function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Ensure the portal is rendered only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle dark mode by toggling the "dark" class on document.documentElement
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

  const sidebarContent = (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999] cursor-pointer"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar sliding in from the right */}
      <div
        className={`fixed top-0 right-0 w-72 sm:w-64 h-screen bg-white shadow-xl z-[1000] flex flex-col p-6 pb-16 overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button (positioned at the top-left inside the sidebar) */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 left-4 text-gray-700 hover:text-red-600 transition"
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

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 text-gray-700 text-lg hover:text-black transition px-2 py-2 mb-4"
        >
          <Moon size={22} /> {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout Button */}
        <button
          onClick={closeSidebar}
          className="w-full flex items-center justify-center gap-3 bg-red-500 text-white text-lg font-medium px-4 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={22} /> Logout
        </button>
      </div>
    </>
  );

  if (!mounted) return null;
  return createPortal(sidebarContent, document.body);
}
