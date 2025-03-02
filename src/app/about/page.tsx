"use client";
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen mb-14 bg-gray-50 flex flex-col items-center justify-center py-12">
      <div className="max-w-3xl bg-white px-10 py-12 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          About Arunachal Rents
        </h1>
        <section className="mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Arunachal Rents is the first dedicated web-based rental platform in Arunachal Pradesh, designed to revolutionize the rental market. We aim to reduce brokerage fees and streamline the rental process by leveraging modern technologies like Next.js, ensuring a user-friendly and seamless experience for both tenants and property owners.
          </p>
          <p className="text-lg text-gray-700">
            Operating currently in the Itanagar Capital Region, we’re committed to expanding across the state and diversifying into new rental sectors including adventure camping gear, vehicles, and traditional attire.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            The rental market in Arunachal Pradesh has long suffered from high brokerage fees, inefficient processes, and a lack of security and transparency. Arunachal Rents addresses these issues head-on by offering a structured, cost-effective, and secure solution that brings together tenants and property owners with ease.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Offer</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our platform significantly lowers brokerage fees—up to 40% less than traditional brokers—while ensuring safety and transparency. Tenants submit their name, occupation, and government ID for a secure verification process, allowing property owners to screen and approve or reject visit requests. This proactive approach minimizes disturbances and promotes a respectful rental environment.
          </p>
          <p className="text-lg text-gray-700">
            With SEO-optimized, responsive design and an intuitive search and listing system, Arunachal Rents not only enhances user experience but also lays the groundwork for future revenue streams through listing fees, transaction fees, and premium services.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-700">
            Beyond simplifying the rental process, Arunachal Rents contributes to the local economy by reducing unnecessary costs, boosting job opportunities, and encouraging digital adoption. We are committed to enhancing security and transparency in Arunachal Pradesh’s rental market—making housing more affordable and accessible for everyone.
          </p>
        </section>
      </div>
    </div>
  );
}
