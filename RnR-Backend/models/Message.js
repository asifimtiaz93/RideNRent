const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation', 
    },
    sender:{
        type: String,
    },
    text:{
        type: String,
    }
});


module.exports = mongoose.model('Message', MessageSchema)