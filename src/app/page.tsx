import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen mb-8 pb-8 bg-white text-black">
     {/* Hero Section */} <section className="w-full flex flex-col items-center text-center py-24 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Find rented rooms easy and fast
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400">
            Use Arunachal Rents and get yours
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Link href="/listings">
            <button className="px-8 py-4 bg-gray-200 text-black text-lg font-semibold rounded-full transition hover:bg-gray-300">
                Find a Room
              </button>
            </Link>
            <Link href="/add-room">
              <button className="px-8 py-4 bg-gray-700 text-white text-lg font-semibold rounded-full transition hover:bg-gray-500">
                Rent Now
              </button>
            </Link>
          </div>
        </section>


      {/* Why Choose Arunachal Rents */}
      <section className="max-w-6xl mx-auto my-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {[
          { icon: "🏠", title: "Verified Listings", desc: "Safe & Secure Stays" },
          { icon: "💰", title: "Affordable Pricing", desc: "No Hidden Charges" },
          { icon: "🚀", title: "Fast Booking", desc: "Seamless & Instant" },
          { icon: "⭐", title: "Trusted by Locals", desc: "Rated 4.9/5" },
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-3xl">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto my-16 text-center">
        <h2 className="text-2xl font-semibold">How It Works</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🔍", title: "Search & Find", desc: "Choose from verified stays" },
            { icon: "📩", title: "Contact Owner", desc: "Chat or book instantly" },
            { icon: "🏡", title: "Move In", desc: "Easy & hassle-free" },
          ].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-3xl">{step.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold">What Our Clients Say</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Nabam", review: "Arunachal Rents made finding my perfect rental effortless and enjoyable." },
              { name: "Riba", review: "A truly professional experience with seamless booking and support." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
               <p className="text-gray-700 italic">&ldquo;{testimonial.review}&rdquo;</p>
                <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gray-900 py-16 text-center">
        <h2 className="text-2xl font-bold text-white">Your Perfect Stay Awaits.</h2>
        <p className="mt-4 text-lg text-blue-100">Find & book verified rooms in minutes.</p>
        <div className="mt-8">
          <Link href="/listings">
            <button className="px-8 py-4 bg-white text-gray-800 text-lg font-semibold rounded-full shadow-md hover:bg-blue-100 transition">
              Browse Listings
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
<footer className="w-full bg-white py-8 mt-12 shadow-inner text-center text-gray-600">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
      <ul className="mt-2 space-y-2">
        <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
        <li><Link href="/about" className="hover:text-blue-600 transition">About</Link></li>
        <li><Link href="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
        <li><Link href="/faqs" className="hover:text-blue-600 transition">FAQs</Link></li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
      <div className="mt-2 flex justify-center space-x-4">
        <Link href="#" className="text-gray-500 hover:text-blue-600 transition">
          <i className="fab fa-facebook text-xl"></i>
        </Link>
        <Link href="#" className="text-gray-500 hover:text-blue-600 transition">
          <i className="fab fa-twitter text-xl"></i>
        </Link>
        <Link href="#" className="text-gray-500 hover:text-blue-600 transition">
          <i className="fab fa-instagram text-xl"></i>
        </Link>
      </div>
    </div>

    {/* Legal Links */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800">Legal</h3>
      <ul className="mt-2 space-y-2">
        <li><Link href="/terms" className="hover:text-blue-600 transition">Terms of Service</Link></li>
        <li><Link href="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
      </ul>
    </div>

  </div>

  <div className="mt-6 text-sm text-gray-500">
    © {new Date().getFullYear()} Arunachal Rents. All rights reserved.
  </div>
</footer>

    </div>
  );
}
