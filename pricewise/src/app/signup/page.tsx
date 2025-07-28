"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setErrorMsg(data.message || "Signup failed");
    }
  }

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-16 p-6 border rounded">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      {errorMsg && <p className="mb-4 text-red-600">{errorMsg}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Sign Up
      </button>
    </form>
  );
}
