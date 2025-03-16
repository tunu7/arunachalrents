"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Add the 'hydrated' class after the component mounts.
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
