const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.DB.concat('\madhukarTemp');
mongoose.connect(DB, {}).then(() => {
    console.log(`Connection successful`);
}).catch((err) => console.log(`No connection`));

module.exports = mongoose;