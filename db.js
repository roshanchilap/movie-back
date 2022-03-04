const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DB_URL;
mongoose.connect(url, () => {
  console.log("Connection to database is sucessfull!");
});
