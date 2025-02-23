import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 pb-8">

      <main className="flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="w-full bg-white py-20 px-4 text-center shadow-sm">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Welcome to Arunachal Rents
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Discover premium, verified rental properties tailored for your comfort.
          </p>
          <div className="mt-8">
            <Link href="/listings">
              <button className="px-8 py-4 bg-blue-600 text-white text-lg rounded-full shadow-lg hover:bg-blue-700 transition">
                View Listings
              </button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto my-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Verified Listings",
              desc: "Every property is carefully vetted for quality and authenticity.",
            },
            {
              title: "Competitive Pricing",
              desc: "Find rental options that offer the best value for your budget.",
            },
            {
              title: "Easy Booking",
              desc: "Experience a seamless and hassle-free rental process.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Testimonials Section */}
        <section className="w-full bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              What Our Clients Say
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Rohan",
                  review:
                    "Arunachal Rents made finding my perfect rental effortless and enjoyable.",
                },
                {
                  name: "Priya",
                  review:
                    "A truly professional experience with seamless booking and support.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <p className="text-gray-700 italic">
                    "{testimonial.review}"
                  </p>
                  <h4 className="mt-4 font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full bg-gray-600 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to elevate your living experience?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Explore our listings and find your dream home today.
          </p>
          <div className="mt-8">
            <Link href="/listings">
              <button className="px-8 py-4 bg-white text-gray-800 text-lg font-semibold rounded-full shadow-md hover:bg-blue-100 transition">
                Browse Listings
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white py-6 mt-12 mb-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} Arunachal Rents. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
