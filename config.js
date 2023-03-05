const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set('strictQuery', true);

async function initDB() {

  const Client = await mongoose.connect(process.env.LMS_DB); 
 
}
module.exports = initDB;
