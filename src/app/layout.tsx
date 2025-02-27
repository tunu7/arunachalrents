import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <html lang="en" className={hydrated ? "hydrated" : ""}>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
