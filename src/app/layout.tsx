import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HydratedLayout from "../components/HydratedLayout"; // Import the client component
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <HydratedLayout>
          <main className="p-4">{children}</main>
        </HydratedLayout>
        <Footer />
      </body>
    </html>
  );
}
