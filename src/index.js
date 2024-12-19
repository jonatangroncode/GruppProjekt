<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')

=======
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
>>>>>>> f3bc4bd9916ebff4b591450cb679eaac144f3440
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD

app.use(cors());   // Middleware Tillåta begräsningar från andra domäner

connectDB ();

// Get-rut för startsidan
app.get('/', (req, res) => {
   res.send('Välkommen till Express-servern!');
=======
app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error." });
>>>>>>> f3bc4bd9916ebff4b591450cb679eaac144f3440
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}.`)
);

