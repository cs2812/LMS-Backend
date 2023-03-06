const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set('strictQuery', true);

async function initDB() {

  const Client = await mongoose.connect("mongodb+srv://chetan:chetan2812@cluster0.lmm0tfr.mongodb.net/test"); 
  // process.env.LMS_DB
  // "mongodb+srv://chetan:chetan2812@cluster0.lmm0tfr.mongodb.net/test"
 
}
module.exports = initDB;
