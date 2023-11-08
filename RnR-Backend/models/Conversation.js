const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'psngr', // Reference the Passenger model
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dvr', // Reference the Driver model
        }
    ],
});

module.exports = mongoose.model('Conversation', ConversationSchema);
