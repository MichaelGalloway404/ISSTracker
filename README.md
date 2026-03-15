# International Space Station (ISS) Tracker

**ISS Tracker** is a web-based application that tracks and visualizes the current position and orbital path of the International Space Station in real-time. The project combines **Node.js**, **Express**, **EJS**, and **HTML5 Canvas** to provide a dynamic, interactive map of the ISS trajectory.

---

## Overview

This project demonstrates real-time API integration, 2D data mapping, and interactive visualization. It fetches live ISS location data from the https://wheretheiss.at/ website and plots both the current position and historical trajectory on a 2D canvas representing the Earth.

Key capabilities:

- Fetches live ISS latitude and longitude data every 10 seconds.
- Converts geospatial coordinates into 2D canvas positions for visualization.
- Maintains and plots the historical path of the ISS using a white trail.
- Highlights the current ISS location with a prominent red marker.
- Provides a link to view the ISS location on Google Maps for real-world correlation.

---

## Technical Highlights

### 1. Backend

- **Node.js + Express** server to handle requests.
- **Axios** for API calls to retrieve ISS coordinates.
- **Body-Parser** middleware for parsing form submissions.
- **EJS Templates** to dynamically inject ISS data into the front-end.

### 2. Data Correlation onto 2D Map

To visualize the ISS path:

1. Latitude (`lat`) ranges from -90° to 90°, and longitude (`lon`) ranges from -180° to 180°.
2. Coordinates are mapped to 2D canvas positions using a simple linear transformation:

```js
function lat_lon_to_X_Y(lat, lon) {
  const x = ((lon + 180) / 360) * canvasWidth;
  const y = ((90 - lat) / 180) * canvasHeight;
  return [x, y];
}
```
---

## Author

Michael Galloway
