import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingPage } from "./components/LandingPage";
import { WeatherDashboard } from "./components/WeatherDashboard";
import { useWeatherData } from "./hooks/useWeatherData";
import { useGeolocation } from "./hooks/useGeolocation";
import { useNetworkStatus } from "./hooks/useNetworkStatus";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isDark, setIsDark] = useState(false);
  const { weatherData, isLoading, error, fetchData } = useWeatherData();
  const { getCurrentLocation } = useGeolocation();
  const networkStatus = useNetworkStatus();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleFetchWeather = async (locationInput) => {
    try {
      if (locationInput) {
        await fetchData(locationInput);
      } else {
        const coordinates = await getCurrentLocation();
        await fetchData(null, coordinates);
      }
      setCurrentPage("dashboard");
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    }
  };

  const handleBack = () => {
    setCurrentPage("landing");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="font-sans min-h-screen">
      <AnimatePresence mode="wait">
        {currentPage === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <LandingPage
              onFetchWeather={handleFetchWeather}
              isLoading={isLoading}
              isDark={isDark}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6 }}
          >
            <WeatherDashboard
              weatherData={weatherData}
              onBack={handleBack}
              isDark={isDark}
              toggleTheme={toggleTheme}
              networkStatus={networkStatus}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error handling */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-sm"
        >
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </motion.div>
      )}
    </div>
  );
}

export default App;
