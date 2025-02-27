"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center">About Arunachal Rents</h1>
        <p className="mt-4 text-gray-600 text-center">
          Arunachal Rents is your trusted platform for finding and renting properties in Arunachal Pradesh.
          Whether you&apos;re looking for a house, apartment, or commercial space, we connect you with the best options.
        </p>
        <p className="mt-4 text-gray-600 text-center">
          Our mission is to make renting hassle-free by providing a seamless, user-friendly experience for both property owners and tenants.
        </p>
      </div>
    </div>
  );
}
