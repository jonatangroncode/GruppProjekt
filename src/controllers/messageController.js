const { Message, Conversation } = require('../models/Message.js');


exports.postMessage = async (req, res) => {
   try {
      const { sender, receiver, content } = req.body;

      if (!sender || !receiver || !content) {
            return res.status(400).json({ error: 'Sender, receiver, content, conversationId måste finnas med.' });
      }

      let conversation = await Conversation.findOne({ participants: { $all: [sender, receiver] } });
      
      if (!conversation) {
         conversation = new Conversation({ participants: [sender, receiver] });
         await conversation.save();
      }
      //kolla om konversationen finns
      //ÄNDRAD till att skicka till databasen för tillfället
      /*const conversation = await Conversation.findById(conversationId);   
      if (!conversation) {
         return res.status(404).json({ error: 'Konversationen hittades inte.' });
      }
      */
      const message = new Message({ sender, receiver, content, conversationId: conversation._id });
      await message.save();

      res.status(201).json({
         message: 'Meddelandet skickades.',
         data: message
      });
   } catch (error) {
      res.status(500).json({ error: 'Oopsie nu blev det knas.', details: error.message });
   }
};

exports.getMessage = async (req, res) => {
   try {
      const { userId, conversationId } = req.query;
      
      //hämta från specifik konversation
      if (!userId && !conversationId) {
         return res.status(400).json({ error: 'userId eller conversationId behövs.' });
      }

      let messages;
      if (conversationId) {
         messages = await Message.find({ conversationId });
      } else if (userId) {
         //hämta meddelanden som användaren är delaktig i
         messages = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] });
      }

      res.status(200).json({ data: messages });
   } catch (error) {
      res.status(500).json({ error: 'Oopsie nu blev det knas.', details: error.message });
   }
};

exports.getAllMessages = async (req, res) => {
   try {
      const { userId } = req.query;

      if (!userId) {
         return res.status(400).json({ error: 'userId behövs.' });
      }

      const conversations = await Conversation.find({ participants: userId });
      res.status(200).json({ data: conversations });
   } catch (error) {
      res.status(500).json({ error: 'Oopsie nu blev det knas.', details: error.message });
   }
};

exports.deleteMessage = async (req, res) => {
   try {
      const { msgID } = req.params;
      const userID = req.user.id;

      const message = await Message.findById(msgID);
      if (!message) {
         return res.status(404).json({ error: 'Kunde inte hitta meddelandet.' });
      }

      if (message.userID.toString() !== userID) {
         return res.status(403).json({ error: 'Du har inte rätt att ta bort meddelandet.' });
      }

      await Message.findByIdAndDelete(msgID);
      res.status(200).json({ message: 'Meddelandet raderades.' });
   } catch (error) {
      res.status(500).json({ error: 'Oopsie nu blev det knas', details: error.message});
   }
};