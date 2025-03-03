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
  // step 1: minimal contact details, step 2: additional room details.
  const [step, setStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? value
            ? Number(value)
            : undefined
          : value,
    }));
  };

  // Helper to remove keys with undefined values.
  const sanitizeData = (data: Record<string, any>) =>
    Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

  // Function to add owner data to Firestore in the "ownerdata" collection.
  const addOwnerData = async (owner: Partial<RoomData>) => {
    try {
      const sanitizedOwner = sanitizeData(owner);
      await addDoc(collection(db, "ownerdata"), {
        ...sanitizedOwner,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding owner data:", error);
      throw error;
    }
  };

  // Function to add a full listing to Firestore in the "listings" collection.
  const addListing = async (data: RoomData) => {
    try {
      const sanitizedData = sanitizeData(data);
      await addDoc(collection(db, "listings"), {
        ...sanitizedData,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding listing:", error);
      throw error;
    }
  };

  // Helper function to render input fields.
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

  // STEP 1: Minimal details submission handler.
  // This saves the owner's basic contact info to "ownerdata".
  const handleMinimalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, phone, location } = formData;
    if (!name || !phone) {
      alert("Please fill in Name and Phone.");
      return;
    }
    try {
      await addOwnerData({ name, phone, location });
      alert("Form submitted successfully!");
      setFormData(initialState);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  // Function to proceed to the additional details form.
  const goToAdditionalDetails = () => {
    const { name, phone } = formData;
    if (!name || !phone) {
      alert("Please fill in Name and Phone before proceeding.");
      return;
    }
    setStep(2);
  };

  // STEP 1: Minimal details form.
  if (step === 1) {
    return (
      <div className="max-w-xl mx-auto my-4 p-4 pb-16">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
          📍 List Your Property
        </h2>
        <p className="text-md text-gray-600 text-center mb-4">
          Please provide your basic contact details.
        </p>
        <form onSubmit={handleMinimalSubmit} className="flex flex-col gap-3">
          {inputField("name", "text", "Your Name", "Name")}
          {inputField("phone", "tel", "Phone Number", "Phone")}
          {inputField("location", "text", "Location (optional)", "Location")}
          <div className="flex flex-col gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={goToAdditionalDetails}
              className="bg-gray-500 text-white p-2 rounded-lg"
            >
              Fill Additional Details
            </button>
          </div>
        </form>
      </div>
    );
  }

  // STEP 2: Additional room details form submission handler.
  // This saves both the owner data and the full listing.
  const handleDetailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Save the owner's data.
      const { name, phone, location } = formData;
      await addOwnerData({ name, phone, location });
      // Save the full listing.
      await addListing(formData);
      alert("Listing submitted successfully!");
      setFormData(initialState);
      setStep(1);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  // STEP 2: Additional room details form.
  return (
    <div className="max-w-xl mx-auto my-4 p-4 pb-16">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
        🏠 Additional Room Details
      </h2>
      <p className="text-md text-gray-600 text-center mb-4">
        Please fill out the room details below.
      </p>
      <form onSubmit={handleDetailSubmit} className="flex flex-col gap-3">
        {inputField("email", "email", "Email", "Email")}
        {inputField("title", "text", "Title (optional)", "Title")}
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
            <option value="">Select Room Type (optional)</option>
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
          Submit Listing
        </button>
      </form>
    </div>
  );
}
