import { useState } from 'react';
import { geocodeLocation, fetchWeatherData, fetchAirQualityData } from '../utils/weatherUtils';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (location, coordinates = null) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let coords = coordinates;
      let locationName = 'Current Location';
      
      // If location string is provided, geocode it
      if (location && typeof location === 'string') {
        const geocoded = await geocodeLocation(location);
        coords = {
          latitude: geocoded.latitude,
          longitude: geocoded.longitude
        };
        locationName = `${geocoded.name}, ${geocoded.country}`;
      } else if (coordinates) {
        // Use provided coordinates
        coords = coordinates;
      } else {
        throw new Error('No location provided');
      }

      // Fetch weather and air quality data in parallel
      const [weather, airQuality] = await Promise.all([
        fetchWeatherData(coords.latitude, coords.longitude),
        fetchAirQualityData(coords.latitude, coords.longitude)
      ]);

      const combinedData = {
        location: locationName,
        temperature: weather.current.temperature,
        condition: weather.current.condition,
        hourlyForecast: weather.hourly,
        aqi: airQuality.aqi,
        aqiLevel: airQuality.level,
        coordinates: coords
      };

      setWeatherData(combinedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weatherData,
    isLoading,
    error,
    fetchData
  };
};