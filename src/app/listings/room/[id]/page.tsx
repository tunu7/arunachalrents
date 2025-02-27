"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db, auth } from "../../../../lib/firebaseClient";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import Image from "next/image"; // Import Next.js Image component

// Define Listing Interface
interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl?: string;
  photos?: string[];
  amenities?: string[];
  structure?: string;
  ownerContact?: string;
  description?: string;
}

export default function RoomDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState<User | null>(null); // Fixed the 'any' type
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Check user authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      } else {
        router.push("/auth/login"); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!id) {
      setError("Invalid room ID.");
      return;
    }

    const fetchListing = async () => {
      setLoading(true);
      setError(null);

      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListing({ id: docSnap.id, ...docSnap.data() } as Listing);
        } else {
          setError("Room not found.");
        }
      } catch (err) {
        console.error("Firestore error:", err);
        setError("Error fetching room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      await addDoc(collection(db, "visitRequests"), {
        listingId: id,
        visitorName,
        visitorEmail,
        message,
        userId: user?.uid, // Associate request with logged-in user
        timestamp: new Date(),
      });
      setSuccessMessage("Request submitted successfully!");
      setVisitorName("");
      setVisitorEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting request:", err);
      setError("Failed to submit request.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading room details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
      {/* Photos Section - Using Next.js Image component */}
      {listing?.photos && listing.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {listing.photos.map((photo, index) => (
            <div key={index} className="relative w-full h-40">
              <Image 
                src={photo} 
                alt={`Room photo ${index + 1}`} 
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
      
      <h1 className="text-2xl font-bold text-gray-800">{listing?.title}</h1>
      <p className="text-gray-600 text-lg">{listing?.location}</p>
      <p className="text-lg font-bold text-blue-600">₹{listing?.price}/month</p>
      
      <p className="text-gray-700 mt-4 text-lg">{listing?.description || "No description available."}</p>
      
      <h2 className="text-xl font-semibold mt-6 text-gray-800">Amenities</h2>
      <ul className="list-disc ml-5 text-gray-700">
        {listing?.amenities?.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        )) || <p>Not specified</p>}
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 text-gray-800">Room Structure</h2>
      <p className="text-gray-700">{listing?.structure || "Not specified"}</p>

      <h2 className="text-xl font-semibold mt-6 text-gray-800">Owner Contact</h2>
      <p className="text-gray-700">{listing?.ownerContact || "Not available"}</p>
      
      <h2 className="text-xl font-semibold mt-6 text-gray-800">Request a Visit</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 bg-gray-100 p-6 rounded-lg">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Name"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          required
        />
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Email"
          value={visitorEmail}
          onChange={(e) => setVisitorEmail(e.target.value)}
          required
        />
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Your Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700"
        >
          Submit Request
        </button>
      </form>
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
}