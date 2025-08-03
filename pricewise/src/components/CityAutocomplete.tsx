"use client";

import { useState, useRef } from "react";
import debounce from "lodash.debounce";
import { useLocation } from "@/context/LocationContext";

export default function CityAutocomplete() {
  const { location, setLocation } = useLocation();
  const [input, setInput] = useState(location || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  // Use timeout ref for debounce clearing
  const fetchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced fetch using proxy API
  const fetchCities = debounce(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/city-autocomplete?query=${encodeURIComponent(query)}`);
      if (!res.ok) {
        setSuggestions([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      const cities =
        data.predictions?.map((p: any) => p.description) || [];
      setSuggestions(cities);
    } catch {
      setSuggestions([]);
    }
    setLoading(false);
  }, 350);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInput(val);
    setShowDropdown(true);
    setLoading(true);

    if (fetchRef.current) clearTimeout(fetchRef.current);
    fetchRef.current = setTimeout(() => fetchCities(val), 20);
  }

  function onSelect(city: string) {
    setInput(city);
    setLocation(city);
    setShowDropdown(false);
    setSuggestions([]);
  }

  return (
    <form
      autoComplete="off"
      className="relative flex gap-1 items-center"
      onSubmit={e => {
        e.preventDefault();
        if (suggestions.length) onSelect(suggestions[0]);
        else if (input.trim()) setLocation(input.trim());
        setShowDropdown(false);
      }}
    >
      <label htmlFor="location-input" className="text-gray-600 mr-1">📍</label>
      <input
        id="location-input"
        type="text"
        placeholder="Enter city"
        value={input}
        onFocus={() => setShowDropdown(true)}
        onChange={onInputChange}
        className="border px-3 py-1 rounded focus:ring-2 focus:ring-blue-500 transition w-36 sm:w-44"
      />
      <button
        type="submit"
        className="ml-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
        title="Set Location"
      >
        Set
      </button>
      {/* Loading Indicator */}
      {loading && (
        <div className="absolute right-0 top-full p-2 text-xs text-blue-600">Loading...</div>
      )}
      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow z-50 w-full max-h-56 overflow-auto">
          {suggestions.map((city) => (
            <div
              key={city}
              className="px-3 py-2 cursor-pointer hover:bg-blue-50 select-none"
              onMouseDown={() => onSelect(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
