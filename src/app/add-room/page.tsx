"use client";

import { useState } from "react";
import { db } from "../../lib/firebaseClient";
import { collection, addDoc } from "firebase/firestore";

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
  const initialState: RoomData = {
    name: "",
    phone: "",
    email: "",
    title: "",
    location: "",
    price: undefined,
    roomType: "",
    image: "",
  };

  const [formData, setFormData] = useState<RoomData>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      setFormData(initialState);
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, phone, email } = formData;
    if (!name || !phone || !email) {
      alert("Please fill in Name, Phone, and Email.");
      return;
    }
    addListing(formData);
  };

  const inputField = (
    name: keyof RoomData,
    type: string,
    placeholder: string,
    label?: string
  ) => (
    <div className="border p-3 rounded-lg focus-within:ring-2 ring-blue-500">
      {label && <span className="text-gray-500 mr-2">{label}:</span>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name] || ""}
        onChange={handleChange}
        className="w-full outline-none text-gray-700"
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-900 text-center mb-4">
        📍 List Your Property
      </h2>
      <p className="text-md text-gray-600 text-center mb-6">
        Fill out the details below to showcase your property for potential tenants.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {inputField("name", "text", "Your Name", "Name")}
        {inputField("phone", "tel", "Phone Number", "Phone")}
        {inputField("email", "email", "Email", "Email")}
        {inputField("title", "text", "Title (optional)", "Title")}
        {inputField("location", "text", "Location (optional)", "Location")}
        {inputField("price", "number", "Price per Month (₹) (optional)", "Price")}
        {inputField("image", "text", "Image URL (optional)", "Image")}

        <select
          name="roomType"
          value={formData.roomType || ""}
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