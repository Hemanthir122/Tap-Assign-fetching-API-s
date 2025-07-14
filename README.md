# 🌤️ Local Weather & AQI Tracker

A **clean, modern, responsive React app** that displays **current weather, air quality index (AQI), and visual charts** for your current location or a searched city using **at least 3 required Web APIs**.

Built with **React (JSX), Vite, and Tailwind CSS** for fast performance and a clean, interview-ready UI.

---

## 🚀 Features

✅ **Landing Page** with a gradient background, clear title, and a large “Fetch My Weather” button with animations.  
✅ **Search bar** to enter a city name or use **current location with Geolocation API**.  
✅ Smooth fade/slide transitions to the weather dashboard.  
✅ **Weather Dashboard:**
- Current **temperature** and **weather condition**.
- **Air Quality Index (AQI)** with color-coded badge and readable labels.
- **Canvas API**:
  - A **line chart** showing the temperature for the next 6 hours.
  - A **circular AQI indicator**.
✅ **Offline detection** using **Network Information API** (shows a banner when offline).  
✅ Light/Dark mode toggle for accessibility and comfort.  
✅ Fully **responsive** across mobile, tablet, and desktop devices.  
✅ Smooth, minimal animations for a modern, clutter-free experience.

---

## 🌐 APIs Used and How They Work

### 1️⃣ Geolocation API
- **What it does:** Retrieves the user's current latitude and longitude if the user does not manually enter a city.
- **How it works:** On clicking “Fetch My Weather” without entering a city, the app requests your location, which is then used to fetch accurate weather and AQI data.

---

### 2️⃣ Open-Meteo Weather API
- **What it does:** Fetches the current temperature, weather conditions, and hourly forecast for the next 6 hours to visualize trends.
- **How it works:** After obtaining coordinates, the app fetches weather data to display the current temperature and readable conditions, and plots the hourly data in a **Canvas-based line chart**.

---

### 3️⃣ Open-Meteo Air Quality API
- **What it does:** Fetches the current **Air Quality Index (AQI)**.
- **How it works:** Using coordinates, the app retrieves AQI data, displays the AQI value with a color-coded badge, and uses it to render a **Canvas-based circular AQI indicator** for quick insight.

---

### 4️⃣ Open-Meteo Geocoding API
- **What it does:** Converts a city name into latitude and longitude coordinates.
- **How it works:** If a user enters a city, the app sends a request to obtain coordinates to fetch weather and AQI data accurately for the searched location.

---

### 5️⃣ Network Information API
- **What it does:** Detects whether the user is online or offline.
- **How it works:** Displays an **offline banner** when the user loses internet connection for clear user awareness.

---

### 6️⃣ Canvas API
- **What it does:** Enables drawing custom graphics inside the app.
- **How it works:** Used to draw:
  - A **line chart** displaying hourly temperature trends.
  - A **circular AQI indicator** that visually represents the air quality level using colors and labels.

---

## 📸 Screenshots

<p align="center">
  <img width="900" alt="Landing Page" src="https://github.com/user-attachments/assets/e61fe4ec-8f69-4a1b-88d3-886d5174b0b1" />
</p>

<p align="center" style="font-size: 18px; font-weight: bold; padding: 10px;">
  🚀 This is the Landing Page
</p>

---

<p align="center">
  <img width="900" alt="Geolocation API in Action" src="https://github.com/user-attachments/assets/de11db05-a1be-471f-bc8c-536899628c69" />
</p>

<p align="center" style="font-size: 18px; font-weight: bold; padding: 10px;">
  📍 This demonstrates the <strong>Geolocation API</strong> in action
</p>

---

<p align="center">
  <img width="900" alt="Canvas API" src="https://github.com/user-attachments/assets/567e5b71-92e1-42bc-b5bd-51d6e658f9af" />
</p>

<p align="center" style="font-size: 18px; font-weight: bold; padding: 10px;">
  🎨 Here you can see the <strong>Canvas API</strong> with a temperature line chart and AQI indicator
</p>

---

<p align="center">
  <img width="900" alt="Network Information API" src="https://github.com/user-attachments/assets/bfa3f0a5-dc1d-4a42-a04d-17251ee607dd" />
</p>

<p align="center" style="font-size: 18px; font-weight: bold; padding: 10px;">
  🌐 This shows the <strong>Network Information API</strong> displaying offline status
</p>

---

## ⚙️ Installation & Running Locally

1️⃣ **Clone the repository:**
```bash
git clone <your-repo-url>
cd <your-repo-folder>
