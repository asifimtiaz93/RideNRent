const mongoose = require('mongoose');

const dvrSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    vehnum: {
        unique: true,
        type: String,
      
    },
    licnum: {
        unique: true,
        type: String, 
       
    },
    rating:{
        type: Number,
        default: 0,
        required: true
    },
    ridecount:{
        type: Number,
        default: 0,
        required: true
    },
    image:String,
    make:{
        type: String,
    },
    model:{
        type: String,
    },
    color:{
        type: String,
    },
    cap:{
        type: Number,
    },
    year:{
        type: Number,
    },
    nid: String,

    createOn:{
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('dvr', dvrSchema)