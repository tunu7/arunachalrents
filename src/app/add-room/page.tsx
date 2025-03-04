"use client";

import React, { useState, useCallback } from "react";
import { db } from "../../lib/firebaseClient";
import { collection, addDoc } from "firebase/firestore";
import OwnerForm from "./components/OwnerForm";
import RoomDetailsForm from "./components/RoomDetailsForm";

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
  const [formData, setFormData] = useState<RoomData>({
    name: "",
    phone: "",
    email: "",
    title: "",
    price: undefined,
    roomType: "",
    image: "",
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [ownerSubmitted, setOwnerSubmitted] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

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
        setFormData({
          name: "",
          phone: "",
          email: "",
          title: "",
          price: undefined,
          roomType: "",
          image: "",
        });
        setStep(1);
        setOwnerSubmitted(false);
      } else {
        alert("Contact details saved!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-4 p-4 pb-4">
      <form onSubmit={(e) => handleSubmit(e, step === 1)} className="flex flex-col gap-3">
        {step === 1 ? (
          <OwnerForm formData={formData} handleChange={handleChange} submitting={submitting} />
        ) : (
          <RoomDetailsForm formData={formData} handleChange={handleChange} submitting={submitting} />
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