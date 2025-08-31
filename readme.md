# Weather Web App

A full-stack weather application built with the MERN stack, providing real-time weather, forecasts, historical trends, and air quality data.  

## Features
- **Weather Data**: Current, hourly, and weekly forecasts with historical weather trends.
- **Air Quality Index**: Real-time AQI integration from external APIs.
- **State Management & Caching**: React Query with caching, retries, and error handling.
- **Progressive Web App (PWA)**: Installable, offline support, background sync.
- **Accessibility**: ARIA roles, WCAG-focused UI improvements.
- **Backend API**: Node.js/Express API with rate limiting and caching.
- **Responsive UI**: Mobile-first design with clean layouts.

## Tech Stack
- **Frontend**: React, React Query, TailwindCSS
- **Backend**: Node.js, Express
- **Other**: Service Workers, Workbox, Open-meto API, OpenWeatherMap API

## Setup
```bash
# Clone repo
git clone https://github.com/asgharali97/Weather-Dashoboar

# Install dependencies
cd weather-app
npm install

# Start frontend
npm run dev

# Start backend
cd backend
npm install
npm run dev
