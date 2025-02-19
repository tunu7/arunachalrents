"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseClient"; // ✅ Correct Import
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import type { User } from "firebase/auth"; // ✅ Fix Type Import

export default function VendorDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkUserRole = useCallback(async (currentUser: User) => {
    try {
      const tokenResult = await getIdTokenResult(currentUser, true);
      const userRole = tokenResult?.claims?.role;

      if (userRole !== "vendor") {
        router.replace("/403"); // ⛔ Redirect Unauthorized Users
      } else {
        setUser(currentUser);
        setRole(userRole);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      router.replace("/403");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/login"); // 🔄 Redirect if not logged in
      } else {
        checkUserRole(currentUser);
      }
    });

    return () => unsubscribe();
  }, [checkUserRole, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-700">Vendor Dashboard</h1>
      {user && (
        <p className="mt-4 text-gray-700">
          Welcome, <span className="font-semibold">{user.email}</span>!
        </p>
      )}
    </div>
  );
}
