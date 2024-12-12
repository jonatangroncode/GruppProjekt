const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();      // Express-app



app.use(bodyParser.json());   // Middleware hantera i kommande requests json-data 


app.use(cors());   // Middleware Tillåta begräsningar från andra domäner



// Get-rut för startsidan
app.get('/', (req, res) => {
   res.send('Välkommen till Express-servern!');
});



// Start servern på port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Servern körs på port ${PORT}`);
});

