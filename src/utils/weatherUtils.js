export const getAQIColor = (aqi, isDark = false) => {
  if (aqi <= 50) return isDark ? '#10b981' : '#059669'; // Green
  if (aqi <= 100) return isDark ? '#f59e0b' : '#d97706'; // Yellow
  if (aqi <= 150) return isDark ? '#f97316' : '#ea580c'; // Orange
  if (aqi <= 200) return isDark ? '#ef4444' : '#dc2626'; // Red
  if (aqi <= 300) return isDark ? '#a855f7' : '#9333ea'; // Purple
  return isDark ? '#7c2d12' : '#92400e'; // Brown
};

export const getAQILevel = (aqi) => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const getWeatherCondition = (weatherCode) => {
  const conditions = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Slight Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Heavy Hail'
  };
  return conditions[weatherCode] || 'Unknown';
};

// Geocoding function to convert city name to coordinates
export const geocodeLocation = async (cityName) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        latitude: result.latitude,
        longitude: result.longitude,
        name: result.name,
        country: result.country,
        admin1: result.admin1
      };
    }
    throw new Error('Location not found');
  } catch (error) {
    throw new Error('Failed to find location');
  }
};

// Fetch weather data from Open-Meteo API
export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code&timezone=auto`
    );
    const data = await response.json();
    
    if (!data.current) {
      throw new Error('Weather data not available');
    }
    
    return {
      current: {
        temperature: Math.round(data.current.temperature_2m),
        condition: getWeatherCondition(data.current.weather_code)
      },
      hourly: data.hourly.temperature_2m.slice(0, 6).map((temp, index) => ({
        time: new Date(data.hourly.time[index]).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          hour12: true 
        }),
        temperature: Math.round(temp)
      }))
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

// Fetch air quality data from Open-Meteo Air Quality API
export const fetchAirQualityData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi&timezone=auto`
    );
    const data = await response.json();
    
    if (!data.current) {
      throw new Error('Air quality data not available');
    }
    
    const aqi = data.current.us_aqi || 0;
    return {
      aqi: Math.round(aqi),
      level: getAQILevel(aqi)
    };
  } catch (error) {
    throw new Error('Failed to fetch air quality data');
  }
};