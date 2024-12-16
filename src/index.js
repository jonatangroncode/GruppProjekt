const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes.js');


const app = express();      // Express-app

app.use(express.json()); 

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

