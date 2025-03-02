import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <div className="bg-white -mt-3 mb-12 text-black">
      {/* Main Container */}
      <div className="container mx-auto px-1">
        {/* Hero Section with reduced gap */}
        <section className="w-full min-h-[83vh] flex items-center justify-center text-center mb-12">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4">Arunachal Rents</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
              Secure, verified rentals. Save on fees. Live smart.
            </p>
            <div className="flex space-x-6">
              <Link href="/listings">
                <button className="px-8 py-3 bg-gray-200 text-black font-medium rounded-md hover:bg-gray-300 transition">
                  Search Rentals
                </button>
              </Link>
              <Link href="/add-room">
                <button className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-700 transition">
                  List Property
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-8 text-center border-t border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">About Us</h2>
          <p className="text-gray-600 text-lg">
            The first dedicated rental platform for Arunachal Pradesh. Verified listings, secure tenant checks, and low fees.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Low Fees</h3>
              <p className="text-gray-600">Save up to 40%.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Tenants</h3>
              <p className="text-gray-600">Secure & hassle-free.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Listings</h3>
              <p className="text-gray-600">Fast & responsive.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
              <p className="text-gray-600">Register and verify your details.</p>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Browse</h3>
              <p className="text-gray-600">Explore verified rentals.</p>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Book</h3>
              <p className="text-gray-600">Connect & move in.</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "Simple, secure, and affordable. A game-changer for rentals."
              </p>
              <p className="text-gray-800 font-semibold">- Anjali</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "Saved on fees and found my perfect rental effortlessly."
              </p>
              <p className="text-gray-800 font-semibold">- Rahul</p>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Impact</h2>
          <p className="text-gray-600 text-lg">
            Making rentals affordable and boosting the local economy through digital innovation.
          </p>
        </section>
      </div>

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
