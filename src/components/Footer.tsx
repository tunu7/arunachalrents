"use client";

import Link from "next/link";
import { Home, PlusCircle, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-md p-1 flex justify-around items-center border-t">
      <Link href="/" className="p-3 rounded-lg hover:bg-gray-200 transition">
        <Home size={24} strokeWidth={3} className="text-gray-900" />
      </Link>
      {/* Add Room Button (Moved from Navbar) */}
      <Link href="/add-room" aria-label="Add Room">
        <PlusCircle size={24} strokeWidth={3} className="text-gray-900 hover:text-green-600 transition" />
      </Link>
      {user ? (
        <Link href="/profile" className="p-2 rounded-lg hover:bg-gray-200 transition">
          <UserIcon size={24} strokeWidth={3} className="text-gray-900" />
        </Link>
      ) : (
        <Link href="/auth/login" className="p-2 rounded-lg hover:bg-gray-200 transition">
          <UserIcon size={24} strokeWidth={3} className="text-gray-900" />
        </Link>
      )}
    </footer>
  );
}
