import React, { useEffect, useRef } from 'react';

export const CanvasChart = ({ data, isDark, title = "6-Hour Temperature Forecast" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      drawChart();
    }
  }, [data, isDark]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up chart dimensions
    const padding = 50;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Get temperature data
    const temperatures = data.map(item => item.temperature);
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    const tempRange = maxTemp - minTemp || 10;
    
    // Colors based on theme
    const gridColor = isDark ? '#374151' : '#e5e7eb';
    const lineColor = isDark ? '#60a5fa' : '#2563eb';
    const textColor = isDark ? '#d1d5db' : '#374151';
    const pointColor = isDark ? '#60a5fa' : '#2563eb';
    
    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * chartHeight) / 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= data.length - 1; i++) {
      const x = padding + (i * chartWidth) / (data.length - 1);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Draw temperature line
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    
    const points = [];
    temperatures.forEach((temp, index) => {
      const x = padding + (index * chartWidth) / (temperatures.length - 1);
      const y = height - padding - ((temp - minTemp + 5) / (tempRange + 10)) * chartHeight;
      points.push({ x, y, temp });
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = pointColor;
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add white border to points
      ctx.strokeStyle = isDark ? '#1f2937' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    
    // Draw labels
    ctx.fillStyle = textColor;
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    
    data.forEach((item, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      
      // Time labels
      ctx.fillText(item.time, x, height - 15);
      
      // Temperature labels
      const y = height - padding - ((item.temperature - minTemp + 5) / (tempRange + 10)) * chartHeight;
      ctx.fillText(`${item.temperature}°`, x, y - 15);
    });
  };

  return (
    <div className={`rounded-2xl p-6 shadow-lg transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
        : 'bg-white/80 backdrop-blur-sm border border-white/20'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {title}
      </h3>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="w-full h-auto max-w-full"
      />
    </div>
  );
};