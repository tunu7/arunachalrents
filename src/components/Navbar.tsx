"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, ArrowLeft } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log("Current pathname:", pathname);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 p-2 px-6 bg-white shadow-md flex items-center justify-between">
        {isHome ? (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-700 hover:text-blue-600 transition"
            aria-label="Open Menu"
          >
            <Menu size={26} />
          </button>
        ) : (
          <button
            onClick={() => router.back()}
            className="text-gray-700 hover:text-blue-600 transition"
            aria-label="Go Back"
          >
            <ArrowLeft size={26} />
          </button>
        )}
        <Link href="/" className="text-2xl font-semibold text-gray-800 hover:text-gray-600 transition">
          ArunachalRents
        </Link>
        <Link href="/search" aria-label="Search">
          <Search size={26} className="text-gray-700 hover:text-blue-600 transition" />
        </Link>
      </nav>
      {isHome && (
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      )}
    </>
  );
}
