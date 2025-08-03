"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type LocationContextType = {
  location: string;
  setLocation: (val: string) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocationState] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("user_location");
    if (saved) setLocationState(saved);
  }, []);

  const setLocation = (val: string) => {
    setLocationState(val);
    localStorage.setItem("user_location", val);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};
