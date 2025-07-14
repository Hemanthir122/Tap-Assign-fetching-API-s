import React, { useEffect, useRef } from 'react';
import { getAQIColor } from '../utils/weatherUtils';

export const CircularAQI = ({ aqi, aqiLevel, isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (aqi !== undefined) {
      drawAQIChart();
    }
  }, [aqi, isDark]);

  const drawAQIChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = isDark ? '#374151' : '#e5e7eb';
    ctx.lineWidth = 12;
    ctx.stroke();
    
    // Draw AQI progress
    const aqiPercentage = Math.min(aqi / 300, 1);
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (aqiPercentage * 2 * Math.PI);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = getAQIColor(aqi, isDark);
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Draw AQI value
    ctx.fillStyle = isDark ? '#ffffff' : '#374151';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(aqi, centerX, centerY - 5);
    
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#d1d5db' : '#6b7280';
    ctx.fillText('AQI', centerX, centerY + 20);
  };

  return (
    <div className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
        : 'bg-white/80 backdrop-blur-sm border border-white/20'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 text-center ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        Air Quality Index
      </h3>
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={180}
          height={180}
          className="mb-3"
        />
        <div className="text-center">
          <div 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: `${getAQIColor(aqi, isDark)}20`,
              color: getAQIColor(aqi, isDark)
            }}
          >
            <span 
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: getAQIColor(aqi, isDark) }}
            ></span>
            {aqiLevel}
          </div>
        </div>
      </div>
    </div>
  );
};