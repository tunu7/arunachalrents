"use client";

import Link from "next/link";
import { Home, Search, User as UserIcon } from "lucide-react";
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
        <Home size={20} strokeWidth={1.5} className="text-black" />
      </Link>
      <Link href="/search" className="p-2 rounded-lg hover:bg-gray-200 transition">
        <Search size={20} strokeWidth={1.5} className="text-black" />
      </Link>
      {user ? (
        <Link href="/profile" className="p-2 rounded-lg hover:bg-gray-200 transition">
          <UserIcon size={20} strokeWidth={1.5} className="text-black" />
        </Link>
      ) : (
        <Link href="/auth/login" className="p-2 rounded-lg hover:bg-gray-200 transition">
          <UserIcon size={20} strokeWidth={1.5} className="text-black" />
        </Link>
      )}
    </footer>
  );
}
