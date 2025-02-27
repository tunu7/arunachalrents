"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Sidebar({ isOpen, closeSidebar }: { isOpen: boolean; closeSidebar: () => void }) {
  const [user, setUser] = useState<User | null>(null); // Fixed the 'any' type
  const [role, setRole] = useState<string | null>(null); // Store user role
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
          setRole(userSnap.data().role); // Assuming Firestore has { role: "admin" | "tenant" | "vendor" }
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [db]); // Added db as a dependency

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    closeSidebar();
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white text-black shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out p-6`}
      >
        {/* Close Button */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-black hover:text-red-600 transition"
          aria-label="Close Sidebar"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-6">Menu</h2>

        {/* Sidebar Links */}
        <nav>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/" className="text-black hover:text-gray-700 transition block" onClick={closeSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/listings" className="text-black hover:text-gray-700 transition block" onClick={closeSidebar}>
                Listings
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-black hover:text-gray-700 transition block" onClick={closeSidebar}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-black hover:text-gray-700 transition block" onClick={closeSidebar}>
                Contact
              </Link>
            </li>

            {/* Show Dashboard if User is Logged In */}
            {user && role && (
              <li>
                <Link
                  href={`/dashboard/${role}`} // Dynamic path based on role
                  className="text-blue-600 hover:text-blue-800 transition block"
                  onClick={closeSidebar}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </Link>
              </li>
            )}

            {/* Show Logout if User is Logged In */}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 transition block w-full text-left"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}