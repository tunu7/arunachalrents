"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db, auth } from "../../../../lib/firebaseClient";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import Image from "next/image";
import RoomRequestForm from "../../../../components/RoomRequestForm"; // Adjust the path as needed

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
  roomType: string;
  terms?: string;
}

export default function RoomDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Listing[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState<boolean>(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      } else {
        router.push("/auth/login");
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

  useEffect(() => {
    if (listing) {
      const fetchRecommendations = async () => {
        setLoadingRecommendations(true);
        try {
          const recQuery = query(
            collection(db, "listings"),
            where("roomType", "==", listing.roomType)
          );
          const querySnapshot = await getDocs(recQuery);
          const recs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Listing[];
          const filtered = recs.filter((rec) => rec.id !== listing.id);
          setRecommendations(filtered);
        } catch (err) {
          console.error("Error fetching recommendations:", err);
        } finally {
          setLoadingRecommendations(false);
        }
      };
      fetchRecommendations();
    }
  }, [listing]);

  if (loading) return <p className="text-center text-gray-500">Loading room details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-4xl w-full mx-auto mb-2 px-6 py-8 bg-white shadow-lg rounded-lg">
      {/* Photo Section */}
      <div className="mb-8 w-full">
        {listing?.photos && listing.photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
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
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Photos Available</span>
          </div>
        )}
      </div>

      {/* Room Details Section */}
      <div className="mb-8 text-left w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{listing?.roomType}</h2>
        <p className="text-gray-600 text-lg mb-1">{listing?.location}</p>
        <p className="text-lg font-bold text-blue-600 mb-4">₹{listing?.price}/month</p>
        <div className="mt-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h3>
          {listing?.amenities && listing.amenities.length > 0 ? (
            <ul className="list-disc ml-5 text-gray-700">
              {listing.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">Not specified</p>
          )}
        </div>
      </div>

      {/* Request a Visit Section */}
      <div className="mb-8 text-left w-full">
        {!showRequestForm ? (
          <button
            onClick={() => setShowRequestForm(true)}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full hover:bg-blue-700"
          >
            Request a Visit
          </button>
        ) : (
          <RoomRequestForm
            listingId={id}
            userId={user?.uid}
            terms={listing?.terms}
            onSuccess={(msg) => setSuccessMessage(msg)}
            onClose={() => setShowRequestForm(false)}
          />
        )}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
      </div>

      {/* Recommended Rooms Section */}
      <div className="mt-8 text-left w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Rooms</h3>
        {loadingRecommendations && <p className="text-center text-gray-500">Loading recommendations...</p>}
        {!loadingRecommendations && recommendations.length === 0 && (
          <p className="text-center text-gray-600">No recommendations available.</p>
        )}
        {!loadingRecommendations && recommendations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => router.push(`/listings/room/${rec.id}`)}
                className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-1">{rec.roomType}</h4>
                <p className="text-gray-600 mb-1">{rec.location}</p>
                <p className="text-blue-600 font-bold">₹{rec.price}/month</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
