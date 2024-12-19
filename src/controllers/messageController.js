const { Message, Conversation } = require('../models/Message.js');


exports.postMessage = async (req, res) => {
   try {
      const { sender, receiver, content, conversationId } = req.body;

      if (!sender || !receiver || !content || !conversationId) {
            return res.status(400).json({ error: 'Sender, receiver, content, conversationId måste finnas med.' });
      }

      //kolla om konversationen finns
      const conversation = await Conversation.findById(conversationId);   
      if (!conversation) {
         return res.status(404).json({ error: 'Konversationen hittades inte.' });
      }

      const message = new Message({ sender, receiver, content, conversationId });
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

      const message = await Message.findById(msgID);
      if (!message) {
         return res.status(404).json({ error: 'Kunde inte hitta meddelandet.' });
      }

      await Message.findByIdAndDelete(msgID);
      res.status(200).json({ message: 'Meddelandet raderades.' });
   } catch (error) {
      res.status(500).json({ error: 'Oopsie nu blev det knas', details: error.message});
   }
};