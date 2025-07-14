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

### 1️⃣ **Geolocation API**
- **What it does:** Automatically retrieves the user's current latitude and longitude if the user does not manually enter a city.
- **How it works in the app:**
  - When the user clicks “Fetch My Weather” without entering a city, the app requests the user's location.
  - The returned coordinates are used to fetch weather and AQI data accurately for the user's position.

---

### 2️⃣ **Open-Meteo Weather API**
- **Endpoint:**
- **What it does:** Fetches:
- Current temperature (`temperature_2m`).
- Weather condition (`weather_code`).
- Hourly temperature for the next 6 hours to visualize trends.
- **How it works in the app:**
- After receiving coordinates (either from Geolocation API or geocoded city), the app fetches weather data from this endpoint.
- Displays the current temperature and readable weather condition.
- Uses hourly temperature data to render a **Canvas-based line chart**.

---

### 3️⃣ **Open-Meteo Air Quality API**
- **Endpoint:**
- **What it does:** Fetches the **current Air Quality Index (AQI)** based on the US AQI standard.
- **How it works in the app:**
- Using coordinates, the app fetches current AQI data.
- Displays AQI value with a color-coded badge.
- Uses the AQI data to render a **Canvas-based circular AQI indicator** for quick visual insight.

---

### 4️⃣ **Open-Meteo Geocoding API**
- **Endpoint:**
- **What it does:** Converts a **city name into latitude and longitude**.
- **How it works in the app:**
- If the user enters a city in the search bar, the app sends a request to this API to obtain the latitude and longitude.
- These coordinates are then used to fetch weather and AQI data accurately for the searched location.

---

### 5️⃣ **Network Information API**
- **What it does:** Detects whether the user is **online or offline**.
- **How it works in the app:**
- Displays an **offline banner at the top** of the app if the network connection is lost, ensuring user awareness about connectivity issues.

---

### 6️⃣ **Canvas API**
- **What it does:** Enables the drawing of **custom graphics** within the app.
- **How it works in the app:**
- Draws a **line chart** displaying hourly temperature trends.
- Renders a **circular AQI indicator** that visually represents the air quality level using colors and labels.

---

<img width="1894" height="885" alt="image" src="https://github.com/user-attachments/assets/e61fe4ec-8f69-4a1b-88d3-886d5174b0b1" />
                                        This is a Landing Page 
<img width="1888" height="912" alt="image" src="https://github.com/user-attachments/assets/de11db05-a1be-471f-bc8c-536899628c69" />
                                        This is a Actual *Geolocation API* Works
<img width="1871" height="892" alt="image" src="https://github.com/user-attachments/assets/567e5b71-92e1-42bc-b5bd-51d6e658f9af" />
                                        Here we can see *Canvas API*
<img width="1882" height="970" alt="image" src="https://github.com/user-attachments/assets/bfa3f0a5-dc1d-4a42-a04d-17251ee607dd" />
                                        Here we can see *Network Information API*







