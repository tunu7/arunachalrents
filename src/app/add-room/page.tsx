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
    <div className="flex flex-col">
      {label && <label className="text-gray-500 mb-1">{label}:</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name] || ""}
        onChange={handleChange}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
    </div>
  );

  return (
    <div className="max-w-xl mx-auto my-4 p-4 pb-16">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
        📍 List Your Property
      </h2>
      <p className="text-md text-gray-600 text-center mb-4">
        Fill out the details below to showcase your property for potential tenants.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {inputField("name", "text", "Your Name", "Name")}
        {inputField("phone", "tel", "Phone Number", "Phone")}
        {inputField("email", "email", "Email", "Email")}
        {inputField("title", "text", "Title (optional)", "Title")}
        {inputField("location", "text", "Location (optional)", "Location")}
        {inputField("price", "number", "Price per Month (₹) (optional)", "Price")}
        {inputField("image", "text", "Image URL (optional)", "Image")}

        <div className="flex flex-col">
          <label className="text-gray-500 mb-1">Room Type:</label>
          <select
            name="roomType"
            value={formData.roomType || ""}
            onChange={handleChange}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
          >
            <option value="" disabled>
              Select Room Type (optional)
            </option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="Studio">Studio</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2 rounded-lg hover:opacity-90 transition-all shadow"
        >
          📢 Publish Listing
        </button>
      </form>
    </div>
  );
}
