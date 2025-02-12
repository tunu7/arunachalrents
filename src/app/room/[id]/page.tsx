"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Define Listing Interface
interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl?: string;
  amenities?: string[];
  structure?: string;
  ownerContact?: string;
}

export default function RoomDetail({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "listings", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListing({ id: docSnap.id, ...docSnap.data() } as Listing);
        } else {
          setError("Room not found.");
        }
      } catch (err) {
        setError("Error fetching room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  if (loading) return <p className="text-center text-gray-500">Loading room details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button onClick={() => router.back()} className="text-blue-500 underline mb-4">← Back</button>

      <h1 className="text-3xl font-bold">{listing?.title}</h1>
      <p className="text-gray-600">{listing?.location}</p>
      <p className="text-lg font-bold text-blue-600">₹{listing?.price}/month</p>

      {listing?.imageUrl && (
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-60 object-cover rounded-lg my-4" />
      )}

      <h2 className="text-xl font-semibold mt-4">Room Structure</h2>
      <p className="text-gray-700">{listing?.structure || "No details provided."}</p>

      <h2 className="text-xl font-semibold mt-4">Amenities</h2>
      <ul className="list-disc list-inside text-gray-700">
        {listing?.amenities?.map((amenity, index) => <li key={index}>{amenity}</li>) || <p>No amenities listed.</p>}
      </ul>

      {!formSubmitted ? (
        <form
          className="mt-6 bg-gray-100 p-4 rounded"
          onSubmit={(e) => {
            e.preventDefault();
            setFormSubmitted(true);
          }}
        >
          <h2 className="text-xl font-semibold">Request a Visit</h2>
          <input className="w-full p-2 my-2 border rounded" type="text" placeholder="Name" required />
          <input className="w-full p-2 my-2 border rounded" type="text" placeholder="Occupation" required />
          <input className="w-full p-2 my-2 border rounded" type="file" required />
          <button type="submit" className="w-full mt-2 bg-blue-600 text-white p-2 rounded">
            Submit Request
          </button>
        </form>
      ) : (
        <p className="mt-4 text-green-600">Request sent! Contact: {listing?.ownerContact}</p>
      )}
    </div>
  );
}
