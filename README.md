Project Summary: Real-Time Grocery Price Comparison Web App
What We Have Built
This project is a full-stack, modern web application that empowers users to instantly compare grocery prices, availability, and delivery times across Swiggy Instamart, Zepto, and Blinkit—three of India’s leading online grocery platforms.

Key Features & Achievements
User Authentication:

Secure signup, login, and forgot password flow implemented with NextAuth.js and MongoDB.

Password hashing and session management ensure user data security.

Animated, Responsive UI:

Built with Next.js, Tailwind CSS, and Framer Motion for sleek, engaging frontend experiences.

Modern, animated components including location selector, search bar, and results cards optimize user engagement.

Location-Aware Search:

Users can enter their city in an auto-complete search powered by a custom Google Places Autocomplete API proxy, ensuring accurate location detection without CORS issues.

Location is globally managed via React Context and persisted for seamless UX.

Real-Time Data Aggregation API:

Backend API calls your own Python Playwright-based scrapers hosted on a dedicated server to fetch live product data (price, availability, delivery time) from Swiggy Instamart, Zepto, and Blinkit.

API normalizes and unifies data formats and intelligently recommends the best platform based on lowest price and fastest delivery.

Robust API Design:

Includes custom proxy API for Google Places to avoid frontend CORS restrictions.

Includes aggregation API to combine multi-source scraper data for frontend consumption.

Scalable Scraping Architecture:

Scrapers built using Playwright to handle dynamic content and JavaScript-heavy pages.

Scraper server exposed via FastAPI allowing secured, scalable data collection.

Project Goals
Empower users to make informed grocery purchase decisions by delivering transparent, real-time price comparisons.

Handle location-specific inventory and pricing for precise recommendations.

Provide fast, user-friendly interaction with animated UI and simplified authentication.

Build a setup that is modular and scalable, enabling you to add more platforms or features easily.

Advantages for Users
Save Time & Money: One stop to compare prices across multiple apps eliminates manual research.

Location-Specific Results: Users get accurate pricing and availability based on their real city.

Secure & Personalized: Login/signup personalizes experience and securely stores preferences.

Smooth UX: Responsive, animated interface keeps users engaged and confident.


