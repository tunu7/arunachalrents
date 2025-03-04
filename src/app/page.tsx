import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white mb-2 text-black">
      {/* Main Container */}
      <div className="container mx-auto px-4">
        {/* Hero Section with reduced gap */}
        <section className="w-full min-h-[80vh] flex items-center justify-center text-center mb-12 -mt-3">
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
              <p className="text-gray-600">Secure &amp; hassle-free.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Listings</h3>
              <p className="text-gray-600">Fast &amp; responsive.</p>
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
              <p className="text-gray-600">Connect &amp; move in.</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                &quot;Simple, secure, and affordable. A game-changer for rentals.&quot;
              </p>
              <p className="text-gray-800 font-semibold">- Anjali</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                &quot;Saved on fees and found my perfect rental effortlessly.&quot;
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

    </div>
  );
}
