"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Next.js Image component

// Define Listing Interface
interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl?: string;
  roomType: string;
  amenities: string[];
}

export default function ListingPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch Listings from Firestore
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
      setError("Failed to load listings. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-lg font-extrabold text-gray-900 mb-4 text-center">
        Find Your Perfect Rental
      </h1>

      {/* Error Message with Retry */}
      {error && (
        <div className="text-center bg-red-100 text-red-700 p-3 rounded-md mb-4">
          <p>{error}</p>
          <button
            onClick={fetchListings}
            className="mt-2 bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500 animate-pulse">Fetching available rooms...</p>}

      {/* No Listings Found */}
      {!loading && listings.length === 0 && (
        <p className="text-center text-gray-600">No rooms available at the moment.</p>
      )}

      {/* Listings Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-md shadow-sm overflow-hidden transform transition hover:scale-105">
            {/* Room Image - Using Next.js Image component */}
            {listing.imageUrl ? (
              <div className="relative w-full h-40">
                <Image 
                  src={listing.imageUrl}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}

            {/* Room Details */}
            <div className="p-4">
              <h2 className="text-sm font-bold text-gray-900 uppercase">{listing.roomType}</h2>

              <p className="text-xs text-gray-600 flex items-center gap-1"> {listing.location}</p>

              <p className="text-lg font-bold text-blue-600 mt-1">₹{listing.price}/month</p>

              <button
                onClick={() => router.push(`/listings/room/${listing.id}`)}
                className="mt-3 bg-blue-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-700 w-full transition-shadow shadow-md"
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