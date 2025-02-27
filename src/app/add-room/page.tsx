"use client";

import { useState } from "react";
import { db } from "@/lib/firebaseClient"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";

export default function AddRoom() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "", // Initially a string
    roomType: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value, // Convert price to number
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.price || !formData.roomType) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Firestore: Add room data
      await addDoc(collection(db, "listings"), {
        title: formData.title,
        location: formData.location,
        price: formData.price, // Ensure it's a number
        roomType: formData.roomType,
        image: formData.image || "", // Avoid undefined values
        createdAt: new Date(),
      });

      console.log("Room added:", formData);
      alert("Room added successfully!");

      // Reset form
      setFormData({
        title: "",
        location: "",
        price: "",
        roomType: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Error adding room. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-2 mb-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-5">Add a Room</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Room Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price per Month"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />
        <select
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="" disabled>Select Room Type</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="Studio">Studio</option>
          <option value="Penthouse">Penthouse</option>
        </select>
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="border p-3 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
