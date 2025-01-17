const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
    participants: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = {
    Message: mongoose.model('Message', messageSchema),
    Conversation: mongoose.model('Conversation', conversationSchema)
};