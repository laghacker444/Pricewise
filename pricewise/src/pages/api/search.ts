// src/pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { item } = req.query; // or req.body if POST
  try {
    // Here you'll make real API calls or scraping
    // Example mock response:
    res.status(200).json({
      data: [
        {
          app: "Zepto",
          price: 51,
          rating: 4.6,
          deliveryTime: "18min"
        },
        {
          app: "Blinkit",
          price: 54,
          rating: 4.3,
          deliveryTime: "16min"
        },
        {
          app: "Swiggy Instamart",
          price: 55,
          rating: 4.7,
          deliveryTime: "19min"
        }
      ],
      recommended: "Zepto"
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
}
