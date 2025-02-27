"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebaseClient";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";  // ✅ Use next/navigation instead of next/router

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth/login");
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg p-6 rounded-lg border border-gray-200">
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
              <span className="text-2xl">U</span>
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.displayName || "User"}</h2>
            <p className="text-gray-500">{user.email || "No email provided"}</p>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <button
            onClick={handleSignOut}
            className="w-full py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
