"use client";
import Link from "next/link";
import Container from "@/components/Container";
import {
  FiHome,
  FiShield,
  FiDollarSign,
  FiSearch,
  FiUser,
  FiCheckCircle,
  FiTrendingUp,
  FiStar,
} from "react-icons/fi";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full min-h-[90vh] flex items-center text-center text-black px-4 md:px-8">
        <Container>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fade-in">
            Arunachal Rents: Revolutionizing Rentals in Arunachal Pradesh
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Discover secure, verified, and affordable rentals for tenants and property owners.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
            <Link href="/listings">
              <button className="flex items-center px-8 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-100 transition duration-300">
                <FiSearch className="mr-2 text-xl" />
                Search Rentals
              </button>
            </Link>
            <Link href="/add-room">
              <button className="flex items-center px-8 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300">
                <FiHome className="mr-2 text-xl" />
                List Your Property
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Us Section */}
      <section className="py-16 bg-white px-4 md:px-8">
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

       {/* Market Need & Challenges */}
       <section className="py-16 bg-white px-4 md:px-8">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            The Challenges in Today&apos;s Rental Market
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                icon: <FiDollarSign />,
                title: "High Brokerage Fees",
                text: "Traditional brokers charge excessive fees, making rentals costly.",
              },
              {
                icon: <FiShield />,
                title: "Lack of Security &amp; Transparency",
                text: "Property owners face disturbances from unverified visitors.",
              },
              {
                icon: <FiUser />,
                title: "Time-Consuming Process",
                text: "Finding suitable accommodations through outdated methods is inefficient.",
              },
              {
                icon: <FiTrendingUp />,
                title: "Absence of a Structured Platform",
                text: "Arunachal Pradesh lacks a dedicated, tech-driven rental solution.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-2xl text-blue-700">{item.icon}</div>
                <p className="text-gray-700 text-lg">
                  <strong>{item.title}:</strong> {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Innovative Solution */}
      <section className="py-16 bg-gray-50 px-4 md:px-8">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6">
            Our Innovative Solution
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-blue-900 text-lg leading-relaxed">
              Arunachal Rents streamlines the rental process using modern web technologies like Next.js to create a user-friendly, secure, and cost-effective platform.
            </p>
            <ul className="list-none space-y-4">
              {[
                { icon: <FiDollarSign />, text: "Lower Brokerage Fees: Save up to 40%." },
                { icon: <FiShield />, text: "Secure Tenant Verification with ID screening." },
                { icon: <FiCheckCircle />, text: "Transparent Rental Terms available upfront." },
                { icon: <FiSearch />, text: "Streamlined Listings &amp; Search functionality." },
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="text-2xl text-blue-700 mr-3">{item.icon}</div>
                  <span className="text-blue-900 text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Review Section */}
      <section className="py-16 bg-gray-100 px-4 md:px-8">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Riba", review: "Arunachal Rents helped me find a secure rental in Itanagar in no time!" },
              { name: "Pema L.", review: "The process was smooth, and I saved a lot on brokerage fees." },
              { name: "Nabam", review: "The verification system gave me peace of mind as a property owner." },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-blue-200 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-3">
                  <FiStar className="text-yellow-400 text-xl mr-2" />
                  <h3 className="text-lg font-bold">{item.name}</h3>
                </div>
                <p className="text-gray-700">{item.review}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final Call-to-Action */}
      <section className="py-16 bg-blue-800 px-4 md:px-8">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
            Ready to Experience a New Era of Rentals?
          </h2>
          <p className="text-white text-lg text-center max-w-3xl mx-auto mb-10">
            Whether you&apos;re a tenant or a property owner, join Arunachal Rents today and be part of the rental revolution.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link href="/listings">
              <button className="px-8 py-3 bg-white text-blue-800 font-medium rounded-md hover:bg-blue-100 transition duration-300">
                Find Your Home
              </button>
            </Link>
            <Link href="/add-room">
              <button className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-blue-700 transition duration-300">
                List Your Property
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
