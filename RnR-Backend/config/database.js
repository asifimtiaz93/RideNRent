require('dotenv').config();
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log(err);
    })