const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

// Get route for homepage
app.get("/", (req, res) => {
  res.send("Välkommen till Express-servern!");
});

// Middleware for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Middleware for handling internal server errors
app.use((err, req, res, next) => {
  console.error(err);  // Log error details
  res.status(500).json({ message: "Internal server error." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

