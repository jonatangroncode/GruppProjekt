const express = require('express');
const router = express.router();

//mockup databs för messages
const messages = [];
const conversations = {};

router.post('/messages', (req, res) => {
   const { sender, receiver, content, conversationId } = req.body;

   if (!sender || !receiver || !content || !conversationId) {
           return res.status(400).json({ error: 'Sender, receiver, content, conversationId måste finnas med.' });
   }
       
   if (!conversations[conversationId]) {
      return res.status(404).json({ error: 'Konversationen hittades inte.' });
   }

   const message = {
      id: messages.length +1, //inte den bästa id generatorn. tllfällig
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

router.post('/conversations', (req, res) => {
   const { id } = req.body;

   if (!id) {
      return res.status(400).json({ error: 'Konversationens id krävs.' });
   }

   if (conversations[id]) {
      return res.status(400).json({ error: 'Konversationen finns redan.' });
   }

   conversations[id] = [];
   res.status(201).json({ message: 'Konversationen skapades.', conversationId: id });
});

module.exports = router;