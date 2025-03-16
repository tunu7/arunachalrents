// src/app/page.tsx
import Link from "next/link";
import Container from "@/components/Container"; // ✅ Correct path for app router imports

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full min-h-[84vh] flex items-center justify-center text-center text-black">
        <Container>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2 animate-fade-in">
            FIND YOUR HOME
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Secure, verified rentals for tenants and landlords. Save on fees. Live smart.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Link href="/listings">
              <button className="px-8 py-3 bg-white text-blue-500 font-medium rounded-md hover:bg-blue-100 transition duration-300">
                Search Rentals (For Tenants)
              </button>
            </Link>
            <Link href="/add-room">
              <button className="px-8 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300">
                List Property (For Vendors)
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Us Section */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Arunachal Rents?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "🌍 First in the Region", text: "Pioneering rental platform dedicated to Arunachal Pradesh." },
              { title: "🔒 Secure & Verified", text: "Rigorous checks ensure safety for all users." },
              { title: "💰 Affordable", text: "Save up to 40% on traditional fees." },
              { title: "📱 User-Friendly", text: "Simple process for listing and finding rentals." },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tenant Verification System Section */}
      <section className="py-16 bg-blue-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12">
            Tenant Verification System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">🔍 Verified Profiles</h3>
              <p className="text-gray-600">
                Our secure verification system ensures all tenants are properly identified and verified for your peace of mind.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">✅ Easy Verification Process</h3>
              <p className="text-gray-600">
                Upload your valid ID, address proof, and employment details securely. Our team verifies your profile within 24 hours.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/verify-tenant">
              <button className="px-8 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300">
                Start Tenant Verification
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Review Section */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { quote: "Simple, secure, and affordable. A game-changer for rentals in Arunachal Pradesh.", author: "Anjali" },
              { quote: "Saved on fees and found my perfect rental effortlessly.", author: "Rahul" },
            ].map((review, index) => (
              <div
                key={index}
                className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <p className="text-gray-600 italic mb-4">&ldquo;{review.quote}&rdquo;</p>
                <p className="text-gray-800 font-semibold">- {review.author}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
