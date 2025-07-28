// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        PriceWise
      </Link>
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        ) : session ? (
          <>
            <Link href="/search" className="font-semibold text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="font-semibold text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
