"use client";

import { useState } from "react";
import { db } from "../../lib/firebaseClient";
import { collection, addDoc } from "firebase/firestore";
import { FaUser, FaPhone, FaEnvelope, FaHome, FaImage } from "react-icons/fa";

// Define TypeScript interface
interface RoomData {
  name: string;
  phone: string;
  email: string;
  title?: string;
  location?: string;
  price?: number;
  roomType?: string;
  image?: string;
}

export default function AddRoom() {
  const [formData, setFormData] = useState<RoomData>({
    name: "",
    phone: "",
    email: "",
    title: "",
    location: "",
    price: undefined,
    roomType: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const addListing = async (data: RoomData) => {
    try {
      await addDoc(collection(db, "listings"), {
        ...data,
        createdAt: new Date(),
      });

      alert("Your listing is live!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        title: "",
        location: "",
        price: undefined,
        roomType: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill in Name, Phone, and Email.");
      return;
    }
    addListing(formData);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-4">
        📍 List Your Property
      </h2>
      <p className="text-md text-gray-600 text-center mb-6">
        Fill out the details below to showcase your property for potential tenants.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Required Fields */}
        <div className="flex items-center gap-2 border p-3 rounded-lg focus-within:ring-2 ring-blue-500">
          <FaUser className="text-gray-500" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full outline-none text-gray-700"
            required
          />
        </div>

        <div className="flex items-center gap-2 border p-3 rounded-lg focus-within:ring-2 ring-blue-500">
          <FaPhone className="text-gray-500" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full outline-none text-gray-700"
            required
          />
        </div>

        <div className="flex items-center gap-2 border p-3 rounded-lg focus-within:ring-2 ring-blue-500">
          <FaEnvelope className="text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none text-gray-700"
            required
          />
        </div>

        {/* Optional Fields */}
        <div className="flex items-center gap-2 border p-3 rounded-lg focus-within:ring-2 ring-blue-500">
          <FaHome className="text-gray-500" />
          <input
            type="text"
            name="title"
            placeholder="Title (optional)"
            value={formData.title}
            onChange={handleChange}
            className="w-full outline-none text-gray-700"
          />
        </div>

        <input
          type="text"
          name="location"
          placeholder="Location (optional)"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 ring-blue-500 outline-none text-gray-700"
        />

        <input
          type="number"
          name="price"
          placeholder="Price per Month (₹) (optional)"
          value={formData.price || ""}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 ring-blue-500 outline-none text-gray-700"
        />

        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:ring-2 ring-blue-500 outline-none text-gray-700"
        >
          <option value="" disabled>Select Room Type (optional)</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="Studio">Studio</option>
          <option value="Penthouse">Penthouse</option>
        </select>

        <div className="flex items-center gap-2 border p-3 rounded-lg focus-within:ring-2 ring-blue-500">
          <FaImage className="text-gray-500" />
          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={formData.image}
            onChange={handleChange}
            className="w-full outline-none text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-all shadow-md"
        >
          📢 Publish Listing
        </button>
      </form>
    </div>
  );
}
