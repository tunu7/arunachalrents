"use client";
import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError(""); // Reset error
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), { email, role });
      alert("Account created! Please login.");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="border p-2 w-full my-2" 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="border p-2 w-full my-2" 
      />
      <select onChange={(e) => setRole(e.target.value)} className="border p-2 w-full my-2">
        <option value="tenant">Tenant</option>
        <option value="owner">Property Owner</option>
      </select>
      <button onClick={handleSignup} className="bg-green-600 text-white p-2 w-full">Sign Up</button>
    </div>
  );
}
