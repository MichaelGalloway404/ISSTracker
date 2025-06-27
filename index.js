import express from "express";               // Express framework for creating the web server
import bodyParser from "body-parser";        // Middleware to parse form data
import axios from "axios";                   // HTTP client to make API requests

// Create an instance of the Express app
const app = express();
const port = 3000;

// Serve static files from the "public" directory (CSS, JS, images, ect...)
app.use(express.static("public"));

// Middleware to parse URL-encoded form data (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS for rendering dynamic HTML
app.set("view engine", "ejs");

// URL for Google Maps to show ISS location
let googleMap = "https://www.google.com/maps/place/";

// create a google map link using the latitude and longitude from the ISS API
let googleLink;
let plot = []; // Array to store past ISS positions [latitude, longitude]

// Handle GET requests to the homepage 
app.get("/", async (req, res) => {
  try {
    // Get ISS location from the external API
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    const result = response.data;

    // Save the current latitude and longitude to the path array
    plot.push([result.latitude, result.longitude]);

    // Construct a Google Maps link for the current location
    googleLink = `${googleMap}${result.latitude},${result.longitude}/@${result.latitude},${result.longitude},1z`;

    // Render the index.ejs page, passing ISS data to the template
    res.render("index.ejs", {
      urlToGo: googleLink,
      latitude: result.latitude,
      longitude: result.longitude,
      plotedPath: plot,
    });

  } catch (error) {
    // Log and display an error if the API call fails
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

// Handle POST requests to the root URL, when a user clicks the form button to manually refresh the ISS location
app.post("/", async (req, res) => {
  try {
    // Fetch updated ISS location
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    const result = response.data;

    // Add new coordinates to the historical path
    plot.push([result.latitude, result.longitude]);

    // Generate updated Google Maps URL
    googleLink = `${googleMap}${result.latitude},${result.longitude}/@${result.latitude},${result.longitude},1z`;

    // Render page with new data
    res.render("index.ejs", {
      urlToGo: googleLink,
      latitude: result.latitude,
      longitude: result.longitude,
      plotedPath: plot,
    });

  } catch (error) {
    // Handle any request failure
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

// Start Express server 
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
