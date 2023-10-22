const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dvr', // Reference to the Driver model
        required: true,
        unique: false
    },
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'psngr', // Reference to the Passenger model
        required: false,
        
        unique: false
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true,
        default: ' ',
    },
    status:{
        type: String,
        required: true,
        default: 'Available',
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ride', rideSchema);
