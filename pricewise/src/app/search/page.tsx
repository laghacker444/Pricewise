"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SearchResult {
  app: string;
  price: number;
  rating: number;
  deliveryTime: string;
}

interface ApiResponse {
  data: SearchResult[];
  recommended: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirects to login page
    }
  }, [status]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(`/api/search?item=${encodeURIComponent(query.trim())}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data: ApiResponse = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return null; // will redirect to login due to above useEffect
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <motion.input
          type="text"
          placeholder="Search for grocery items e.g. Maggi, Milk"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </form>

      {/* Loading, Error, and Results */}
      {loading && <p className="text-center text-gray-600">Searching...</p>}

      {error && <p className="text-center text-red-600">{error}</p>}

      {results && results.data.length === 0 && (
        <p className="text-center text-gray-600">No results found for "{query}"</p>
      )}

      {results && results.data.length > 0 && (
        <div className="space-y-6">
          {results.data.map((item) => {
            const isRecommended = results.recommended === item.app;
            return (
              <motion.div
                key={item.app}
                className={`border rounded-md p-4 shadow-md ${
                  isRecommended ? "bg-green-100 border-green-500" : "bg-white"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-2">{item.app}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Rating: {item.rating.toFixed(1)}</p>
                <p>Delivery Time: {item.deliveryTime}</p>
                {isRecommended && (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                    Recommended
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
