"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { Home, Search, User as UserIcon } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const [user, setUser] = useState<User | null>(null); // Fixed the 'any' type
  const [showProfile, setShowProfile] = useState(false);
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    propertyType: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowProfile(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Filters applied:", searchFilters);
    // Here you could navigate to the search page with these filters,
    // for example by using Next.js router push with query params.
    setShowSearchFilters(false);
  };

  return (
    <>
      <footer className="fixed bottom-0 w-full bg-white shadow-md p-1 flex justify-around items-center border-t">
        <Link href="/" className="p-3 rounded-lg hover:bg-gray-200 transition">
          <Home size={20} strokeWidth={1.5} className="text-black" />
        </Link>
        <button
          onClick={() => setShowSearchFilters(true)}
          className="p-2 rounded-lg hover:bg-gray-200 transition"
        >
          <Search size={20} strokeWidth={1.5} className="text-black" />
        </button>
        {user ? (
          <button onClick={toggleProfile} className="p-2 rounded-lg hover:bg-gray-200 transition">
            <UserIcon size={20} strokeWidth={1.5} className="text-black" />
          </button>
        ) : (
          <Link href="/auth/login" className="p-2 rounded-lg hover:bg-gray-200 transition">
            <UserIcon size={20} strokeWidth={1.5} className="text-black" />
          </Link>
        )}
      </footer>

      {/* Profile info panel */}
      {showProfile && user && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <div className="relative w-16 h-16">
                <Image
                  src={user.photoURL}
                  alt="Profile Picture"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                <UserIcon size={24} strokeWidth={1.5} />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{user.displayName || "User"}</h2>
              <p className="text-gray-500">{user.email || "No email provided"}</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <button
              onClick={toggleProfile}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
            <button
              onClick={handleSignOut}
              className="w-full py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Search filters panel */}
      {showSearchFilters && (
        <div className="fixed bottom-20 left-4 z-50 w-80 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filter Listings</h2>
            <button onClick={() => setShowSearchFilters(false)} className="text-blue-600 hover:underline">
              Close
            </button>
          </div>
          <form onSubmit={handleSearchSubmit}>
            <div className="mb-4">
              <label
                htmlFor="filterLocation"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Location
              </label>
              <input
                id="filterLocation"
                type="text"
                name="location"
                value={searchFilters.location}
                onChange={handleSearchChange}
                className="w-full border rounded p-2"
                placeholder="Enter location"
              />
            </div>
            <div className="mb-4 flex space-x-2">
              <div className="w-1/2">
                <label
                  htmlFor="filterMinPrice"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Min Price
                </label>
                <input
                  id="filterMinPrice"
                  type="number"
                  name="minPrice"
                  value={searchFilters.minPrice}
                  onChange={handleSearchChange}
                  className="w-full border rounded p-2"
                  placeholder="Min Price"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="filterMaxPrice"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Max Price
                </label>
                <input
                  id="filterMaxPrice"
                  type="number"
                  name="maxPrice"
                  value={searchFilters.maxPrice}
                  onChange={handleSearchChange}
                  className="w-full border rounded p-2"
                  placeholder="Max Price"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="filterBedrooms"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Bedrooms
              </label>
              <select
                id="filterBedrooms"
                name="bedrooms"
                value={searchFilters.bedrooms}
                onChange={handleSearchChange}
                className="w-full border rounded p-2"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="filterPropertyType"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Property Type
              </label>
              <select
                id="filterPropertyType"
                name="propertyType"
                value={searchFilters.propertyType}
                onChange={handleSearchChange}
                className="w-full border rounded p-2"
              >
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Apply Filters
            </button>
          </form>
        </div>
      )}
    </>
  );
}