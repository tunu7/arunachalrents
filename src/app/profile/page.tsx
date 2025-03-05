"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebaseClient";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) return <p>Loading Dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.displayName || "User"}!</h1>
      <p className="text-lg text-gray-600">Your email: {user.email || "No email provided"}</p>
      
      {/* Messages Section */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <button
          onClick={() => router.push("/dashboard/messages")}
          className="w-full py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
        >
          Check Messages
        </button>
      </div>
      
      {/* Settings Section */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <button
          onClick={() => router.push("/dashboard/settings")}
          className="w-full py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
        >
          Edit Profile
        </button>
      </div>
      
      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="mt-6 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
