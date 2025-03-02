"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebaseClient"; // Adjust the path as needed
import { FC, useState } from "react";

interface RoomRequestFormProps {
  listingId: string;
  userId: string | undefined;
  terms?: string;
  onSuccess: (msg: string) => void;
  onClose: () => void;
}

const RoomRequestForm: FC<RoomRequestFormProps> = ({ listingId, userId, terms, onSuccess, onClose }) => {
  const [requesterName, setRequesterName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [govtId, setGovtId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await addDoc(collection(db, "visitRequests"), {
        listingId,
        requesterName,
        occupation,
        govtId,
        userId,
        timestamp: new Date(),
      });
      onSuccess("Request submitted successfully!");
      // Clear fields after submission
      setRequesterName("");
      setOccupation("");
      setGovtId("");
      onClose();
    } catch (err) {
      console.error("Error submitting request:", err);
      setError("Failed to submit request.");
    }
  };

  return (
    <div className="mt-4 bg-gray-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Terms & Conditions</h3>
      <div className="mb-4 text-gray-700 text-sm">
        {terms ? terms : "No specific terms and conditions provided for this room."}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Name"
          value={requesterName}
          onChange={(e) => setRequesterName(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Government ID"
          value={govtId}
          onChange={(e) => setGovtId(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        Cancel
      </button>
    </div>
  );
};

export default RoomRequestForm;
