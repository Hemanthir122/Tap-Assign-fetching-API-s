import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, MapPin, Search } from 'lucide-react';

export const LandingPage = ({ onFetchWeather, isLoading, isDark }) => {
  const [searchLocation, setSearchLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFetchWeather(searchLocation.trim() || null);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400'
    }`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.div 
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <Sun className={`w-12 h-12 ${isDark ? 'text-yellow-400' : 'text-yellow-300'}`} />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cloud className={`w-8 h-8 ${isDark ? 'text-gray-300' : 'text-white'} absolute -top-1 -right-2`} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <CloudRain className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-200'} absolute -bottom-1 -left-2`} />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1 
          className={`text-5xl md:text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-white'
          } font-sans tracking-tight`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Local Weather & AQI Tracker
        </motion.h1>
        
        <motion.p 
          className={`text-lg md:text-xl ${
            isDark ? 'text-gray-300' : 'text-white/90'
          } font-light tracking-wide`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Get real-time weather and air quality data for any location
        </motion.p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit}
        className="w-full max-w-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Enter city name (or leave empty for current location)"
            className={`w-full pl-12 pr-4 py-4 rounded-2xl text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
              isDark
                ? 'bg-gray-800/50 text-white placeholder-gray-400 border border-gray-600 focus:ring-blue-500/30 focus:border-blue-500'
                : 'bg-white/90 text-gray-800 placeholder-gray-500 border border-white/20 focus:ring-purple-300/50 focus:border-purple-400'
            } backdrop-blur-sm shadow-lg`}
          />
          <MapPin className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
      </motion.form>

      <motion.button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
        className={`
          relative px-12 py-4 rounded-2xl text-lg font-semibold
          transform transition-all duration-300 ease-out
          ${isLoading 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-105 hover:shadow-2xl active:scale-95'
          }
          ${isDark
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-500 hover:to-purple-500'
            : 'bg-white text-gray-800 shadow-lg hover:shadow-xl'
          }
          focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50
        `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: isLoading ? 1 : 1.05 }}
        whileTap={{ scale: isLoading ? 1 : 0.95 }}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Fetching Weather...</span>
          </div>
        ) : (
          'Fetch My Weather'
        )}
      </motion.button>

      <motion.div 
        className="mt-8 opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ delay: 1.2 }}
      >
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-white/80'} text-center`}>
          Enter a city name or use your current location for weather data
        </p>
      </motion.div>
    </div>
  );
};