<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes.js');


const app = express();      // Express-app

app.use(express.json()); 

app.use(cors());   // Middleware Tillåta begräsningar från andra domäner


// Get-rut för startsidan
app.get('/', (req, res) => {
   res.send('Välkommen till Express-servern!');
});

app.use('/api', messageRoutes);

// Start servern på port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Servern körs på port ${PORT}`);
});
=======
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}.`)
);
>>>>>>> c140f070dba2707b5aa28b48d00aa0d3102adf70

