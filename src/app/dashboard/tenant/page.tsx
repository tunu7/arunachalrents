"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseClient"; // ✅ Correct Import
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

export default function TenantDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
        return;
      }
      const token = await getIdTokenResult(currentUser);
      if (token.claims.role !== "tenant") {
        router.push("/403");
      } else {
        setUser(currentUser);
      }
    });
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Tenant Dashboard</h1>
      {user && <p>Welcome, {user.email}</p>}
    </div>
  );
}
