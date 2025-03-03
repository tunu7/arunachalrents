"use client";

import { useState } from "react";
import { db } from "../../lib/firebaseClient";
import { collection, addDoc } from "firebase/firestore";

interface RoomData {
  name: string;
  phone: string;
  email?: string;
  title?: string;
  location?: string;
  price?: number;
  roomType?: string;
  image?: string;
}

export default function AddRoom() {
  const [formData, setFormData] = useState<RoomData>({ name: "", phone: "" });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [ownerSubmitted, setOwnerSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sanitizeData = (data: Partial<RoomData>) =>
    Object.fromEntries(Object.entries(data).filter(([, v]) => v)) as Partial<RoomData>;
  
  const addToFirestore = async (collectionName: string, data: Partial<RoomData>) => {
    try {
      await addDoc(collection(db, collectionName), { ...sanitizeData(data), createdAt: new Date() });
    } catch (error) {
      console.error(`Error adding ${collectionName}:`, error);
      alert(`Error: ${(error as Error).message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent, isOwnerStep = true) => {
    e.preventDefault();
    setSubmitting(true);
    const { name, phone } = formData;
    if (!name.trim() || !phone.trim()) return alert("Name and Phone are required.");

    try {
      if (!ownerSubmitted) {
        await addToFirestore("ownerdata", { name, phone, location: formData.location });
        setOwnerSubmitted(true);
      }
      if (!isOwnerStep) {
        await addToFirestore("listings", formData);
        alert("Listing submitted successfully!");
        setFormData({ name: "", phone: "" });
        setStep(1);
        setOwnerSubmitted(false);
      } else {
        alert("Contact details saved!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const InputField = ({ name, type, placeholder, label }: { name: keyof RoomData; type: string; placeholder: string; label?: string }) => (
    <div className="flex flex-col">
      {label && <label className="text-gray-500 mb-1">{label}:</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name] ?? ""}
        onChange={handleChange}
        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700"
        disabled={submitting}
      />
    </div>
  );

  return (
    <div className="max-w-xl mx-auto my-4 p-4 pb-16">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
        {step === 1 ? "📍 List Your Property" : "🏠 Additional Room Details"}
      </h2>
      <form onSubmit={(e) => handleSubmit(e, step === 1)} className="flex flex-col gap-3">
        <InputField name="name" type="text" placeholder="Your Name" label="Name" />
        <InputField name="phone" type="tel" placeholder="Phone Number" label="Phone" />
        {step === 2 && (
          <>
            <InputField name="email" type="email" placeholder="Email" label="Email" />
            <InputField name="title" type="text" placeholder="Title" label="Title" />
            <InputField name="price" type="number" placeholder="Price per Month (₹)" label="Price" />
            <InputField name="image" type="text" placeholder="Image URL" label="Image" />
            <div className="flex flex-col">
              <label className="text-gray-500 mb-1">Room Type:</label>
              <select name="roomType" value={formData.roomType ?? ""} onChange={handleChange} className="border p-2 rounded-lg">
                <option value="">Select Room Type</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50" disabled={submitting}>
          {submitting ? "Submitting..." : step === 1 ? "Submit" : "Submit Listing"}
        </button>
        {step === 1 && (
          <button type="button" onClick={() => setStep(2)} className="bg-gray-500 text-white p-2 rounded-lg">
            Fill Additional Details
          </button>
        )}
      </form>
    </div>
  );
}