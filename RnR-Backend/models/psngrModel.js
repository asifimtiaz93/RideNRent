const mongoose = require('mongoose');

//const encrypt = require('mongoose-encryption');

const psngrSchema = new mongoose.Schema({
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
    image:String,
    createOn:{
        type: Date,
        default: Date.now
    },
})



module.exports = mongoose.model('psngr', psngrSchema)