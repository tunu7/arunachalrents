import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-black">
      {/* Main Container */}
      <div className="container mx-auto px-4">
        {/* 1. Hero Section with CTA Buttons for Tenants and Vendors */}
        <section className="w-full min-h-[80vh] flex items-center justify-center text-center bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              FIND YOUR HOME
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Secure, verified rentals for tenants and landlords. Save on fees. Live smart.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
              <Link href="/listings">
                <button className="px-8 py-3 bg-gray-200 text-black font-medium rounded-md hover:bg-gray-300 transition duration-300">
                  Search Rentals (For Tenants)
                </button>
              </Link>
              <Link href="/add-room">
                <button className="px-8 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-700 transition duration-300">
                  List Property (For Vendors)
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Why Us Section */}
        <section className="py-16 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Arunachal Rents?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                First in the Region
              </h3>
              <p className="text-gray-600">
                The pioneering rental platform dedicated to Arunachal Pradesh, tailored to local needs.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Secure & Verified
              </h3>
              <p className="text-gray-600">
                Rigorous verification ensures trust for both tenants and landlords.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Affordable
              </h3>
              <p className="text-gray-600">
                Save up to 40% on fees compared to traditional methods.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                User-Friendly
              </h3>
              <p className="text-gray-600">
                Simple and fast process for listing and finding rentals.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Verification System Details */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            Our Revolutionary Verification System
          </h2>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-gray-600 text-lg mb-6">
              At Arunachal Rents, we’ve built a cutting-edge verification system to ensure safety and trust:
            </p>
            <ul className="text-gray-600 text-left max-w-xl mx-auto list-disc list-inside space-y-2">
              <li>Identity verification using government-issued IDs.</li>
              <li>Comprehensive background checks for tenants.</li>
              <li>Property ownership validation for landlords.</li>
              <li>Ongoing monitoring to maintain compliance.</li>
            </ul>
            <p className="text-gray-600 text-lg mt-6">
              This system is revolutionary because it’s the first of its kind in Arunachal Pradesh, reducing fraud, enhancing safety, and setting a new standard for rental platforms in the region.
            </p>
          </div>
        </section>

        {/* 4. Review Section */}
        <section className="py-16 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">
                "Simple, secure, and affordable. A game-changer for rentals in Arunachal Pradesh."
              </p>
              <p className="text-gray-800 font-semibold">- Anjali</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">
                "Saved on fees and found my perfect rental effortlessly."
              </p>
              <p className="text-gray-800 font-semibold">- Rahul</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}