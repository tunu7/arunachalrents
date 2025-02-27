"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Sidebar({ isOpen, closeSidebar }: { isOpen: boolean; closeSidebar: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user role from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [db]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    closeSidebar();
    router.push("/login");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between`}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Arunachal Rents</h2>
          <button onClick={closeSidebar} className="text-gray-500 hover:text-red-500 transition">
            <X size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-5">
            <li>
              <Link href="/" className="block text-gray-700 hover:text-gray-900 transition text-lg" onClick={closeSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/listings" className="block text-gray-700 hover:text-gray-900 transition text-lg" onClick={closeSidebar}>
                Listings
              </Link>
            </li>
            <li>
              <Link href="/about" className="block text-gray-700 hover:text-gray-900 transition text-lg" onClick={closeSidebar}>
                About Us
              </Link>
            </li>

            {/* User Dashboard - Dynamic Based on Role */}
            {user && role && (
              <li>
                <Link
                  href={`/dashboard/${role}`}
                  className="block text-blue-600 hover:text-blue-800 transition font-medium text-lg"
                  onClick={closeSidebar}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="w-full text-red-600 hover:text-red-800 transition mt-8 text-lg text-left border-t pt-4"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}
