import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-extrabold">Welcome to Arunachal Rents</h1>
        <p className="text-lg text-gray-600 mt-3">Find the best rooms for rent with ease.</p>
        <Link href="/listings">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition">
            View Listings
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto my-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { title: "Verified Listings", desc: "All properties are verified for authenticity." },
          { title: "Affordable Prices", desc: "Find budget-friendly rental options." },
          { title: "Easy Booking", desc: "Hassle-free booking and instant confirmation." },
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="bg-white w-full py-12 text-center">
        <h2 className="text-2xl font-semibold">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "Rohan", review: "Great platform! Found my rental easily." },
            { name: "Priya", review: "Smooth booking experience, highly recommend!" },
          ].map((testimonial, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-gray-700 italic">"{testimonial.review}"</p>
              <h4 className="mt-2 font-semibold">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-2xl font-semibold">Ready to find your next home?</h2>
        <Link href="/listings">
          <button className="mt-4 px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition">
            Browse Listings
          </button>
        </Link>
      </section>
    </div>
  );
}
