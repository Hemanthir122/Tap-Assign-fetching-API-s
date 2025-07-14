import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Thermometer,
  Wind,
  Droplets,
  Moon,
  Sun,
  MapPin,
} from "lucide-react";
import { getAQIColor } from "../utils/weatherUtils";
import { CanvasChart } from "./CanvasChart";
import { CircularAQI } from "./CircularAQI";
import { OfflineBanner } from "./OfflineBanner";

export const WeatherDashboard = ({
  weatherData,
  onBack,
  isDark,
  toggleTheme,
  networkStatus,
}) => {
  if (!weatherData) return null;

  return (
    <motion.div
      className={`min-h-screen transition-all duration-700 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
    >
      {/* Offline Banner */}
      {!networkStatus.isOnline && (
        <OfflineBanner connectionType={networkStatus.connectionType} />
      )}

      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <motion.button
          onClick={onBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
            isDark
              ? "bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-700"
              : "bg-white/80 text-gray-800 hover:bg-white shadow-md border border-white/20"
          } backdrop-blur-sm`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <motion.button
          onClick={toggleTheme}
          className={`p-3 rounded-2xl transition-all duration-300 ${
            isDark
              ? "bg-gray-800/50 text-yellow-400 hover:bg-gray-700/50 border border-gray-700"
              : "bg-white/80 text-gray-800 hover:bg-white shadow-md border border-white/20"
          } backdrop-blur-sm`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
      </div>

      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Weather Card */}
          <motion.div
            className={`rounded-3xl p-8 mb-6 shadow-xl transition-all duration-300 ${
              isDark
                ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                : "bg-white/80 backdrop-blur-sm border border-white/20"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <MapPin
                  className={`w-5 h-5 mr-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <h2
                  className={`text-xl font-light ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {weatherData.location}
                </h2>
              </div>
              <motion.div
                className={`text-7xl md:text-8xl font-thin mb-2 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                {weatherData.temperature}°
              </motion.div>
              <p
                className={`text-xl ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {weatherData.condition}
              </p>
            </div>

            {/* Weather Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                className={`text-center p-6 rounded-2xl ${
                  isDark ? "bg-gray-700/50" : "bg-gray-50/80"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Thermometer
                  className={`w-8 h-8 mx-auto mb-3 ${
                    isDark ? "text-red-400" : "text-red-500"
                  }`}
                />
                <div
                  className={`text-2xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {weatherData.temperature}°C
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Temperature
                </div>
              </motion.div>

              <motion.div
                className={`text-center p-6 rounded-2xl ${
                  isDark ? "bg-gray-700/50" : "bg-gray-50/80"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Wind
                  className={`w-8 h-8 mx-auto mb-3 ${
                    isDark ? "text-green-400" : "text-green-500"
                  }`}
                />
                <div
                  className={`text-2xl font-semibold ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {weatherData.condition}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Condition
                </div>
              </motion.div>

              <motion.div
                className={`text-center p-6 rounded-2xl ${
                  isDark ? "bg-gray-700/50" : "bg-gray-50/80"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <span
                    className="inline-block w-4 h-4 rounded-full mr-2"
                    style={{
                      backgroundColor: getAQIColor(weatherData.aqi, isDark),
                    }}
                  ></span>
                  <span
                    className={`text-2xl font-semibold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {weatherData.aqi}
                  </span>
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Air Quality - {weatherData.aqiLevel}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CanvasChart
                data={weatherData.hourlyForecast}
                isDark={isDark}
                title="6-Hour Temperature Forecast"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <CircularAQI
                aqi={weatherData.aqi}
                aqiLevel={weatherData.aqiLevel}
                isDark={isDark}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
