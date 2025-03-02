import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-white mb-14 text-black">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center py-12 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">Find Your Perfect Rental</h1>
        <p className="mt-3 text-md md:text-lg text-gray-500">Quick, safe, and affordable stays.</p>
        <div className="mt-6 flex space-x-4">
          <Link href="/listings">
            <button className="px-6 py-3 bg-gray-200 text-black text-md font-medium rounded-md hover:bg-gray-300 transition">
              Search Room
            </button>
          </Link>
          <Link href="/add-room">
            <button className="px-6 py-3 bg-black text-white text-md font-medium rounded-md hover:bg-gray-700 transition">
              List Your Room
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto my-12 grid grid-cols-2 gap-6 text-center">
        {["Verified Listings", "Affordable Prices", "Fast Booking", "Trusted by Locals"].map((feature, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md bg-white">
            <p className="text-md font-semibold">{feature}</p>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto my-12 text-center">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Search & Find", "Contact Owner", "Move In"].map((step, index) => (
            <div key={index} className="p-4 rounded-lg shadow-md bg-white">
              <p className="text-md font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white py-6 mt-12 text-center text-gray-600 border-t">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-md font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-blue-600 transition">FAQs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-800">Follow Us</h3>
            <div className="mt-2 flex justify-center space-x-4">
              <Link href="https://facebook.com/arunachalrents" target="_blank">
                <span>
                  <FontAwesomeIcon icon={faFacebook} className="text-gray-500 hover:text-blue-600 transition text-xl" />
                </span>
              </Link>
              <Link href="https://twitter.com/" target="_blank">
                <span>
                  <FontAwesomeIcon icon={faTwitter} className="text-gray-500 hover:text-blue-600 transition text-xl" />
                </span>
              </Link>
              <Link href="https://instagram.com/" target="_blank">
                <span>
                  <FontAwesomeIcon icon={faInstagram} className="text-gray-500 hover:text-blue-600 transition text-xl" />
                </span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-800">Legal</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition">Terms</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition">Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Arunachal Rents. All rights reserved.
        </div>
        <div className="mt-2 text-xs">
          Developed by <Link href="https://tunu.info" className="text-blue-600 hover:underline">Tunu Doley</Link>
        </div>
      </footer>
    </div>
  );
}
