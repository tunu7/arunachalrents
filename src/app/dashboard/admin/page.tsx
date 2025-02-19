"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseClient"; // ✅ Correct Import
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Redirect if not logged in
        return;
      }

      try {
        const token = await getIdTokenResult(currentUser, true); // Force refresh token
        const role = token?.claims?.role;

        if (role !== "admin") {
          router.push("/403"); // Redirect if not an admin
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error fetching role claims:", error);
        router.push("/403");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {user && <p>Welcome, {user.email}</p>}
    </div>
  );
}
