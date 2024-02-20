const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.db_url);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {connectToDb };
