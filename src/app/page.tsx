"use client";

import { useEffect, useState } from "react";
import { db } from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Import router

// Define Listing Interface
interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl?: string;
}

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize Next.js router

  // Fetch Listings from Firestore
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Listing[];

        setListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
        Find Your Perfect Rental
      </h1>

      {loading && <p className="text-center text-gray-500 animate-pulse">Fetching available rooms...</p>}
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}

      {!loading && listings.length === 0 && (
        <p className="text-center text-gray-600">No rooms available at the moment.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
            {listing.imageUrl ? (
              <img src={listing.imageUrl} alt={listing.title} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{listing.title}</h2>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-lg font-bold text-blue-600">₹{listing.price}/month</p>
              
              {/* View Details Button */}
              <button
                onClick={() => router.push(`/room/${listing.id}`)} 
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
