"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setErrorMsg("Invalid email or password");
    } else {
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-16 p-6 border rounded">
      <h1 className="text-2xl mb-4">Login</h1>
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
      <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
        Login
      </button>
    </form>
  );
}
