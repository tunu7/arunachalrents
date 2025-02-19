"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../lib/firebaseClient"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import { Home, Search, ShoppingCart, User } from "lucide-react"; // Minimalist icons

export default function Footer() {
  const [user, setUser] = useState<null | {}>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-md p-1 flex justify-around items-center border-t">
      <Link href="/" className="p-3 rounded-lg hover:bg-gray-200 transition">
        <Home size={20} strokeWidth={1.5} className="text-black" />
      </Link>

      <Link href="/search" className="p-2 rounded-lg hover:bg-gray-200 transition">
        <Search size={20} strokeWidth={1.5} className="text-black" />
      </Link>

      <Link href={user ? "/cart" : "/auth/login"} className="p-2 rounded-lg hover:bg-gray-200 transition">
        {user ? (
          <ShoppingCart size={20} strokeWidth={1.5} className="text-black" />
        ) : (
          <User size={20} strokeWidth={1.5} className="text-black" />
        )}
      </Link>
    </footer>
  );
}
