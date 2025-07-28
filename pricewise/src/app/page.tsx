// src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Compare Grocery Prices in Real-Time
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Stop guessing. Find the best deals from Zepto, Blinkit, and Swiggy Instamart instantly. Save money on every order.
        </p>
        <Link
          href={session ? "/search" : "/signup"}
          className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          {session ? "Go to Dashboard" : "Get Started for Free"}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 flex justify-center items-center gap-8"
      >
        <p className="font-semibold text-gray-500">As seen on:</p>
        {/* Replace with actual logos later */}
        <span className="text-xl font-bold text-purple-500">Zepto</span>
        <span className="text-xl font-bold text-yellow-400">Blinkit</span>
        <span className="text-xl font-bold text-orange-500">Swiggy Instamart</span>
      </motion.div>
    </div>
  );
}
