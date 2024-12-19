const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());

// Get-rut för startsidan
app.get('/', (req, res) => {
   res.send('Välkommen till Express-servern!');
}); // <-- Missing closing curly brace added here

// Middleware for 404 errors
app.use((req, res) => res.status(404).json({ message: "Route not found." }));

// Middleware for handling internal server errors
app.use((err, req, res, next) => {
 
