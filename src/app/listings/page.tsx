"use client";

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function addListing() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <p>Loading...</p>; // Fix hydration error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !location || !price) {
      alert("All fields except image are required!");
      return;
    }

    try {
      await addDoc(collection(db, "listings"), { 
        title, 
        location, 
        price: Number(price),
        imageUrl: imageUrl || null
      });
      alert("Listing added!");
      setTitle("");
      setLocation("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Failed to add listing");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Rental</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-2 w-full rounded" 
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="border p-2 w-full rounded" 
        />
        <input 
          type="number" 
          placeholder="Price (₹/month)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="border p-2 w-full rounded" 
        />
        <input 
          type="text" 
          placeholder="Image URL (Optional)" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          className="border p-2 w-full rounded" 
        />
        <button 
          type="submit" 
          className="bg-purple-600 text-white p-2 w-full rounded hover:bg-purple-700"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
}
