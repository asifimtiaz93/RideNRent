const mongoose = require('mongoose');

const rideHistorySchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dvr', // Reference to the Driver model
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'psngr', // Reference to the Passenger model
  },
  pickup: String,
  destination: String,
  time: String,
  completionDate: Date,
  fare: Number,
  review: {
    type: Number,
    default: 0,
    

  },
});

module.exports = mongoose.model('RideHistory', rideHistorySchema);
