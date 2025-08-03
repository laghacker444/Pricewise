// src/pages/api/city-autocomplete.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'query' parameter" });
  }

  if (!GOOGLE_API_KEY) {
    return res.status(500).json({ error: "Google API key is not set in environment variables" });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      query
    )}&types=(cities)&language=en&components=country:IN&key=${GOOGLE_API_KEY}`;

    const apiResponse = await fetch(url);
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: "Error fetching from Google Places API" });
    }
    const data = await apiResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error calling Google Places API" });
  }
}
