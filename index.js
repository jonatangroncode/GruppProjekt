// Importera de nödvändiga paketen
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// skapa  en Express-app
const app = express();


// Använd body-parser för att hantera JSON-data i inkommande request
app.use(bodyParser.json());

// Använd CORS för att tillåta begärningar från andra domäner
app.use(cors());

// Definiera en enkel route
app.get('/', (req, res)) => {
	res.send('Välkommen till Express-server!');
});

// Starta servern på port 3000
const port = 3000;
app.listen(port, () => {
	console.log(`Servern kord på http://localhost:${port}`);
});

