const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();      // Express-app

app.use(express.json()); 

app.use(bodyParser.json());   // Middleware hantera i kommande requests json-data 


app.use(cors());   // Middleware Tillåta begräsningar från andra domäner

//mockup databs för messages
const messages = [];
const conversations = {};

// Get-rut för startsidan
app.get('/', (req, res) => {
   res.send('Välkommen till Express-servern!');
});

app.post('/messages', (req, res) => {
   const { sender, receiver, content, conversationId } = req.body;

   if (!sender || !receiver || !content || !conversationId) {
           return res.status(400).json({ error: 'Sender, receiver, content, conversationId måste finnas med.' });
   }
       
   if (!conversations[conversationId]) {
      return res.status(404).json({ error: 'Konversationen hittades inte.' });
   }

   const message = {
      id: messages.length +1,
      sender,
      receiver,
      content,
      conversationId,
      timestamp: new Date().toISOString()
   };

   messages.push(message);
   conversations[conversationId].push(message);

   res.status(201).json({
      message: 'Meddelandet skickades.',
      data: message
   });

       
});

// Start servern på port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Servern körs på port ${PORT}`);
});

